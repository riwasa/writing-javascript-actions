const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  try {
    const issueTitle = core.getInput("issue-title");
    const jokeBody = core.getInput("joke");
    const token = core.getInput("repo-token");

    const octokit = new github.getOctokit(token);

    if (octokit == null) {
      console.log("octokit is null");
    }

    if (octokit.issues == null) {
      console.log("octokit.issues is null");
    }

    const newIssue = await octokit.rest.issues.create({
      repo: github.context.repo.repo,
      owner: github.context.repo.owner,
      title: issueTitle,
      body: jokeBody,
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
