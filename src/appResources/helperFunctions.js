import { updateCurrentPosts } from "../features/posts/postsSlice";
import { postsSlice } from "../features/posts/postsSlice";
import { useDispatch } from "react-redux";

export function numberFormatter(num) {
  // Formats Numbers, so If you got 10000 it will return 10k

  if (num < 1000) return num;
  const cases = [
    { value: 1e3, symbol: "k" }, // 1e3 = 1000
    { value: 1e6, symbol: "M" }, // 1e6 = 1000000
  ];
  const regex = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = cases.length - 1; i > 0; i--) {
    if (num >= cases[i].value) {
      break;
    }
  }
  return (
    (num / cases[i].value).toFixed(1).replace(regex, "$1") + cases[i].symbol
  );
}

export const dateFormatter = (int) => {
  const date = new Date(int * 1000);
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    hours: date.getHours(),
    date: date,
  };
};
export const getDateDifference = (d2) => {
  const x = 1000 * 60 * 60 * 24;
  const d1 = new Date();
  const utc1 = Date.UTC(
    d1.getFullYear(),
    d1.getMonth(),
    d1.getDate(),
    d1.getHours()
  );
  const utc2 = Date.UTC(
    d2.getFullYear(),
    d2.getMonth(),
    d2.getDate(),
    d2.getHours()
  );
  const diff = Math.floor(utc1 - utc2);
  let t = diff / x;
  if (t * 24 * 60 < 60) {
    return t * 24 * 60;
  } else if (t * 24 < 60) {
    return t * 24;
  }
  return t;
};

export const monthToInitials = (month) => {
  switch (month) {
    case 1:
      return "Jan";
    case 2:
      return "Feb";
    case 3:
      return "Mar";
    case 4:
      return "Apr";
    case 5:
      return "May";
    case 6:
      return "Jun";
    case 7:
      return "Jul";
    case 8:
      return "Agu";
    case 9:
      return "Sep";
    case 10:
      return "Oct";
    case 11:
      return "Nov";
    case 12:
      return "Dec";
    default:
      return "NaN";
  }
};

export const basicPostCleaner = (posts) => {
  // Extracts basic data from a post
  const cleanedPosts = posts.map((post) => {
    const data = post.data;
    return {
      id: data.id,
      author: data.author,
      nsfw: data.over_18,
      score: numberFormatter(data.score),
      subreddit: data.subreddit_name_prefixed,
      title: data.title,
      selftext: data.selftext,
      preview: data.preview,
    };
  });

  return cleanedPosts;
};

export const complexPostCleaner = (pst) => {
  // Extracts more specific data from a post
  const postData = pst.currentPostData.post.subreddits.children[0].data;
  const post = {
    title: postData.title,
    selftext: postData.selftext,
    author: postData.author,
    awards: postData.all_awardings,
    created: getDateDifference(dateFormatter(postData.created).date),
    id: postData.id,
    commentCount: postData.num_comments,
    permalink: postData.permalink,
    preview: postData.preview,
    images: postData.preview,
    score: numberFormatter(postData.score),
    upRatio: postData.upvote_ratio,
    subreddit: postData.subreddit,
    subreddit_id: postData.subreddit_id,
    subreddit_subs: postData.subreddit_subscribers,
    subreddit_type: postData.subreddit_type,
  };

  return post;
};

export const commentCleaner = (cmmnt) => {
  const commentData = cmmnt.comments.subreddits.children;
  let comments = commentData.map((e) => {
    const dt = e.data;
    const comment = {
      awards: dt.all_awardings,
      author: dt.author,
      body: dt.body,
      created: dt.created,
      id: dt.id,
      link_id: dt.link_id,
      parent_id: dt.parent_id,
      replies: dt.replies ? dt.replies.data.children : [],
      score: numberFormatter(dt.score),
    };
    return comment;
  });
  return comments;
};

export const repliesCleaner = (rpl) => {
  let replies = rpl.map((e) => {
    const dt = e.data;
    const reply = {
      awards: dt.all_awardings,
      author: dt.author,
      body: dt.body,
      created: dt.created,
      id: dt.id,
      link_id: dt.link_id,
      parent_id: dt.parent_id,
      replies: dt.replies ? dt.replies.data.children : [],
      score: numberFormatter(dt.score),
    };
    return reply;
  });
  return replies;
};

export const getTopCategory = (categories) => {
  const rand = Math.floor(Math.random(1) * categories.length);
  const category = categories[rand];
  return category;
};

export const displayCurrentPosts = (arg) => {
  const dispatch = useDispatch;
  return () => {
    dispatch(updateCurrentPosts(arg));
  };
};
export const deleteCurrentPosts = () => {
  const { cleanCurrentPosts } = postsSlice.actions;
  return () => {
    useDispatch(cleanCurrentPosts());
  };
};

export const resizeImages = (w, h) => {
  let width = w / 2;
  let height = h / 2;
  // const x = parseFloat((h / w).toFixed(2));
  // let ratio;
  // if (x < 1) {
  //   ratio = [1 + x, 1];
  //   width = w * (ratio[0] * 0.40);
  //   height = h * (ratio[1] * 0.40);
  // } else if (x > 1) {
  //   ratio = [1, 1 + x];
  //   width = w * (ratio[0] * 0.50);
  //   height = h * (ratio[1] * 0.30);
  // } else {
  //   ratio = [1, 1];
  // }
  return {
    width: width,
    height: height,
  };
};
