import { repliesCleaner } from "../../appResources/helperFunctions";
import { useState } from "react";
import { UserDataDisplay } from "./users/userData";

export const CommentSection = ({ arr, users }) => {
  // Using recursion to show the comments and replies in order

  const [state, setState] = useState({ visible: false, id: 0 });
  const [delayHandler, setDelayHandler] = useState(null);
  return (
    <ul>
      {arr.map((comment) => {
        let user;
        // Match imported user to comment author:
          // Finding the user: 
        if (users) {
          user = users.filter((el) => {
            return el.name === comment.author;
          });
        } 
        const u = user[0];
        return comment.body ? (
          <li key={comment.id} className="comment" id={comment.id}>
            <div className="commentBody">
              <header style={{ display: "flex" }} className="commentHeader">
                {/* User Info Display: */}
                <img
                  src={u ? u.image : ""}
                  alt=""
                  style={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "170px",
                    cursor: "pointer",
                  }}
                  onMouseEnter={() =>
                    setDelayHandler(
                      setTimeout(() => {
                        setState(() => ({ visible: true, id: comment.author }));
                      }, 800)
                    )
                  }
                  onMouseLeave={() => {
                    clearTimeout(delayHandler);
                    setState(() => ({ visible: false, id: comment.author }));
                  }}
                />
                <h2
                  onMouseEnter={() =>
                    setDelayHandler(
                      setTimeout(() => {
                        setState(() => ({ visible: true, id: comment.author }));
                      }, 800)
                    )
                  }
                  onMouseLeave={() => {
                    clearTimeout(delayHandler);
                    setState(() => ({ visible: false, id: comment.author }));
                  }}
                  className="comment-header-text"
                >
                  {comment.author}
                </h2>
              </header>
              {u ? (
                <UserDataDisplay
                  visible={state.id === u.name ? state.visible : false}
                  u={u}
                />
              ) : null}
              <article>
                {/* Comment text: */}
                <pre
                  className="commentText"
                  children={comment.body.replace("amp;", "")}
                />
              </article>
            </div>
            <ul>
              <li className="comment reply">
                {/* RECURSION!!! */}
                <CommentSection
                  arr={repliesCleaner(comment.replies)}
                  users={users}
                ></CommentSection>
              </li>
            </ul>
          </li>
        ) : null;
      })}
    </ul>
  );
};
