import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPosts } from "./postsSlice";
import { useEffect } from "react";
import "./styles/PostsStyles.css";
import Spinner from "../../components/spinner";
import upVote from "./styles/upVote.svg";
import downVote from "./styles/downVote.png";
import { NavLink, Route, Routes } from "react-router-dom";
import { CurrentPost } from "../currentPost/currentPost";

function numberFormatter(num) {
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

export const postExtractor = (posts) => {
  // Extracts certan data from a post
  const cleanedPosts = posts.map((post) => {
    const data = post.data;
    return {
      id: data.id,
      author: data.author,
      name: data.name,
      permalink: data.permalink,
      commentCount: data.num_comments,
      nsfw: data.over_18,
      media: data.media_embed,
      score: numberFormatter(data.score),
      subreddit: data.subreddit_name_prefixed,
      title: data.title,
      url: data.url,
      selftext: data.selftext,
      preview: data.preview,
    };
  });

  return cleanedPosts;
};

export function Post(props) {
  const dispatch = useDispatch();
  const url = "/coolguides";

  useEffect(() => {
    dispatch(updateCurrentPosts(url));
  }, [url]);

  const { isLoading, status } = useSelector((state) => state.posts);

  const posts = useSelector((state) => {
    if (state.posts.status === "fulfilled") {
      return postExtractor(state.posts.currentPosts.posts);
    } else return [];
  });

  if (status === "loading") {
    <div className="Post">
      <div className="votes">
        <button className="upVote voteButton">
          <img src={upVote} alt="upVote" className="voteArrows" />
        </button>
        <div className="skeleton skeleton-text"></div>
        <button className="downVote voteButton">
          <img src={downVote} alt="downVote" className="voteArrows" />
        </button>
      </div>
      <div className="PostContent">
        <h4 id="postData">
          <div className="skeleton skeleton-text"></div>
        </h4>
        <div className="MainPostInfo">
          <h3>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
          </h3>
          <img className="skeleton" alt="" />
        </div>
      </div>
    </div>;
  }
  if (status === "fulfilled") {
    return posts.map((post) => {
      return (
        <div className="Post" key={post.id}>
          <div className="votes">
            <button className="upVote voteButton">
              <img src={upVote} alt="upVote" className="voteArrows" />
            </button>
            <h3 className="UpVoteAmount">{post.score}</h3>
            <button className="downVote voteButton">
              <img src={downVote} alt="downVote" className="voteArrows" />
            </button>
          </div>
          <NavLink className="PostContent" to={"/post/" + post.id}>
            <div id="postData">
              <h3 className="Info">{`Posted by ${post.author}`}</h3>
            </div>
            <div className="MainPostInfo">
              <div>
                <h2 className="PostTitle">{post.title}</h2>
                <p className="PostSelfText">{post.selftext}</p>
              </div>
              {post.preview && post.preview.images ? (
                <img
                  src={post.preview.images[0].source.url.replace("amp;", "")}
                  alt={post.preview.images[0].id}
                  className="postImage"
                />
              ) : null}
            </div>
          </NavLink>
        </div>
      );
    });
  }
}
