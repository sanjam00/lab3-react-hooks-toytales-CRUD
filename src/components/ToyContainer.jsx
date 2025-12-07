import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toyList, deleteToy, updateLikes, props }) {
  console.log("toylist:", toyList)

  return (
    <div id="toy-collection">{toyList.map(toy => (
      <ToyCard {...toy} key={toy.id} deleteToy={deleteToy} updateLikes={updateLikes} />
    ))}</div>
  );
}

export default ToyContainer;
