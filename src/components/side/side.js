import React from "react";
import { NavLink } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import './side.css'

const activeLinkColor = ({ isActive }) => {
  return {
    display: "block",
    color: isActive ? "red" : "",
  }; // Activates when the link gets clicked
};

export function Side() {
  const subreddits = [
    "funny",
    "AskReddit",
    "gaming",
    "aww",
    "Music",
    "science",
    "worldnews",
  ];
  let key = 0;
  return (
    <div>
      <ul className="side">
        {subreddits.map((subreddit) => {
          return (
            <li key={key+=1}>
              <NavLink style={activeLinkColor} to={"/" + subreddit} className='subredditLinks'>
                {subreddit}
              </NavLink>
            </li>
          );
        })}
      </ul>
      {/* <Routes>
        <Route path={'/'+{subreddits}} element={<h1>AAA</h1>}/>
      </Routes> */}
    </div>
  );
}
