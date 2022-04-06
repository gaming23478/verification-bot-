const { Client, Intents, MessageEmbed, Collection, MessageActionRow, MessageButton } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('node:fs');
const { clientId, testGuildId } = require("./config.json");
const colors = require("colors");
const db = require("quick.db");
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

const client = new Client({
  ws : {
    properties: {
      $browser: "Discord iOS",
      },
    }, 
  intents: 32767
});

client.once('ready', () => {
	console.log(`${client.user.tag} is Ready!`.underline.bgGreen);
});

client.commands = new Collection();
const commands = [];
const commandFiles = fs.readdirSync('./slashCommands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./slashCommands/${file}`);
	commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
	try {
		console.log('[SLASH-HANDLER]'.bgCyan,'Started refreshing application (/) commands...'.yellow);
    
    /*await rest.put(
	    Routes.applicationCommands(clientId),
	    { body: commands },
    );*/

    await rest.put(
			Routes.applicationGuildCommands(clientId, testGuildId),
			{ body: commands },
		);

		console.log('[SLASH-HANDLER]'.bgCyan,'Reloaded and Registered (/) Succesfully!'.green);
	} catch (error) {
		console.error(error);
	}
})();

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(client, interaction);
	} catch (error) {
    const ConsoleIDErrorGen = Math.floor(Math.random() * 9999999) + 1;

		console.log(`[ERROR - ${ConsoleIDErrorGen}]`.bgRed, error);

    const embedErr = new MessageEmbed()
      .setTitle("Command Execution Failed.")
      .setDescription(`Unfortunality, **I can't Execute this Command!** The Error has been Logged on The Console.`)
      .addFields({ name: "Error ID:", value: `\`${ConsoleIDErrorGen}\``})
      .setColor("RED")
      .setFooter(`Please Contact the Developers to Report this Problem.`)
      .setTimestamp();

		await interaction.reply({ embeds: [embedErr], ephemeral: true });
	}
});

client.login(process.env.TOKEN);
