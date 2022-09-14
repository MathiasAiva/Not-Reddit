import React from "react";
import icon from './AlienBlue_Icon.png'
import './navStyle.css'

export function NavBar(props){
    return(
        <div className="content">
            <div id="Navtitle">   
                <img src={icon} alt="NotReddit Icon" id='icon'></img>
                <h2 id="Not-Reddit">Not<span id="Reddit">Reddit</span></h2>
            </div>
            <form>
                <input type='text' id="searchBar" placeholder="Search Not Reddit"/> 
            </form>
        </div>
    )
}