const fs = require("fs");
const homedir = require('os').homedir();
const configFileLocation = `${homedir}/.jenkins-cli-view/config.json`;
const localConfigFileLocation = ".jenkins-cli-view/config.json";

const readConfigFile = () => {
  if (fs.existsSync(localConfigFileLocation)) {
    return JSON.parse(fs.readFileSync(localConfigFileLocation));
  }

  if (!fs.existsSync(configFileLocation)) {
    return {};
  }

  return JSON.parse(fs.readFileSync(configFileLocation));
};

module.exports = {
  getConfig: () => {
    const config = readConfigFile();
    const jenkinsScheme = config.jenkinsScheme || process.env.JENKINS_SCHEME || 'https';
    const jenkinsUsername = encodeURIComponent(config.jenkinsUsername || process.env.JENKINS_USERNAME);
    const jenkinsPassword = encodeURIComponent(config.jenkinsPassword || process.env.JENKINS_PASSWORD);
    const jenkinsHost = config.jenkinsHost || process.env.JENKINS_URL;
    const jenkinsProject = config.jenkinsProject || process.env.JENKINS_PROJECT;
    
    return {
      jenkinsUsername,
      jenkinsPassword,
      jenkinsHost,
      jenkinsProject,
      jenkinsBaseUrl: `${jenkinsScheme}://${jenkinsUsername}:${jenkinsPassword}@${jenkinsHost}`
    };
  },
};
