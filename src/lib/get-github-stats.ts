export interface GithubStats {
  repos: number;
  followers: number;
  contributions: number;
  yearsExp: number;
}

const emptyStats: GithubStats = {
  repos: 0,
  followers: 0,
  contributions: 0,
  yearsExp: 0,
};

async function fetchWithTimeout(url: string, timeout = 5000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch {
    clearTimeout(id);
    throw new Error(`Request to ${url} timed out after ${timeout}ms`);
  }
}

export async function getGithubStats(username: string): Promise<GithubStats> {
  try {
    const [userResponse, contributionsResponse] = await Promise.allSettled([
      fetchWithTimeout(`https://api.github.com/users/${username}`, {
        headers: { Accept: "application/vnd.github.v3+json" },
      }),
      fetchWithTimeout(`https://github-contributions-api.deno.dev/${username}.json`),
    ]);

    let userData: { created_at?: string; public_repos?: number; followers?: number } | null = null;
    let totalContributions = 0;

    if (userResponse.status === "fulfilled" && userResponse.value.ok) {
      userData = (await userResponse.value.json()) as {
        created_at: string;
        public_repos?: number;
        followers?: number;
      };
    }

    if (contributionsResponse.status === "fulfilled" && contributionsResponse.value.ok) {
      const contribData = (await contributionsResponse.value.json()) as { totalContributions?: number };
      totalContributions = contribData.totalContributions ?? 0;
    }

    if (!userData) {
      return emptyStats;
    }

    const createdAt = new Date(userData.created_at);
    const now = new Date();
    const yearsExp = now.getFullYear() - createdAt.getFullYear();

    return {
      repos: userData.public_repos ?? 0,
      followers: userData.followers ?? 0,
      contributions: totalContributions,
      yearsExp: yearsExp > 0 ? yearsExp : 1,
    };
  } catch {
    return emptyStats;
  }
}
