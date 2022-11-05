import "./userDataStyle.css";
import { numberFormatter } from "../../../../appResources/helperFunctions";

export const UserDataDisplay = ({ u, visible }) => {
  return u ? (
    <div
      className="u-data-display"
      style={visible ? { display: "flex" } : { display: "none" }}
    >
      {u.snoovatar_img ? (
        <div className="u-header-avatar">
          <img
            src={u ? u.snoovatar_img : ""}
            alt=""
            style={{
              height: `${u.snoovatar_size[1] / 3}px`,
              width: `${u.snoovatar_size[0] / 2.7}px`,
              borderRadius: "170px",
            }}
            className="u-avatar"
          />
          <div className="u-header-avatar-text">
            <h2 className="u-mainText">{u.name}</h2>
            <h4 className="u-descText">u/{u.name} • created</h4>
          </div>
        </div>
      ) : (
        <div className="u-header">
          <img
            src={u ? u.image : ""}
            alt=""
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "5px",
            }}
          />
          <div className="u-header-text">
            <h2 className="u-mainText">{u.name}</h2>
            <h4 className="u-descText">u/{u.name} • created</h4>
          </div>
        </div>
      )}

      <div className="u-data">
        <div>
          <h2 className="u-mainText">
            {numberFormatter(
              u.total_karma -
                (u.awardee_karma + u.awarder_karma + u.comment_karma)
            )}
          </h2>
          <h4 className="u-descText">Post Karma</h4>
        </div>
        <div>
          <h2 className="u-mainText">{numberFormatter(u.comment_karma)}</h2>
          <h4 className="u-descText">Comment Karma</h4>
        </div>
        <div>
          <h2 className="u-mainText">{numberFormatter(u.awardee_karma)}</h2>
          <h4 className="u-descText">Awardee Karma</h4>
        </div>
        <div>
          <h2 className="u-mainText">{numberFormatter(u.awarder_karma)}</h2>
          <h4 className="u-descText">Awarder Karma</h4>
        </div>
      </div>
    </div>
  ) : null;
};
