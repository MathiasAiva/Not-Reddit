import { useState, useEffect } from "react";
import "./subreddiRules.css";
import { getSubredditRules } from "../../../API/API";
import downArrow from "./downArrow.svg";

export const SubredditRules = ({ arg }) => {
  const [rules, setRules] = useState({
    status: "idling",
    data: {},
  });
  let subData = rules.data;

  useEffect(() => {
    getSubredditRules(arg).then((data) =>
      setRules({ status: "fulfilled", data })
    );
  }, [arg]);
  return rules.status === "fulfilled" ? (
    <div className="subredditRules">
      <div
        className="banner"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1 className="rules-title">r{arg} rules</h1>
      </div>
      <ol className="rulesList">
        {subData.map((rule) => {
          return (
            <li className="rule">
              <div className="rule-content">
                <div className="rule-text">
                  {rule.short_name}
                  {rule.description ? (
                    <img
                      src={downArrow}
                      alt=""
                      style={{ width: "20px", height: "auto" }}
                      className="rule-show-arrow"
                    />
                  ) : null}
                </div>
                <div>
                  {" "}
                  {rule.description ? (
                    <h3 className="rule-description">{rule.description}</h3>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  ) : null;
};
