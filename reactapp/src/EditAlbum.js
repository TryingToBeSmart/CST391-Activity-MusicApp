import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dataSource from "./dataSource";

const EditAlbum = (props) => {
  // Assume New Album by setting up an empty album and setting the flag newAlbumCreation
  let album = {
    title: "",
    artist: "",
    description: "",
    year: "",
    image: "",
    tracks: [],
  };
  let newAlbumCreation = true;

  // If an album is provided in 'props', then we are editing an album.
  // Set album to the provided album and set newAlbumCreation to false.
  if (props.album) {
    album = props.album;
    newAlbumCreation = false;
  }

  const [albumTitle, setAlbumTitle] = useState(album.title || "");
  const [artist, setArtist] = useState(album.artist || "");
  const [description, setDescription] = useState(album.description || "");
  const [year, setYear] = useState(album.year || "");
  const [image, setImage] = useState(album.image || "");

  const navigate = useNavigate();

  const updateTitle = (event) => {
    setAlbumTitle(event.target.value);
  };
  const updateArtist = (event) => {
    setArtist(event.target.value);
  };
  const updateDescription = (event) => {
    setDescription(event.target.value);
  };
  const updateYear = (event) => {
    setYear(event.target.value);
  };
  const updateImage = (event) => {
    setImage(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    console.log("submit");

    const editedAlbum = {
      albumId: album.albumId,
      title: albumTitle,
      artist: artist,
      description: description,
      year: year,
      image: image || "https://placehold.co/200x200",
      tracks: [],
    };
    console.log(editedAlbum);

    saveAlbum(editedAlbum);
  };

  const saveAlbum = async (album) => {
    let response;

    newAlbumCreation
      ? (response = await dataSource.post("/albums", album))
      : (response = await dataSource.put("/albums", album));

    console.log(response);
    console.log(response.data);
    props.onEditAlbum(navigate);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <form onSubmit={handleFormSubmit}>
        <h1>{newAlbumCreation ? "Create" : "Edit"} Album</h1>
        <div className="form-group">
          <label htmlFor="albumTitle">Album Title</label>
          <input
            type="text"
            className="form-control"
            id="albumTitle"
            placeholder="Enter Album Title"
            value={albumTitle}
            onChange={updateTitle}
          />
        </div>
        <div className="form-group">
          <label htmlFor="albumArtist">Artist</label>
          <input
            type="text"
            className="form-control"
            id="albumArtist"
            placeholder="Enter Album Artist"
            value={artist}
            onChange={updateArtist}
          />
        </div>
        <div className="form-group">
          <label htmlFor="albumDescription">Description</label>
          <textarea
            type="text"
            className="form-control"
            id="exampleCheck1"
            placeholder="Enter Album Description"
            value={description}
            onChange={updateDescription}
          />
        </div>
        <div className="form-group">
          <label htmlFor="albumYear">Year</label>
          <input
            type="text"
            className="form-control"
            id="albumYear"
            placeholder="Enter Album Artist"
            value={year}
            onChange={updateYear}
          />
        </div>
        <div className="form-group">
          <label htmlFor="albumImage">Image</label>
          <input
            type="text"
            className="form-control"
            id="albumImage"
            placeholder="Enter Album Image"
            value={image}
            onChange={updateImage}
          />
        </div>
        <button type="button" className="btn btn-light" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditAlbum;
