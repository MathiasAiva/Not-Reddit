import "./skeleton.css";
export const Skeleton = ({ type }) => {
  return (
    <div className="skeleton">
      <div className={type}> </div>
    </div>
  );
};
