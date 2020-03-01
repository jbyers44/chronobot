const discord = require('discord.js')
const axios = require('axios')
const moment = require('moment')
const schedule = require('node-schedule')

require('dotenv').config()

const client = new discord.Client()

async function update(channel) {
    res = await axios.get('https://api.chrono.gg/sale')
    body = res.data
    var time = moment(body.start_date)
    console.log(body)

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

client.once('ready', () => {
    const channel = client.channels.get(process.env.CHANNEL_ID)
    update(channel)
    //schedule.scheduleJob('0 12 * * *', update(channel));
})

client.login(process.env.DISCORD_TOKEN)