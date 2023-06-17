import { Octokit } from "octokit";
import { PAGE_SIZE } from "../core/constants";

export const search = async (
  keyword: string,
  pageNum: number,
  controller: AbortController
) => {
  try {
    const octokit = new Octokit({
      auth: "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",
      request: {
        signal: controller.signal,
      },
    });

    return await octokit.request("GET /search/repositories", {
      q: keyword,
      per_page: PAGE_SIZE,
      page: pageNum,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
  } catch (e: any) {
    console.log(e.message);
  }
};
