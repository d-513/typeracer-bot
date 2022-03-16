const puppeteer = require("puppeteer");
const { workerData } = require("worker_threads");

async function main() {
  console.log(workerData, "Started");
  const browser = await puppeteer.launch({
    headless: true,
  });
  async function botLoop() {
    const page = await browser.newPage();
    await page.goto("https://play.typeracer.com/");
    await page.waitForSelector("a.bkgnd-green:nth-child(1)");
    await page.click("a.bkgnd-green:nth-child(1)");
    await page.waitForSelector(".gameStatusLabel");
    await page.waitForSelector(".txtInput-unfocused", { hidden: true });

    const s_textThing =
      "#gwt-uid-20 > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td";

    const text = await page.$eval(s_textThing, (element) => {
      return element.textContent;
    });
    console.log(workerData, text);

    page.type(".txtInput", text, {
      delay: 25,
    });
    let lastMessage = "";
    // this is a mess but frank;y it works
    const matchCheck = () =>
      new Promise((resolve) => {
        page.$(".gameStatusLabel").then((label) => {
          const loop = () => {
            label
              .evaluate((node) => node.textContent)
              .then((cont) => {
                if (lastMessage != cont) {
                  lastMessage = cont;
                  console.log(workerData, cont);
                }
                const conte = cont.toLowerCase();
                if (
                  conte.includes("end") ||
                  conte.includes("win") ||
                  conte.includes("finished")
                ) {
                  resolve();
                } else {
                  setTimeout(loop, 1000);
                }
              });
          };
          loop();
        });
      });

    matchCheck().then(() => {
      page.close().then(() => {
        const rand = Math.floor(Math.random() * 1000);
        setTimeout(botLoop, rand);
      });
    });
  }
  await botLoop();
}

main();
