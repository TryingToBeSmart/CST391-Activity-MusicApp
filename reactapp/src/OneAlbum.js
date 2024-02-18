import React from "react";
import { useNavigate } from "react-router-dom";

const OneAlbum = (props) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/edit/${props.album.id}`);
  };

  return (
    <div className="container">
      <h2>Album Details for {props.album.title}</h2>
      <div className="row">
        <div className="col col-sm-3">
          <div className="card">
            <img
              src={props.album.image}
              className="card-img-top"
              alt={props.album.title}
            />
            <div className="card-body">
              <h5 className="card-title">{props.album.title}</h5>
              <p className="card-text">{props.album.description}</p>
              <div className="list-group">
                <li>Show the album's tracks here</li>
              </div>
              <button onClick={handleEditClick} className="btn btn-primary">
                Edit
              </button>
            </div>
          </div>
        </div>
        <div className="col col-sm-9">
          <div className="card">
            <p>Show the lyrics of the selected track here</p>
          </div>
          <div className="card">
            <p>Show the Youtube Video of the selected track here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneAlbum;
