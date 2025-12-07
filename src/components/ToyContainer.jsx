import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toyList, props }) {
  console.log("toylist:", toyList)

  return (
    <div id="toy-collection">{toyList.map(toy => (
      <ToyCard toy={toy} key={toy.id} />
    ))}</div>
  );
}

export default ToyContainer;
