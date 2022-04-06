const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require("quick.db")
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verify')
		.setDescription('Verify yourself on the server!'),
	async execute(client, interaction) {

    let verifiedRoleId = db.get(`verificationrole_${interaction.guild.id}`);
    const { successEmoji, errorEmoji } = require("../emojis.json")
    const verifiedRole = interaction.guild.roles.cache.find(role => role.id === verifiedRoleId);

    if (!verifiedRole)
    return console.log("[WARN] The Verified role does not exist!");

    if (interaction.member.roles.cache.has(verifiedRole.id)) { interaction.reply({ content: `\`⛔\` **Permissions Denied:**\n\nYou are already Verified!`, ephemeral: true })

    } else {

      try {

      let verifyrole = db.fetch(`verificationrole_${interaction.guild.id}`);

      let verifiedrole = interaction.guild.roles.cache.get(verifyrole);

      await interaction.member.roles.add(verifiedrole)

      const verified = new MessageEmbed()
          .setTitle("Verification System:")
          .setDescription(`${successEmoji || "✅"} You have been verified successfully!`)
          .addFields(
            { name: "• Verified On:", value: `${interaction.guild.name} (\`${interaction.guild.id}\`)`, inline: true},
            { name: "• Verified By:", value: `${client.user.username} (\`${client.user.id}\`)`, inline: true},
          )
          .setColor("GREEN")
          .setFooter("Invite the Bot: /invite")
          .setTimestamp();

      interaction.reply({ embeds: [verified], ephemeral: true })

      } catch (err){

      console.log(err)
      interaction.channel.send({ content: `${interaction.member},\n${errorEmoji} **An Error has Occured while Executing the Verify command.**\n\nError Reason: \`${err}\``, ephemeral: true })
        
      }
    
      
    }
	},
};
