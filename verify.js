const axios = require('axios');
const { database } = require("../firebase.js");


exports.run = async (client, message, args) => {

	var flag = false;
	var rblx_id = 0;

	await axios.get(`${client.config.firebase_url}/verified_users/${message.author.id}.json`)
		.then(function (response) {
			if (response.data == null){
				flag = true;
			}else{
				rblx_id = response.data.rblx_id
				flag = false;
			}
		}).catch(function (error) {
			console.log(`Error - ${error} (verify.js)`);
		});

	if (flag){
		// if no username is provided, error and delete message
		/*
		if (!args[1]) return message.channel.send(`You must provide me with a ROBLOX username\n**${client.config.prefix}verify ROBLOX**`);
		*/




		database.ref(`verified_users/${message.author.id}`).set({
			"rblx_id": Number(123123)
		});


		message.channel.send("worked");
	}else{

		var rblx_username;
		var mugShot;

		await axios.get(`https://users.roblox.com/v1/users/${rblx_id}`)
			.then(function (response) {
				rblx_username = response.data.name
			})

		await axios.get(`https://www.roblox.com/headshot-thumbnail/json?userId=${rblx_id}&width=180&height=180`)
			.then(function (response) {
				mugShot = response.data.Url
			})

		await message.channel.send({embed: {
			// color picker - https://leovoel.github.io/embed-visualizer/
			color: 6160259,
			arthur: {
				name: client.user.username,
				icon_url: client.user.avatarURL
			},
			title: "**Verification - Successful**",
			description: `Hey **${rblx_username}**!\n\nI've retrieved your information from my database.  If you'd like to unlink your ROBLOX account (${rblx_username}) from my database, chat **!unverify** and I'll handle the rest.`,
			thumbnail: {
				url: mugShot
			}
		}});

		return undefined;
	}








};

exports.info = {
    name: 'verify',
    usage: 'verify <rblx_username>',
    description: "Link a user's Discord account with their ROBLOX account"
};