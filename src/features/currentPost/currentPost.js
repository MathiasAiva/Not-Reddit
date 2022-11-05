// React Imports:
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// Resources Imports:
import "../resources/CurrentPostStyle.css";
import "../resources/PostsStyles.css";
// Function Imports:
import { updateCurrentPostData } from "./currentPostSlice";
import {
  complexPostCleaner,
  commentCleaner,
} from "../../../appResources/helperFunctions";
import { CommentSection } from "./commentSection";
import { CurrentPostSkeleton } from "../../../components/skeletons/currentPostSkeleton";
import { Votes } from "../../../components/votes/votes";
import { Side } from "../../../components/side/side";
import { getUser } from "../../../API/API";
import { repliesCleaner } from "../../../appResources/helperFunctions";
////////////////////////////////////////////////////////////////////////////////////
const u = [];
const getAllUsers = (arr) => {
  arr.forEach((e) => {
    const replies = repliesCleaner(e.replies);
    if (replies && replies.length >= 1) {
      getAllUsers(replies);
    }
    u.push(getUser(e.author));
  });
};

export function CurrentPost(props) {
  // Variables:
  const dispatch = useDispatch();
  const location = useLocation();
  const { id, subreddit } = location.state;
  useEffect(() => {
    dispatch(updateCurrentPostData([subreddit, id]));
  }, [subreddit, id, dispatch]);

  const { status } = useSelector((state) => state.currentPost);
  const data = useSelector((state) => {
    if (status === "fulfilled") {
      // Only call on fulfilled
      return {
        post: complexPostCleaner(state.currentPost),
        comments: commentCleaner(state.currentPost.currentPostData),
      };
    } else return [];
  });

  const { post, comments } = data;
  const [users, setUsers] = useState([]);
  if (status === "fulfilled") {
    getAllUsers(comments);
  }
  useEffect(() => {
    u.forEach((el) => {
      el.then((a) => {
        if (a) {
          setUsers((prev) => [
            ...prev,
            {
              image: a.icon_img.replace(/amp;/g, ""),
              name: a.name,
              awardee_karma: a.awardee_karma,
              awarder_karma: a.awarder_karma,
              comment_karma: a.comment_karma,
              id: a.id,
              snoovatar_img: a.snoovatar_img,
              snoovatar_size: a.snoovatar_size,
              total_karma: a.total_karma,
            },
          ]);
        }
      });
    });
  }, [status]);
  const filteredUsers = [
    ...new Map(users.map((item) => [item.id, item])).values(),
  ];
  console.log(filteredUsers);
  // Display Code:
  return (
    <div style={{ display: "flex", marginTop: "6rem" }}>
      <div className="Post PostStyling" id="currentPost">
        {status !== "fulfilled" ? (
          <CurrentPostSkeleton />
        ) : (
          <div>
            <div>
              <div id="CPI">
                <Votes score={post.score} className="Votes" />
                <div id="currentPostContent">
                  <header>
                    <h3 className="Info author currentPostText">
                      <span style={{ fontWeight: "bold" }}>
                        r/{post.subreddit}
                      </span>{" "}
                      • Posted by u/{post.author} {post.created}hrs ago.
                    </h3>
                  </header>
                  <div className="MainPostInfo">
                    <div>
                      <h2 className="PostTitle currentPostText">
                        {post.title}
                      </h2>
                      <ReactMarkdown
                        className="PostSelfText"
                        children={post.selftext
                          .replace("amp;", "")
                          .replace("&#x200B;", "")}
                        remarkPlugins={[remarkGfm]}
                      />
                    </div>
                    {post.preview && post.preview.images ? (
                      <img
                        src={post.preview.images[0].source.url.replace(
                          "amp;",
                          ""
                        )}
                        alt={post.preview.images[0].id}
                        className="postImage currentPostImage"
                        style={{
                          width: "40rem",
                          height: "auto",
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="commentSection">
                <CommentSection
                  arr={comments}
                  users={filteredUsers}
                ></CommentSection>
              </div>
            </div>
          </div>
        )}
      </div>
      <Side
        subredditInfo={true}
        subredditRules={true}
        arg={`/${subreddit.replace("r/", "")}`}
      />
    </div>
  );
}
