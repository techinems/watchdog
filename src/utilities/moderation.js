// Pure moderation logic, with no Slack/Bolt dependency, so it can be unit
// tested without starting the app.

// Top-level fallback text for the ephemeral warning (shown by clients that
// can't render blocks). Preserved verbatim from the original implementation.
const EPHEMERAL_FALLBACK_TEXT =
  "Sorry! You're not an admin or a moderator, " +
  "so you cannot post in this channel.";

// True if the given channel is one Watchdog is configured to monitor.
function isMonitoredChannel(channel, monitoredChannels) {
  return monitoredChannels.includes(channel);
}

// True if the user is an admin or a moderator (i.e. allowed to post).
function isModerator(user, adminUsers, modUsers) {
  return adminUsers.includes(user) || modUsers.includes(user);
}

// Build the Block Kit body of the ephemeral warning message. Text preserved
// verbatim from the original implementation.
function buildEphemeralBlocks(text) {
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text:
          "Sorry! You're not an admin or a moderator, " +
          "so you're not allowed to post a message in this channel. " +
          "If you feel it's important, trying posting in another channel " +
          "better suited for questions. You can also contact an officer " +
          "directly for more assistance.\n\nWe apologize we had to delete " +
          "your message, but for your reference, here's what you sent:",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `>${text}`,
      },
    },
  ];
}

module.exports = {
  EPHEMERAL_FALLBACK_TEXT,
  isMonitoredChannel,
  isModerator,
  buildEphemeralBlocks,
};
