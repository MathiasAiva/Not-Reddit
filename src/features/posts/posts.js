// IMPORTS:
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./resources/PostsStyles.css";
import {
  basicPostCleaner,
  resizeImages,
} from "../../appResources/helperFunctions";
import { updateCurrentPosts } from "./postsSlice";
import { Votes } from "../../components/votes/votes";
import { PostsSkeleton } from "../../components/skeletons/postsSkeleton";
import { Side } from "../../components/side/side";
import { getSubreddit } from "../../API/API";
import { InfoBarTop } from "../../components/infoBar/infoBar";
import { useWindowSize } from "../../appResources/helperFunctions";


// CODE START:

export function Posts({ isSubreddit }) {
  const location = useLocation();
  const pathname = location.pathname;

  // Variables
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.posts);
  let url = pathname === "/" ? "/coolguides" : pathname.replace("r/", "");
  const [subreddit, setSubreddit] = useState({
    status: "idling",
    data: {},
  });

  // Hook Calls n' such
  useEffect(() => {
    dispatch(updateCurrentPosts(url));
    getSubreddit(url).then((data) =>
      setSubreddit({ status: "fulfilled", data })
    );
  }, [dispatch, url]);

  const posts = useSelector((state) => {
    if (state.posts.status === "fulfilled") {
      // Only call on fulfilled
      return basicPostCleaner(state.posts.currentPosts.posts);
    } else return [];
  });

  const size = useWindowSize();

  // Display Info:

  return (
    <div>
      <div>
        <InfoBarTop
          arg={{ sub: pathname.replace("r/", ""), subData: subreddit }}
          isSubreddit={isSubreddit}
        />
      </div>

      <div>
        {status !== "fulfilled" ? (
          <PostsSkeleton />
        ) : (
          <div style={{ display: "flex" }}>
            <div>
              {posts.map((post) => {
                return (
                  <div className="PostStyling Post" key={post.id}>
                    <Votes score={post.score} />
                    <Link
                      className="PostContent Link"
                      to={`post/${post.id}/${post.title.replace(/\//g, "-")}/`}
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
                                post.preview.images[0].resolutions
                              ).width,
                              height: resizeImages(
                                post.preview.images[0].resolutions
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
            {size.width > 600 ? (
              <Side
                categories={true}
                isSubreddit={isSubreddit}
                userAgreement={true}
                arg={pathname.replace("/r", "")}
              />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
