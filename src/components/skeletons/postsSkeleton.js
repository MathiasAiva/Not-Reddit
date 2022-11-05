import "./skeleton.css";
import "./postsSkeleton.css";
import { Skeleton } from "./Skeleton.js";

export const PostsSkeleton = () => {
  return (
    <div>
      <div className="PostStyling sk-post">
        <Skeleton type="text-sm" />
        <Skeleton type="text-lg" />
        <Skeleton type="text-md" />
        <Skeleton type="thumbnail-md" />
      </div>
      <div className="PostStyling sk-post">
        <Skeleton type="text-sm" />
        <Skeleton type="text-lg" />
        <Skeleton type="text-md" />
        <Skeleton type="thumbnail-md" />
      </div>
      <div className="PostStyling sk-post">
        <Skeleton type="text-sm" />
        <Skeleton type="text-lg" />
        <Skeleton type="text-md" />
        <Skeleton type="thumbnail-md" />
      </div>
      <div className="PostStyling sk-post">
        <Skeleton type="text-sm" />
        <Skeleton type="text-lg" />
        <Skeleton type="text-md" />
        <Skeleton type="thumbnail-md" />
      </div>
      <div className="PostStyling sk-post">
        <Skeleton type="text-sm" />
        <Skeleton type="text-lg" />
        <Skeleton type="text-md" />
        <Skeleton type="thumbnail-md" />
      </div>
      <div className="shimmer-wrapper">
        <div className="shimmer"></div>
      </div>
    </div>
  );
};
