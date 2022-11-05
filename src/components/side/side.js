import React from "react";
import "./side.css";
import { DisplayTopCategories } from "./displayTopReddits/displayTopCategories";
import { UserAgreement } from "./UserAgreement/userAgreement";
import { SubredditInfo } from "./SubredditInfo/subredditInfo";
import { SubredditRules } from "./subreddiRules/subredditRules";

export function Side({ categories, userAgreement, subredditInfo, arg, subredditRules }) {
  return (
    <div>
      {categories ? <DisplayTopCategories /> : null}
      {userAgreement ? <UserAgreement /> : null}
      {subredditInfo ? <SubredditInfo arg={arg}/> : null}
      {subredditRules ? <SubredditRules arg={arg}/> : null}
    </div>
  );
}
