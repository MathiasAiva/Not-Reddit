import "./infoBarStyle.css";
import image from "./image.png";
import link from "./link.png";

export const InfoBarTop = ({ arg, isSubreddit }) => {
  // If isSubreddit, then display the subreddit info
  
  const subData = arg.subData.data;
  const status = arg.subData.status;
  let backgroundImage =
    status === "fulfilled" && isSubreddit
      ? subData.banner_background_image
        ? subData.banner_background_image.replace(/amp;/g, "")
        : subData.banner_img.replace(/amp;/g, "")
      : null;
  let iconImage =
    status === "fulfilled" && isSubreddit
      ? subData.icon_img
        ? subData.icon_img.replace(/amp;/g, "")
        : subData.community_icon.replace(/amp;/g, "")
      : null;
  return (
    <div className="infoBar">
      {isSubreddit && status === "fulfilled" ? (
        <div>
          {" "}
          <div
            style={{
              backgroundColor: subData.banner_background_color,
              backgroundImage: `url(${backgroundImage})`,
            }}
            className="bannerImg"
          />
          <div className="topInfo" style={{ display: "flex" }}>
            <img src={iconImage} alt="icon" className="subIcon"></img>
            <div style={{ display: "flex" }}>
              <div>
                <h1>{subData.title}</h1>
                <h4 className="Info" style={{ fontWeight: "bold" }}>
                  {subData.url}
                </h4>
              </div>
              <button
                className="subButton"
                value={false}
                style={{ backgroundColor: subData.primary_color }}
              >
                Join
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div>
        <div className="postCreate" style={{ display: "flex" }}>
          <input
            type="text"
            maxLength="1"
            placeholder="Create Post"
            readOnly
            className="createPostInput"
          />
          <button className="actionIcon">
            <img src={image} alt="" style={{ width: "25px", height: "25px" }} />
          </button>
          <button className="actionIcon">
            <img src={link} alt="" style={{ width: "25px", height: "25px" }} />
          </button>
        </div>
      </div>
    </div>
  );
};
