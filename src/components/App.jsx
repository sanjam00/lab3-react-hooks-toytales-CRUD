import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [toyList, setToyList] = useState([])
  const [showForm, setShowForm] = useState(false);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then(res => {
        if (!res.ok) { throw new Error("failed to fetch data") }
        return res.json()
      })
      .then(data => {
        console.log(data)
        setToyList(data)
      })
      .catch(error => console.log("Error while fetching data:", error))
  }, [])

  function addToy(newToy) {
    setToyList(prevList => [...prevList, newToy])
  }

  function deleteToy(deletedToy) {
    setToyList(prevList => prevList.filter(toy => toy.id !== deletedToy))
  }

  function updateLikes(updatedListing) {
    setToyList(prevListing => prevListing.map(listing => listing.id === updatedListing.id ? updatedListing : listing))
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm addToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toyList={toyList} deleteToy={deleteToy} updateLikes={updateLikes} />
    </>
  );
}

export default App;
