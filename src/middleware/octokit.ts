import { Octokit } from "octokit";
import { API_TOKEN } from "../config";

export const get = async (
  url: string,
  config: {},
  controller: AbortController
) => {
  try {
    const octokit = new Octokit({
      auth: API_TOKEN,
      request: {
        signal: controller.signal,
      },
    });

    return await octokit.request(`GET ${url}`, {
      ...config,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
  } catch (error: any) {
    //Non aborted request.
    if (error.code !== 20) throw error;
  }
};
