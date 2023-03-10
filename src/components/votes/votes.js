import upVote from "./upVote.svg";
import downVote from "./downVote.svg";
import "./votesStyle.css"

export const Votes = ({score}) => {
  // This is static, users can't interact with it.
  // I might implement login in the future and make this usable
    return(
        <div className="votes">
            <button className="upVote voteButton">
              <img src={upVote} alt="upVote" className="voteArrows" />
            </button>
            <h3 className="UpVoteAmount">{score}</h3>
            <button className="downVote voteButton">
              <img src={downVote} alt="downVote" className="voteArrows" />
            </button>
          </div>
    )
}