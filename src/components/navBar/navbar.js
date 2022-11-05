import React from "react";
import icon from "./AlienBlue_Icon.png";
import "./navStyle.css";
import { NavLink } from "react-router-dom";
import {useDispatch} from 'react-redux';
import {updateCurrentPosts} from '../../features/posts/postsSlice'

export function NavBar(props) {
  const dispatch = useDispatch();
  return (
    <div className="nav-content">
      <NavLink to="/" id="Navtitle" onClick={() =>
                  dispatch(updateCurrentPosts('/coolguides'))
                }>
          <img src={icon} alt="NotReddit Icon" id="icon"></img>
          <h2 id="Not-Reddit">
            Not<span id="Reddit">Reddit</span>
          </h2>
      </NavLink>
      <form>
        <input type="text" id="searchBar" placeholder="Search Not Reddit" />
      </form>
    </div>
  );
}
