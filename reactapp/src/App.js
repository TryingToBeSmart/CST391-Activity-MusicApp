import React, { useEffect, useState } from "react";
import "./App.css";
import dataSource from "./dataSource";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchAlbum from "./SearchAlbum";
import NavBar from "./NavBar";
import NewAlbum from "./NewAlbum";
import OneAlbum from "./OneAlbum";

const App = (props) => {
  const [searchPrase, setSearchPhrase] = useState("");
  const [albumList, setAlbumList] = useState([]);
  const [currentlySelectedAlbumId, setCurrentlySelectedAlbumId] = useState(0);
  let refresh = false;

  // Setup initialization callback
  useEffect(() => {
    // Update the album list
    loadAlbums();
  }, [refresh]);

  const loadAlbums = async () => {
    const response = await dataSource.get("/albums");

    setAlbumList(response.data);
  };

  const updateSearchResults = async (phrase) => {
    console.log("Phrase is: ", phrase);
    setSearchPhrase(phrase);
    // const response = await dataSource.get('/albums/search/description' + phrase);
    // setAlbumList(response.data);
  };

  console.log("albumList: ", albumList);
  const renderedList = albumList.filter((album) => {
    if (
      album.description.toLowerCase().includes(searchPrase.toLowerCase()) ||
      searchPrase === ""
    ) {
      return true;
    }
    return false;
  });

  console.log("renderedList: ", renderedList);

  const updateSingleAlbum = (id, navigate) => {
    console.log("update Single Album: ", id);
    console.log("Update Single Album navigate: ", navigate);
    var indexNumber = 0;
    for (var i = 0; i < albumList.length; ++i) {
      if (albumList[i].id === id) indexNumber = i;
    }
    setCurrentlySelectedAlbumId(indexNumber);
    console.log("update path: ", "/show/" + indexNumber);
    navigate("/show/" + indexNumber);
  };

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <SearchAlbum
              updateSearchResults={updateSearchResults}
              albumList={renderedList}
              updateSingleAlbum={updateSingleAlbum}
            />
          }
        />
        <Route exact path="/new" element={<NewAlbum />} />
        <Route
          exact
          path="/show/:albumId"
          element={<OneAlbum album={albumList[currentlySelectedAlbumId]} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
