import { useState, useEffect } from "react";
import "./subreddiRules.css";
import '../side.css'
import { getSubredditRules } from "../../../API/API";
import downArrow from "./downArrow.svg";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

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
            <li className="rule" key={rule.short_name}>
              <div className="rule-content">
                <div className="rule-text">
                  {rule.short_name}{" "}
                  {rule.description ? (
                    <ReactMarkdown className="rule-description">
                      {rule.description}
                    </ReactMarkdown>
                  ) : null}
                </div>

                {rule.description ? (
                  <img
                    src={downArrow}
                    alt=""
                    style={{ width: "20px", height: "auto" }}
                    className="rule-show-arrow"
                  />
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  ) : null;
};
