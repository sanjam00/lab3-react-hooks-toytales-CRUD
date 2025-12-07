import React from "react";

function ToyCard({ id, name, image, likes, deleteToy, updateLikes, props }) {

  function handleDelete() {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE"
    })
      .then(r => {
        if (!r.ok) {
          throw new Error("failed to fetch")
        }
        deleteToy(id)
      })
      .catch(error => console.log("fetch request failed:", error))
  }

  function handleLike() {
    const newLikes = likes + 1

    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: newLikes })
    })
      .then(r => {
        if (!r.ok) { throw new Error("failed to favorite listing") }
        return r.json();
      })
      .then((updatedToy) => {
        updateLikes(updatedToy)
        console.log(`Toy with id ${id} was successfully liked/unliked`)
      })
      .catch(error => console.log("Fetch request failed:", error))
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLike}>Like {"<3"}</button>
      <button className="del-btn" onClick={handleDelete}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
