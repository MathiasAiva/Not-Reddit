import { Skeleton } from "../Skeleton";
import "./commentSkeletonStyle.css";

export const CommentSkeleton = () => {
  return (
    <div className="commentSkeleton">
      <div style={{ display: "flex", alignItems:"center" }}>
        <Skeleton type="thumbnail-ico" />
        <Skeleton type="cmt-sm" />
      </div>
      <Skeleton type="text-lg-cmt" />
      <Skeleton type="text-md-cmt" />
      <Skeleton type="text-sm-cmt" />
    </div>
  );
};
