# jenkins-cli-view

## Configuration

Add a file to `.jenkins-cli-view/config.json` containing:

```json
{
    "jenkinsProject": "...",
    "jenkinsUsername": "...",
    "jenkinsPassword": "...",
    "jenkinsHost": "..."
}
```

The values are overridable with:

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
