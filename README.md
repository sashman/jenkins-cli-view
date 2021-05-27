# jenkins-cli-view

Install with

```
npm i -g jenkins-cli-view
```

## Configuration

Add a file to `~/.jenkins-cli-view/config.json` containing the below config. You can also override the config file in the local directory:

```json
{
    "jenkinsProject": "...",
    "jenkinsUsername": "...",
    "jenkinsPassword": "...",
    "jenkinsHost": "..."
}
```

*NOTE:* `jenkinsHost` should exclude the scheme. The scheme defaults to `https`

The values are overridable with environment variables:

- `JENKINS_SCHEME`
- `JENKINS_USERNAME`
- `JENKINS_PASSWORD`
- `JENKINS_HOST`
- `JENKINS_PROJECT`

## Usage

In the project directory run:

```
jenkins-cli-view
```

You can use `--latest-tag` optional flag to retreive the latest tag in your current repository rather than the current branch.
