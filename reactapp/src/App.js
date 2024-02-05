import React, { useEffect, useState } from "react";
import Card from "./Card";
import SearchForm from "./SearchForm";
import "./App.css";
import dataSource from './dataSource';

const App = (props) => {
  const [searchPrase, setSearchPhrase] = useState("");
  const [albumList, setAlbumList] = useState([]);

  const updateSearchResults = (phrase) => {
    console.log("phrase: " + phrase);
    setSearchPhrase(phrase);
  };

  // Setup initialization callback
  useEffect(() => {
    // Update the album list
    loadAlbums();
  }, [searchPrase]);

  const loadAlbums = async () => {
    const response = await dataSource.get('/albums');

    setAlbumList(response.data);
  }

  const renderedList = () => {
    return albumList.map((album) => {
      if (
        album.description.toLowerCase().includes(searchPrase.toLowerCase()) ||
        searchPrase === ""
      )
        return (
          <Card
            key={album.id}
            albumTitle={album.title}
            albumDescription={album.description}
            buttonText="OK"
            imgURL={album.image}
          />
        );
      else console.log("Does not match: " + searchPrase);
    });
  };

  return (
    <div>
      <div className="container">
        <SearchForm onSubmit={updateSearchResults} />
      </div>
      <div className="container">{renderedList()}</div>
    </div>
  );
};

export default App;
