const discord = require('discord.js')
const schedule = require('node-schedule')

require('dotenv').config()

const client = new discord.Client()

const axios = require('axios')
const moment = require('moment')

var channel

async function update() {
    res = await axios.get('https://api.chrono.gg/sale')
    body = res.data
    var time = moment(body.start_date)

    const embed = new discord.RichEmbed()
	.setColor('#9342f5')
	.setTitle(body.name)
	.setURL('https://www.chrono.gg/')
	.setAuthor('Chrono.gg', 'https://pbs.twimg.com/profile_images/705158228959748096/OPCXSf4V_400x400.jpg', 'https://github.com/jbyers44/chronobot')
	.setDescription(time.format("dddd, MMMM Do"))
	.setThumbnail(body.og_image)
	.addField('Steam Link', body.steam_url)
	.addBlankField()
	.addField('Retail Price', '$' + body.normal_price, true)
	.addField('Sale Price', '$' + body.sale_price, true)
	.addField('Discount', body.discount, true)
	.setImage(body.promo_image)
	.setTimestamp()
    .setFooter('jb/chronobot', 'https://pbs.twimg.com/profile_images/705158228959748096/OPCXSf4V_400x400.jpg');
    
    channel.send(embed)
}

function update_handler() {
    var rule = new schedule.RecurrenceRule()
    rule.second = 0
    rule.hour = 12
    schedule.scheduleJob(rule, function () {
        update()
    })
}

client.once('ready', () => {
    channel = client.channels.get(process.env.CHANNEL_ID)
    update_handler()
})

client.login(process.env.DISCORD_TOKEN)