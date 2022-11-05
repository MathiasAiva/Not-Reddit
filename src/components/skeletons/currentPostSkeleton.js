import "./skeleton.css";
import { Skeleton } from "./Skeleton";
import { VoteSkeleton } from "./vote/voteSkeleton";
import { CommentSkeleton } from "./comment/commentSkeleton";

export const CurrentPostSkeleton = () => {
  return (
    <div className="skeleton-wrapper" style={{width:'45rem'}}>
      <div className="sk-content">
        <VoteSkeleton />
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <Skeleton type="text-sm" />
          <Skeleton type="text-md" />
          <Skeleton type="thumbnail-lg" />
        </div>
      </div>
      <CommentSkeleton />
      <CommentSkeleton />
      <CommentSkeleton />
      <CommentSkeleton />

      <div className="shimmer-wrapper">
        <div className="shimmer"></div>
      </div>
    </div>
  );
};
