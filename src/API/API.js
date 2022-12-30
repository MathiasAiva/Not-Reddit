const API_URL = "https://www.reddit.com";

const intialOptions = {
  headers: {
    accept: "application/json",
  },
};

// The API Interaction :D

export const getSubredditRules = async (subreddit, options = intialOptions) => {
  const url = `${API_URL}/r${subreddit}/about/rules.json`;

  const query = await fetch(url, options);
  const jsonResponse = await query.json();
  if (query.ok) return jsonResponse.rules;

  throw new Error("Failed to fetch subreddit rules: " + subreddit);
};
export const getSubreddit = async (subreddit, options = intialOptions) => {
  const url = `${API_URL}/r${subreddit}/about.json`;

  const query = await fetch(url, options);
  const jsonResponse = await query.json();
  if (query.ok) return jsonResponse.data;

  throw new Error("Failed to fetch subreddit: " + subreddit);
};
export const getBestPosts = async (options = intialOptions) => {
  const url = `${API_URL}/best.json`;

  const query = await fetch(url, options);
  const jsonResponse = await query.json();
  if (query.ok) return jsonResponse.data;

  throw new Error("Failed to fetch best posts");
};

export const getSubredditPosts = async (subreddit, options = intialOptions) => {
  const url = `${API_URL}/r${subreddit}.json`;

  const query = await fetch(url, options);
  const jsonResponse = await query.json();
  if (query.ok)
    return {
      after: jsonResponse.data.after,
      before: jsonResponse.data.before,
      posts: jsonResponse.data.children,
    };

  throw new Error("Failed to fetch posts from: " + subreddit);
};

export const getAllSubreddits = async (options = intialOptions) => {
  const url = `${API_URL}/subreddits.json`;

  const query = await fetch(url, options);
  const jsonResponse = await query.json();
  if (query.ok)
    return {
      after: jsonResponse.data.after,
      before: jsonResponse.data.before,
      subreddits: jsonResponse.data.map((sbr) => sbr.data),
    };

  throw new Error("Failed to fetch subreddits");
};

export const getPost = async (post, options = intialOptions) => {
  const [subreddit, id] = post;
  const url = `${API_URL}/${subreddit}/comments/${id}/.json`;

  const query = await fetch(url, options);
  const jsonResponse = await query.json();
  if (query.ok)
    return {
      after: jsonResponse[0].data.after,
      before: jsonResponse[0].data.before,
      subreddits: jsonResponse[0].data,
    };

  throw new Error("Failed to fetch post");
};

export const getComments = async (post, options = intialOptions) => {
  const [subreddit, id] = post;
  const url = `${API_URL}/${subreddit}/comments/${id}/.json`;

  const query = await fetch(url, options);
  const jsonResponse = await query.json();
  if (query.ok)
    return {
      after: jsonResponse[1].data.after,
      before: jsonResponse[1].data.before,
      subreddits: jsonResponse[1].data,
    };

  throw new Error("Failed to fetch comments");
};

export const getUser = async (username, options = intialOptions) => {
  if(username === undefined || username === '[deleted]'){
    return null;
  }
  const url = `${API_URL}/user/${username}/about.json`;

  const query = await fetch(url, options);
  const jsonResponse = await query.json();
  if (query.ok) return jsonResponse.data;

  throw new Error("Failed to fetch user");
};
