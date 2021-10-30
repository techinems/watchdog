[![Build Status](https://cloud.drone.io/api/badges/rpiambulance/watchdog/status.svg)](https://cloud.drone.io/rpiambulance/watchdog)	

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

# Watchdog

**Watchdog** is used to free up clutter and provide gentle reminders in particular Slack channels.

You see, Slack *does* allow for permissions-based posting in specific channels, but this is unfortunately limited to `#general` for most tiers; further, this functionality is only configurable to any channel on Enterprise Grid.

Now, you can use **Watchdog** to monitor your channels and ensure only selected people can post. **Watchdog** will automatically remove messages from those without the requisite permission.

## Setup

First, you'll need to create a Slack app with the following features:

* Event subscriptions:
  * 	Bot events: `message.channels`
  * 	User events: `message.channels`
* OAuth scopes:
  * Bot scopes: `channels:history`, `channels:read`, `chat:write`, and `usergroups:read`
  * User scopes: `channels:history` and `chat:write`

Next, you'll have to get our code onto your server and run it—in whatever way you most desire. The following environment variables will have to be present to the code upon running:

```
NODE_PORT=3000
SLACK_BOT_TOKEN=xoxb-<bot token>
SLACK_USER_TOKEN=xoxp-<user token>
SLACK_SIGNING_SECRET=<signing secret>
TZ="America/New_York"
MONITORED_CHANNELS=<COMMA,SEPARATED>
ADMIN_USERGROUP_ID=<ADMIN GROUP>
MOD_USERGROUP_ID=<ADMIN GROUP>
```


## Credits

### Developers

- [Dan Bruce](https://github.com/ddbruce)
- [Logan Ramos](https://github.com/lramos15)

### License

**at-channel** is provided under the [MIT License](https://opensource.org/licenses/MIT).

### Contact

For any question, comments, or concerns, email [dev@rpiambulance.com](mailto:dev@rpiambulance.com), [create an issue](https://github.com/rpiambulance/watchdog/issues/new), or open up a pull request.
