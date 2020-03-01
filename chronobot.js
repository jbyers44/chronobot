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

    const embed = new discord.RichEmbed()
	.setColor('#9342f5')
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor('Chrono.gg Bot by jb', 'https://pbs.twimg.com/profile_images/705158228959748096/OPCXSf4V_400x400.jpg', 'https://github.com/jbyers44/chronobot')
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/wSTFkRM.png')
	.addField('Regular field title', 'Some value here')
	.addBlankField()
	.addField('Inline field title', 'Some value here', true)
	.addField('Inline field title', 'Some value here', true)
	.addField('Inline field title', 'Some value here', true)
	.setImage('https://i.imgur.com/wSTFkRM.png')
	.setTimestamp()
    .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
    
    channel.send(embed)
}

client.once('ready', () => {
    const channel = client.channels.get(process.env.CHANNEL_ID)
    update(channel)
    //schedule.scheduleJob('0 12 * * *', update(channel));
})

client.login(process.env.DISCORD_TOKEN)