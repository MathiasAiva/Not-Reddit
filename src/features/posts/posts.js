// React Imports
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
// Resources Imports:
import "./resources/PostsStyles.css";
// Function Imports
import {
  basicPostCleaner,
  resizeImages,
} from "../../appResources/helperFunctions";
import { updateCurrentPosts } from "./postsSlice";
import { Votes } from "../../components/votes/votes";
import { PostsSkeleton } from "../../components/skeletons/postsSkeleton";
import { Side } from "../../components/side/side";

export function Post(props) {
  // Variables
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.posts);
  const url = "/coolguides/hot";

  // Hook Calls n' such
  useEffect(() => {
    dispatch(updateCurrentPosts(url));
  }, [dispatch, url]);

  const posts = useSelector((state) => {
    if (state.posts.status === "fulfilled") {
      // Only call on fulfilled
      return basicPostCleaner(state.posts.currentPosts.posts);
    } else return [];
  });

  // Display Info:

  return (
    <div>
      {status !== "fulfilled" ? (
        <PostsSkeleton />
      ) : (
        <div style={{ display: "flex" }}>
          <div>
            {posts.map((post) => {
              console.log(post)
              return (
                <div className="PostStyling Post" key={post.id}>
                  <Votes score={post.score} />
                  <Link
                    className="PostContent Link"
                    to={"/" + post.id}
                    state={post}
                  >
                    <div id="postData">
                      <h3 className="Info">{`Posted by ${post.author}`}</h3>
                    </div>
                    <div className="MainPostInfo">
                      <div>
                        <h2
                          className="PostTitle"
                          style={{ fontWeight: "bold" }}
                        >
                          {post.title.replace("amp;", "")}
                        </h2>
                      </div>
                      {post.preview && post.preview.images ? (
                        <img
                          src={post.preview.images[0].source.url
                            .replace("amp;", "")
                            .replace("amp;", "")}
                          alt={post.preview.images[0].id}
                          className="postImage"
                          style={{
                            width: resizeImages(
                              post.preview.images[0].source.width,
                              post.preview.images[0].source.height
                            ).width,
                            height: resizeImages(
                              post.preview.images[0].source.width,
                              post.preview.images[0].source.height
                            ).height,
                          }}
                        />
                      ) : null}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          <Side categories={true} userAgreement={true} />
        </div>
      )}
    </div>
  );
}
