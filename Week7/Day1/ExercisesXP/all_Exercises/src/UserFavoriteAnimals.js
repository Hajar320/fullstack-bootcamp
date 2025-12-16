// UserFavoriteAnimals.js
import React, { Component } from "react";

class UserFavoriteAnimals extends Component {
  render() {
    // Access the animals array passed via props
    const { animals } = this.props;

    return (
      <div className="favorite-animals">
        <h3>Favorite Animals List:</h3>

        {/* Create unordered list with map method */}
        <ul className="animals-list">
          {animals.map((animal, index) => (
            // Use index as key for each list item (as instructed)
            <li key={index} className="animal-item">
              {animal}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UserFavoriteAnimals;
