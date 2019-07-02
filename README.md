### Twitch App API wrapper

[Source](https://twitchappapi.docs.apiary.io/)

## Examples/usage

```javascript
const twitchappapi = require('twitchappapi');

twitchappapi.getAddonInfo(310806);

twitchappapi.getMultipleAddons([310806, 304026]);

twitchappapi.addonSearch(0, 432, '1.12.2', 0, 25, 'ultimate', 4471, 0);

twitchappapi.getAddonDescription(310806);

twitchappapi.getAddonFileChangelog(310806, 2657461);

twitchappapi.getAddonFileInformation(310806, 2657461);

twitchappapi.getAddonFiles(304026);

twitchappapi.getFeaturedAddons(432, [], 6, 14, 14);

twitchappapi.getAddonsDatabaseTimestamp();

twitchappapi.getAddonByFingerPrint([3028671922]);
```