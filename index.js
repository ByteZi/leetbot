require('dotenv').config()

const { Client, Intents, Collection, MessageEmbed } = require('discord.js')
const axios = require('axios')
// const User = require('./User.class')
const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS] })
const fs = require('fs');

const prefix = '!'

client.commands = new Collection()
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command);
}


client.on('ready', () => {
    console.log('client is listening as ' + client.user.tag)
})

client.on('message', msg => {

    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (command === 'ls') {
        return client.commands.get('command').execute(msg, args, MessageEmbed, axios)
    }
})

client.login(process.env.D_TOKEN)