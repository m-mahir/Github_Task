import { Octokit } from "octokit";

export const search = async (keyword: string, controller: AbortController) => {
  try {
    const octokit = new Octokit({
      auth: "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",
      request: {
        signal: controller.signal,
      },
    });

    return await octokit.request("GET /search/repositories", {
      q: keyword,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
  } catch (e: any) {
    console.log(e.message);
  }
};
