import React from "react";
import { DisplayTopCategories } from "./displayTopReddits/displayTopCategories";
import { UserAgreement } from "./UserAgreement/userAgreement";
import { SubredditInfo } from "./SubredditInfo/subredditInfo";
import { SubredditRules } from "./subreddiRules/subredditRules";

export function Side({
  categories,
  userAgreement,
  subredditInfo,
  arg,
  subredditRules,
  isSubreddit,
}) {
  // Display certain side configurations depending on whats needed:
  return (
    <div>
      {isSubreddit ? (
        <div>
          <SubredditInfo arg={arg} isSubreddit={isSubreddit} />
          <SubredditRules arg={arg} />
        </div>
      ) : null}
      {subredditInfo ? <SubredditInfo arg={arg} /> : null}
      {subredditRules ? <SubredditRules arg={arg} /> : null}
      {categories && !isSubreddit ? <DisplayTopCategories /> : null}
      {userAgreement && !isSubreddit ? <UserAgreement /> : null}
    </div>
  );
}
