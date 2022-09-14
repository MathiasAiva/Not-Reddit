import React from "react";
import "./PostsStyles.css";
import upVote from './upVote.svg'
import downVote from './downVote.png'

export function Posts(props) {
  const amount = 20;
  const caption =
    "Explora lo desconocido, da rienda suelta a la originalidad. Para @anitta, cada paso en NMD_V3 significa crear una nueva ruta. Ya disponibles en adidas.es/nmd y tiendas seleccionadas en todo el mundo. #NMD";
  return (
    <div className="PostContent">
      <div className="votes">
        <button className="upVote voteButton"><img src={upVote} alt='upVote' className="voteArrows"/></button>
        <h3 className="UpVoteAmount">{amount}</h3>
        <button className="downVote voteButton"><img src={downVote} alt='downVote' className="voteArrows"/></button>
      </div>
      <div className="MainPostInfo"> 
        <div>
          <h2 className="PostCaption">{caption}</h2>
        </div>
        <div>
          <h3 className="Info">Info</h3>
        </div>
      </div>
    </div>
  );
}
