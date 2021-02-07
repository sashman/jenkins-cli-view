const blessed = require("blessed");
const contrib = require("blessed-contrib");
const config = require("./config").getConfig();
const git = require("./git");

const formatDuration = require("date-fns/formatDuration");
const jenkins = require("jenkins")({
  baseUrl: config.jenkinsBaseUrl,
  crumbIssuer: true,
});

const jobName = `${
  config.jenkinsProject
}/${git.getCurrentRepoName()}/${git.getCurrentBranchName()}`;

const screen = blessed.screen();
const grid = new contrib.grid({ rows: 2, cols: 1, screen: screen });

const titleBox = grid.set(0, 0, 1, 1, blessed.box, { content: "Loading..." });
const gauge = grid.set(1, 0, 1, 1, contrib.gauge, {
  label: "Progress",
  stroke: "green",
  fill: "white",
});

screen.key(["escape", "q", "C-c"], function (ch, key) {
  return process.exit(0);
});

function queryBuild() {
  jenkins.job.get(jobName, function (err, data) {
    if (err) throw err;

    const { lastBuild } = data;

    jenkins.build.get(jobName, lastBuild.number, function (err, data) {
      if (err) throw err;
      const {
        fullDisplayName,
        estimatedDuration,
        result,
        building,
        url,
        timestamp,
      } = data;

      const elapsedTime = Date.now() - timestamp;
      const formattedElapsedTime = formatDuration(
        { seconds: elapsedTime / 1000 },
        { format: ["hours", "minutes", "seconds"] }
      );
      const percentage = Math.round((elapsedTime / estimatedDuration) * 100);

      if (building) {
        titleBox.setContent(`${fullDisplayName}\nBuilding ${formattedElapsedTime}`);
        gauge.setPercent(percentage);
      } else {
        titleBox.setContent(`${fullDisplayName}\n${result}\n${url}console`);
        gauge.setPercent(100);
      }

      screen.render();
    });
  });
}

function start() {
  screen.render();
  setInterval(queryBuild, 1000);  
}

module.exports = {
  start
}