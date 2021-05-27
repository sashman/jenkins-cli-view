const fs = require("fs");
const path = require("path");
const parse = require("parse-git-config");
const util = require("util");
const execSync = require('child_process').execSync;

function getCurrentBranchName(p = process.cwd()) {
  const gitHeadPath = `${p}/.git/HEAD`;

  return fs.existsSync(p)
    ? fs.existsSync(gitHeadPath)
      ? fs.readFileSync(gitHeadPath, "utf-8").trim().split("/")[2]
      : getCurrentBranchName(path.resolve(p, ".."))
    : false;
}

function getCurrentRepoName() {
  const gitConfig = parse.sync();
  const {
    'remote "origin"': { url },
  } = gitConfig;
  const repoName = url.trim().split("/")[1].replace(".git", "");
  return repoName;
}

 function getLatestTag() {
  const stdout = execSync(
    "git describe --tags `git rev-list --tags --max-count=1`"
  );

  return stdout.toString().trim();
}

module.exports = {
  getCurrentBranchName,
  getCurrentRepoName,
  getLatestTag
};
