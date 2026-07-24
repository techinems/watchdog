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
} = require("./bolt.js");
const {
  EPHEMERAL_FALLBACK_TEXT,
  isMonitoredChannel,
  buildEphemeralBlocks,
} = require("./moderation.js");

//globals
const TOKEN = process.env.SLACK_BOT_TOKEN;
const USER_TOKEN = process.env.SLACK_USER_TOKEN;
const MOD_USERGROUP_ID = process.env.MOD_USERGROUP_ID;
const ADMIN_USERGROUP_ID = process.env.ADMIN_USERGROUP_ID;
const MONITORED_CHANNELS = (process.env.MONITORED_CHANNELS || "")
  .split(",")
  .filter(Boolean);

const isDev = () => {
  return process.env.ENVIRONMENT && process.env.ENVIRONMENT == "dev";
};

// Returns true if the user is neither an admin nor a moderator. Keeps the
// original short-circuit: the mod usergroup is only fetched if the user is not
// an admin.
const isNotModerator = async (user) => {
  const { users: adminUsers } = await list({
    token: TOKEN,
    usergroup: ADMIN_USERGROUP_ID,
  });
  if (adminUsers.includes(user)) {
    return false;
  }
  const { users: modUsers } = await list({
    token: TOKEN,
    usergroup: MOD_USERGROUP_ID,
  });
  if (modUsers.includes(user)) {
    return false;
  }
  return true;
};

const processMessage = async ({ text, user, ts, channel }) => {
  if (
    isMonitoredChannel(channel, MONITORED_CHANNELS) &&
    (await isNotModerator(user))
  ) {
    if (isDev()) {
      console.log(
        `text: ${text}\nuser: ${user}\nts: ${ts}\nchannel: ${channel}\n`
      );
    }
    try {
      await deleteMessage({
        token: USER_TOKEN,
        channel: channel,
        ts: ts,
      });
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
    return postEphemeral({
      token: TOKEN,
      channel: channel,
      text: EPHEMERAL_FALLBACK_TEXT,
      user: user,
      blocks: buildEphemeralBlocks(text),
    });
  }
};

module.exports = { isDev, processMessage };
