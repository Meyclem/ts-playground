import fetch, { Response } from "node-fetch";

interface ProjectInformations {
  description: string;
  language: string;
  subscribers_count: string;
  stargazers_count: string;
  git_url: string;
}

interface GithubProject extends ProjectInformations {
  [key: string]: string;
}

type GithubProfile = {
  [key: string]: string;
};

export class GithubClient {
  private _parseResponse<T>(JSONResponse: Response, resource: string): Promise<T> {
    return JSONResponse.json().then((parsedResponse) => {
      if (parsedResponse.message === "Not Found") {
        throw new Error(`${resource} Not Found`);
      }
      return parsedResponse;
    });
  }

  private _selectInformations(repoInfos: GithubProject): ProjectInformations {
    return {
      description: repoInfos.description,
      language: repoInfos.language,
      subscribers_count: repoInfos.subscribers_count,
      stargazers_count: repoInfos.stargazers_count,
      git_url: repoInfos.git_url,
    };
  }

  getProfile(GHUsername: string): Promise<GithubProfile> {
    const url = `https://api.github.com/users/${GHUsername}`;
    return fetch(url).then((response) => {
      return this._parseResponse<GithubProfile>(response as Response, "User");
    });
  }

  getRepos(reposUrl: string): Promise<GithubProject[]> {
    return fetch(reposUrl).then((response) => {
      return this._parseResponse<GithubProject[]>(response, "Repos");
    });
  }

  getProjectInformations(url: string): Promise<ProjectInformations> {
    return fetch(url).then((response) => {
      return this._parseResponse<GithubProject>(response, "Repo").then((data: GithubProject) => {
        return this._selectInformations(data);
      });
    });
  }
}
