import React from "react";
import icon from "./AlienBlue_Icon.png";
import "./navStyle.css";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCurrentPosts } from "../../features/posts/postsSlice";
import { useState } from "react";

export function NavBar(props) {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [hidden, setHidden] = useState(false);
  const subreddits = [
    "r/sports",
    "r/tennis",
    "r/climbing",
    "r/fantasyfootball",
    "r/leafs",
    "r/nrl",
    "r/worldnews",
    "r/nottheonion",
    "r/technews",
    "r/savedyouaclick",
    "r/olympics",
    "r/offbeat",
    "r/Steam",
    "r/leagueoflegends",
    "r/StardewValley",
    "r/yugioh",
    "r/gtaonline",
    "r/dndnext",
  ];
  const changeHandler = ({ target }) => {
    const subs = subreddits.filter((sub) => {
      return sub.includes(target.value) ? sub : null;
    });
    setOptions(subs);
  };
  if (options.length > 4) {
    setOptions(options.slice(0, 4));
  }
  const hide = () => {
    setHidden(true);
  };
  const show = () => {
    setHidden(false);
  };
  return (
    <div>
      <div className="nav-content">
        <NavLink
          to="/"
          id="Navtitle"
          onClick={() => dispatch(updateCurrentPosts("/coolguides"))}
        >
          <img src={icon} alt="NotReddit Icon" id="icon"></img>
          <h2 id="Not-Reddit">
            Not<span id="Reddit">Reddit</span>
          </h2>
        </NavLink>
        <form>
          <input
            type="text"
            id="searchBar"
            placeholder="Search Not Reddit"
            autoComplete="off"
            onChange={changeHandler}
            onFocus={show}
            onBlur={hide}
          />
        </form>
      </div>
      <div className="searchElements">
        {!hidden
          ? options.map((i) => {
              return (
                <Link to={i} key={i} className="searchElement" onClick={show}>
                  {i}
                </Link>
              );
            })
          : null}
      </div>
    </div>
  );
}
