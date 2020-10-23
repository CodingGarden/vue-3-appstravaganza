export default {
  async getSubreddit(subreddit) {
    const url = `https://www.reddit.com/${subreddit}/about.json`;
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data.data;
    }
    const error = new Error(data.message || 'Failed to get subreddit info.');
    error.response = data;
    throw error;
  },
  async getPosts(subreddit, params) {
    const urlParams = new URLSearchParams(params);
    const url = `https://www.reddit.com/${subreddit}.json?${urlParams}`;
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    const error = new Error(data.message || 'Failed to get posts.');
    error.response = data;
    throw error;
  },
};
