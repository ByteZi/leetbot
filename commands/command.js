

module.exports = {
    name: 'command',
    description: 'Embeds!',
    execute(msg, args, MessageEmbed, axios) {
        axios.get(`https://leetcode-stats-api.herokuapp.com/${args[0]}`)
            .then(res => {
                
                if (res.data.status == 'error') return;

                const exampleEmbed = new MessageEmbed()
                    .setColor('#FFA500')
                    .setTitle("Stats")
                    // .setURL(`https://leetcode.com/${args[0]}/`)
                    .setAuthor({
                        name: `${args[0].toUpperCase()}`,
                        iconURL: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png?20191202080835', url: `https://www.leetcode.com/${args[0]}`
                    })
                    // .setDescription('Some description here')
                    .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png?20191202080835')
                    .addFields(
                        { name: 'Total Solved', value: `${res.data.totalSolved}/${res.data.totalQuestions}` },
                        { name: 'Rank', value: String(res.data.ranking) },
                        // { name: '\u200B', value: '\u200B' },
                        { name: "Easy", value: `${res.data.easySolved}/${res.data.totalEasy}`, inline: true },
                        { name: 'Medium', value: `${res.data.mediumSolved}/${res.data.totalMedium}`, inline: true },
                        { name: 'Hard', value: `${res.data.hardSolved}/${res.data.totalHard}`, inline: true }
                    )
                msg.channel.send({ embeds: [exampleEmbed] });
            })
            // .catch(err => console.log("Error Handled"))


    }
}