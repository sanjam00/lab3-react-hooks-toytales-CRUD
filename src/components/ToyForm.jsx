import { React, useState, useEffect } from "react";

function ToyForm({ addToy, props }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  })

  function handleSubmit(e) {
    e.preventDefault();

    const newToy = {
      ...formData,
      likes: 0
    }

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToy)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("failed to create toy listing")
        }
        return response.json()
      })
      .then(newToy => {
        // use prop to add new toy to state
        addToy(newToy)
        //  and clear state
        setFormData({
          name: "",
          image: "",
        })
      })
      .catch(error => console.log("Error creating data", error))
  }

  const handleChange = event => {
    setFormData(previousData => ({
      ...previousData,
      [event.target.name]: event.target.value
    }))
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={formData.name}
          // onChange={(e) => setFormData(e.target.value)}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={formData.image}
          // onChange={(e) => setFormData(e.target.value)}
          onChange={handleChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
