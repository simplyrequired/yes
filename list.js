
exports.run = async (client, message, args, admin) => {

	if (message.author.id !== client.config.owner_id) return message.channel.send(`Sorry ${message.author}, but only the owner of this bot can run that command!`);

	// add user to whitelisted
	// increment total clients by one


};

exports.info = {
    name: 'verify',
    usage: 'verify <rblx_username>',
    description: "Link a user's Discord account with their ROBLOX account"
};