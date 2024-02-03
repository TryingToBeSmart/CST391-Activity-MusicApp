import React from "react";
import ReactDOM from "react-dom";

const Card = (properties) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={properties.imgURL}
        className="card-img-top"
        alt="beatles"
      />
      <div className="card-body">
        <h5 className="card-title">{properties.albumTitle}</h5>
        <p className="card-text">{properties.albumDescription}</p>
        <a href="#" className="btn btn-primary">{properties.buttonText}</a>
      </div>
    </div>
  );
};

export default Card;
