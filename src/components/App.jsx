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

  console.log("toylist in App.jsx:", toyList)

  return (
    <>
      <Header />
      {showForm ? <ToyForm /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toyList={toyList} />
    </>
  );
}

export default App;
