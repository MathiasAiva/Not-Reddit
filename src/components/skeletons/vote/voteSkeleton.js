import { Skeleton } from "../Skeleton";
import "./voteSkeleton.css"

export const VoteSkeleton = () => {
  return (
    <div className="vt-skt-content">
      <Skeleton type="thumbnail-sm-ico upVote-skt" />
      <Skeleton type="thumbnail-sm-ico downVote-skt" />
    </div>
  );
};
