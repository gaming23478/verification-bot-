const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(client, interaction) {

      if(client.ws.ping <= 30) return interaction.reply(`Pong! **${client.ws.ping}ms** \`(Super Good)\``);

      if(client.ws.ping >= 40) return interaction.reply(`Pong! **${client.ws.ping}ms** \`(Very Good)\``);

      if(client.ws.ping >= 50) return interaction.reply(`Pong! **${client.ws.ping}ms** \`(Good)\``);

      if(client.ws.ping >= 60) return interaction.reply(`Pong! **${client.ws.ping}ms** \`(Not Bad)\``);

      if(client.ws.ping >= 70) return interaction.reply(` Pong! **${client.ws.ping}ms** \`(Medium)\``);

      if(client.ws.ping >= 80) return interaction.reply(`Pong! **${client.ws.ping}ms** \`(Bad)\``);

      if(client.ws.ping >= 90) return interaction.reply(`Pong! **${client.ws.ping}ms** \`(Very Bad)\``);
    
	},
};
