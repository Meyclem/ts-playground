import { GithubClient } from "./"

// fake reader with question & response
const reader = (question: string, string: number): Promise<number> => {
  return new Promise((resolve) => resolve(string))
}

function tata(): void {
  const GHclient = new GithubClient()
  GHclient.getProfile("Meyclem")
    .then(({ repos_url }) => GHclient.getRepos(repos_url))
    .then((repos) => Promise.all([repos, reader("what index?", 0)]))
    .then(([repos, index]) => GHclient.getProjectInformations(repos[index]["url"]))
    .then((res) => console.log(res))
    .catch((e) => console.error(e))
}

async function toto(): Promise<void> {
  const GHclient = new GithubClient()
  try {
    const { repos_url } = await GHclient.getProfile("Meyclem")
    const repos = await GHclient.getRepos(repos_url)
    const index = await reader("what index?", 0)
    const repo = await GHclient.getProjectInformations(repos[index]["url"])

    console.log(repo)
  } catch (e) {
    console.error(e)
  }
}
tata()
toto()
