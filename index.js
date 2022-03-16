const workers = require("worker_threads");
const path = require("path");

let WORKER_COUNT = 1;

for (let i = WORKER_COUNT; i--; i > 0) {
  const worker = new workers.Worker(path.join(__dirname, "bot.js"), {
    workerData: `[WORKER #${i}]`,
  });
}
