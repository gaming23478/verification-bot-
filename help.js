const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Help menu with list of commands!'),
	async execute(client, interaction) {

    const wait = require('node:timers/promises').setTimeout;

    const embedAll = new MessageEmbed()
      .setAuthor({ name: 'Verify Manager', iconURL: client.user.displayAvatarURL() })
      .setDescription("**Select one of the commands Below!**")
      .setColor("GREEN")
      .setTimestamp();

    const embedExpired = new MessageEmbed()
      .setAuthor({ name: 'Verify Manager', iconURL: client.user.displayAvatarURL() })
      .setDescription("**This embed message has been expired!** Please type `/help` again.")
      .setColor("RED")
      .setTimestamp();

    const embedClosed = new MessageEmbed()
      .setAuthor({ name: 'Verify Manager', iconURL: client.user.displayAvatarURL() })
      .setDescription("**This Help Menu has been closed by The Interaction Author.**")
      .setColor("RED")
      .setTimestamp();
    
    const rowAll = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("1")
          .setLabel("General")
          .setStyle("PRIMARY"),
        new MessageButton()
          .setCustomId("2")
          .setLabel("Setup")
          .setStyle("PRIMARY"),
      )

    const rowGeneral = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("1")
          .setLabel("General")
          .setStyle("PRIMARY")
          .setDisabled(true),
        new MessageButton()
          .setCustomId("2")
          .setLabel("Setup")
          .setStyle("PRIMARY"),
      )

    const rowSetup = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("1")
          .setLabel("General")
          .setStyle("PRIMARY"),
        new MessageButton()
          .setCustomId("2")
          .setLabel("Setup")
          .setStyle("PRIMARY")
          .setDisabled(true),
      )

    const rowExpired = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("1")
          .setLabel("General")
          .setStyle("PRIMARY")
          .setDisabled(true),
        new MessageButton()
          .setCustomId("2")
          .setLabel("Setup")
          .setStyle("PRIMARY")
          .setDisabled(true),
      )

    try {
    
    const filter1 = i => i.customId === "1" && i.user.id;

    const collector1 = interaction.channel.createMessageComponentCollector({ filter1 });

    collector1.on('collect', async i => {
      if (i.customId === "1") {

        const embed1 = new MessageEmbed()
          .setAuthor({ name: 'Verify Manager', iconURL: client.user.displayAvatarURL() })
          .setTitle("List of General Commands:")
          .setDescription("`ping`, `help`, `verify`.")
          .setColor("BLURPLE")
          .setTimestamp();

        const embedGeneral = new MessageEmbed()
          .setDescription("**General Commands button selected!** Choose another command.")
          .setTimestamp()
          .setFooter("T.F.A#7524")
          .setColor("RED");
        
        i.channel.send({ content: `<@${interaction.member.id}>,`, embeds: [embed1], components: [], ephemeral: true })
        
        i.update({ components: [rowGeneral], embeds: [embedGeneral]})
        
      }
    })

    const filter2 = i => i.customId === "2" && i.user.id;

    const collector2 = interaction.channel.createMessageComponentCollector({ filter1 });

    collector2.on('collect', async i => {
      if (i.customId === "2") {

        const embed1 = new MessageEmbed()
          .setAuthor({ name: 'Verify Manager', iconURL: client.user.displayAvatarURL() })
          .setTitle("List of Setup Commands:")
          .setDescription("`setverification`.")
          .setColor("BLURPLE")
          .setTimestamp();

        const embedSetup = new MessageEmbed()
          .setDescription("**Setup Commands button selected!** Choose another command.")
          .setTimestamp()
          .setFooter("Made by: T.F.A#7524")
          .setColor("RED");
        
        i.channel.send({ content: `<@${interaction.member.id}>,`, embeds: [embed1], components: [], ephemeral: true })
        
        i.update({ components: [rowSetup], embeds: [embedSetup]})
        
      }
    })

    interaction.channel.send({ embeds: [embedAll], components: [rowAll]})

    //await wait(15000);

    //await interaction.editReply({ embeds: [embedExpired], components: [rowExpired]})

    } catch (err) {

      console.log("[HELP_CMD_ERR] => ", err)
      
    }
    
	},
};
