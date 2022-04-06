const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
const db = require("quick.db");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setverification')
		.setDescription('Set the verification System.')
    .addRoleOption(option => option.setName('verified_role').setDescription('Select the role.').setRequired(true)),
	async execute(client, interaction) {

    const verifiedRole = interaction.options.getRole('verified_role');
    const { successEmoji, errorEmoji } = require("../emojis.json")
    const adminRole = interaction.guild.roles.cache.find(role => role.name === "Admin");

    if (!adminRole) {

      const noAdminRoleSet = new MessageEmbed()
        .setAuthor({ name: 'Verify Manager', iconURL: client.user.displayAvatarURL() })
        .setDescription("**There is not a role called** \"Admin\"** on this Server!** Please contact a Server Administrator to Fix this Error.")
        .setTimestamp()
        .setColor("RED");
      
      interaction.reply({ embeds: [noAdminRoleSet], ephemeral: true})
    } else {

    
    if (!interaction.member.roles.cache.has(adminRole.id)) {

      const alreadyVerified = new MessageEmbed()
        .setAuthor({ name: 'Verify Manager', iconURL: client.user.displayAvatarURL() })
        .setDescription(`**You are not allowed to use this command.** Required Role: ${adminRole}`)
        .setTimestamp()
        .setColor("RED");
      
      interaction.reply({ embeds: [alreadyVerified], ephemeral: true })
      
    } else {

      try {
        
        db.set(`verificationrole_${interaction.guild.id}`, verifiedRole.id);

        const embed = new MessageEmbed()
          .setAuthor({ name: 'Verify Manager', iconURL: client.user.displayAvatarURL() })
          .setDescription(`${successEmoji || "✅"} Successfully set the Verified role: ${verifiedRole} (\`${verifiedRole.id}\`)`)
          .setColor("GREEN")
          .setTimestamp();

        interaction.reply({ embeds: [embed], ephemeral: true })
        
        
      } catch (err) {

        console.log("ERROR:", err)
        
      }

    }
    }
    
	},
};
