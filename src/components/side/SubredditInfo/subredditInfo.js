import { useState, useEffect } from "react";
import { getSubreddit } from "../../../API/API";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import {
  dateFormatter,
  monthToInitials,
  numberFormatter,
} from "../../../appResources/helperFunctions";
import "./subredditInfo.css";
import cakeSvg from "./cake.svg";

const getDate = (created) => {
  let { month, day, year } = dateFormatter(created);
  return `Created ${monthToInitials(month + 1)} ${day}, ${year}`;
};

export const SubredditInfo = ({ arg }) => {
  const [subreddit, setSubreddit] = useState({
    status: "idling",
    data: {},
  });
  let subData = subreddit.data;

  useEffect(() => {
    getSubreddit(arg).then((data) =>
      setSubreddit({ status: "fulfilled", data })
    );
  }, [arg]);
  return subreddit.status === "fulfilled" ? (
    <div className="subS">
      <div className="banner"></div>
      <div className="subS-info">
        <div className="subS-info-content">
          <header
            className="subS-header"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              src={subData.community_icon.replace("amp;", "")}
              alt=""
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "180px",
                marginRight: "0.4rem",
              }}
            />
            <h2 style={{ fontWeight: "bold" }}>r{arg}</h2>
          </header>
          <article className="subS-info-article">
            <ReactMarkdown
              className="subS-info-text"
              style={{ marginTop: "0.7rem", fontSize: "0.95em" }}
            >
              {subData.public_description}
            </ReactMarkdown>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                marginTop: "0.6rem",
              }}
            >
              <img
                src={cakeSvg}
                alt=""
                style={{ width: "20px", height: "20px", marginRight: "0.5rem" }}
              />
              <h3 style={{ color: "#BABABB" }}>{getDate(subData.created)}</h3>
            </div>
          </article>
        </div>
        <div className="subS-data" style={{ display: "flex" }}>
          <div>
            <h3 className="subS-stats">
              {numberFormatter(subData.subscribers)}
            </h3>
            <h5 className="subS-stats-desc">Members</h5>
          </div>
          <div style={{ marginLeft: "3rem" }}>
            <h3 className="subS-stats">
              {numberFormatter(subData.accounts_active)}
            </h3>
            <h5 className="subS-stats-desc">Online</h5>
          </div>
        </div>
        <div className="subS-join">
          <button className="joinSubreddit" value={false}>
            Join
          </button>
        </div>
        <div className="com-options"></div>
      </div>
      <div className="subS-rules"></div>
      <div className="subS-mods"></div>
    </div>
  ) : null;
};
