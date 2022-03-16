# typeracer bot

a simple puppeteer experiment to make a bot for typeracer

## running

`node index.js`  
you can select the amount of bot to use by editing `index.js`. I recommend using just one

## cookie popup

typeracer has a cookie popup
it breaks the bot

to disable it I recommend just blocking it at dns level: wildcard block `consensu.org`

## seeing the bot

by default it just prints messages to terminal  
if you want to see what the bot is doing edit `headless: true` to `headless: false` in bot.js
