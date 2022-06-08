require('dotenv').config()

const { Client, Intents } = require('discord.js')
const axios = require('axios')
const User = require('./User.class')

const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS] })

const users = []

client.on('ready', () => {
    console.log('client is listening as ' + client.user.tag)
})

client.on('message', msg => {
    if (msg.content == "hi") {
        msg.reply(`hello <@${msg.author.id}>`)
    }

    if (msg.content == "add") {
        var flag = false;

        for (var i = 0; i < users.length; i++) {
            if (users[i].id == msg.author.id) {
                flag = true;
                break;
            }
        }

        if (!flag) {
            const new_user = new User(msg.author.id)
            users.push(new_user)
        }
    }

    if (msg.content == 'count') {
        console.log(users)
    }
})

client.login(process.env.D_TOKEN)