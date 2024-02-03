import { Request } from 'express';
import { Injectable } from '@angular/core';
import exampledata from '../../data/sample-music-data.json';
import { Artist } from './../models/artists.model';
import { Album } from '../models/albums.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MusicServiceService {

  private host = "http://localhost:5000"; // listen to the Express MusicAPI on port 5000

  constructor(private http: HttpClient) { }

  // Define a callback function with an array of Artist as parameter.
  // The callback returns void. getArtists also returns void, however
  // they are defined independently.
  public getArtists(callback: (artists: Artist[]) => void): void {
    this.http.get<Artist[]>(this.host + "/artists").
      subscribe((artists: Artist[]) => {
        callback(artists);
      });
  }

  // Callback function with array of Album as parameter
  public getAlbums(callback: (albums: Album[]) => void): void {
    this.http.get<Album[]>(this.host + "/albums").
      subscribe((albums: Album[]) => {
        callback(albums);
      })
  }

  // Gets the individual album by first using the getAlbumOfArtist function to get
  // all albums that match the artist, then find the one that matches the id
  public getAlbum(artistName: string, id: number, callback: (album: Album) => void): void {
    this.getAlbumsOfArtist(artistName, (albums: Album[]) => {
      const foundAlbum = albums.find(album => album.albumId === id);
      if (foundAlbum) {
        callback(foundAlbum);
      } else {
        throw new Error(`Album not found for artist: ${artistName} and id: ${id}`);
      }
    });
  }

  // Gets the array if Album that match the artistName
  public getAlbumsOfArtist(artistName: String, callback: (albums: Album[]) => void): void {
    let request = this.host + `/albums/${artistName}`;
    console.log('request', request);
    this.http.get<Album[]>(request).
      subscribe((albums: Album[]) => {
        console.log('have albums', albums);
        callback(albums);
      });
  }

  // Add a new Album to the list of Albums
  public createAlbum(album: Album, successCallback: () => void, errorCallback: (error: any) => void): void {
    this.http.post<Album>(this.host + "/albums", album).
      subscribe((data) => {
        console.log("Album created successfully");
        successCallback();
      },
      (error) => {
        console.error("Error creating album:", error);
        errorCallback(error);
      });
  }

  // Search for the Album in the list of Albums and replace it in the list
  public updateAlbum(album: Album, successCallback: () => void, errorCallback: (error: any) => void): void {
    this.http.put<Album>(this.host + "/albums", album).
      subscribe((data) => {
        // Handle successful update
        console.log("Album updated successfully");
        successCallback();
      },
        (error) => {
          // Handle update error
          console.error("Error updating album:", error);
          errorCallback(error);
        }
      );
  }

  // Search for the Album in the list of Albums and delete from the list
  public deleteAlbum(id: number, callback: () => void): void {
    this.http.delete(this.host + "/albums/" + id).
      subscribe((data) => {
        callback();
      });
  }

  /*  FROM ACTIVITY 3

    // Initialize a new array of Album objects using the exampledata from sample-music-data.json
    albums: Album[] = exampledata;

    public getArtists(): Artist[] {
      let artists: Artist[] = []; // Initialize an empty array called artists of Artist objects
      let artistSet = new Set<string>(); // Initialize a new Set (only stores unique objects) of strings

      this.albums.forEach(album => artistSet.add(album.artist)); // Iterate through the albums array and add the unique artist strings to the artistSet

      artistSet.forEach(artistName => artists.push({ name: artistName })) // Iterate through the artistSet and create new artist objects using the strings and push those objects to the artists array
      return artists;
    }


  albums: Album[] = exampledata;
    // Return the list of Albums
    public getAlbums(artistSearch: string): Album[] {
      let artistAlbums: Album[] = [];
      this.albums.forEach(album => {
        if (album.artist === artistSearch) {
          artistAlbums.push(album);
        }
      });
      return artistAlbums;
    }
    // Get Album with artistName and id as parameters
    public getAlbum(artistName: string, id: number): Album {
      const foundAlbum = this.albums.find(album => album.artist === artistName && album.albumId === id);

      if (foundAlbum) {
        return foundAlbum;
      } else {
        throw new Error(`Album not found for artist: ${artistName} and id: ${id}`);
      }
    }

    // Add a new Album to the list of Albums
    public createAlbum(album: Album): number {
      this.albums.push(album);
      return 1;
    }

    // Search for the Album in the list of Albums and replace it in the list
    public updateAlbum(album: Album): number {
      for (let index = 0; index < this.albums.length; ++index) {
        if (this.albums[index].albumId == album.albumId) {
          this.albums.splice(index, 1, album);
          return 0;
        }
      }
      return -1;
    }

    // Search for the Album in the list of Albums and delete from the list
    public deleteAlbum(id: number, artist:string): number {
      for (let index = 0; index < this.albums.length; ++index) {
        if (this.albums[index].albumId == id) {
          this.albums.splice(index, 1);
          return 0;
        }
      }
      return -1;
    }
  */
}
