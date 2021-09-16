//local packages
const {
  app: {
    client: {
      usergroups: {
        users: { list },
      },
      chat: { delete: deleteMessage, postEphemeral },
    },
  },
} = require("../utilities/bolt.js");

//globals
const TOKEN = process.env.SLACK_BOT_TOKEN;
const USER_TOKEN = process.env.SLACK_USER_TOKEN;
const MOD_USERGROUP_ID = process.env.MOD_USERGROUP_ID;
const ADMIN_USERGROUP_ID = process.env.ADMIN_USERGROUP_ID;
const MONITORED_CHANNELS = process.env.MONITORED_CHANNELS.split(",");

const isModerator = async (user) => {
  const { users: adminUsers } = await list({
    token: TOKEN,
    usergroup: ADMIN_USERGROUP_ID,
  });
  if (adminUsers.includes(user)) return true;
  const { users: modUsers } = await list({
    token: TOKEN,
    usergroup: MOD_USERGROUP_ID,
  });
  if (modUsers.includes(user)) return true;
  return false;
};

const processMessage = async ({ text, user, ts, channel }) => {
  if (MONITORED_CHANNELS.includes(channel) && (await isModerator(user))) {
    deleteMessage({
      token: USER_TOKEN,
      channel: channel,
      ts: ts,
    });
    return postEphemeral({
      token: TOKEN,
      channel: channel,
      text: "Sorry! You're not an admin or a moderator, so you cannot post in this channel.",
      user: user,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "Sorry! You're not an admin or a moderator, so you're not allowed to post a message in this channel. If you feel it's important, trying posting in another channel better suited for questions. You can also contact an officer directly for more assistance.\n\nWe apologize we had to delete your message, but for your reference, here's what you sent:",
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `>${text}`,
          },
        },
      ],
    });
  }
};

module.exports = { processMessage };
