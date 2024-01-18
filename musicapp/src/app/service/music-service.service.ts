import { Injectable } from '@angular/core';
import exampledata from '../../data/sample-music-data.json';
import { Artist } from './../models/artists.model';
import { Album } from '../models/albums.model';

@Injectable({ providedIn: 'root' })
export class MusicServiceService {

  // Initialize a new array of Album objects using the exampledata from sample-music-data.json
  private albums: Album[] = exampledata;

  public getArtists(): Artist[] {
    let artists: Artist[] = []; // Initialize an empty array called artists of Artist objects
    let artistSet = new Set<string>(); // Initialize a new Set (only stores unique objects) of strings

    this.albums.forEach(album => artistSet.add(album.artist)); // Iterate through the albums array and add the unique artist strings to the artistSet

    artistSet.forEach(a => artists.push({artist: a})) // Iterate through the artistSet and create new artist objects using the strings and push those objects to the artists array
    return artists;
  }

  public getAlbums(artist: string): Album[] {
    // Return the list of Albums
    return this.albums;
  }

  public getAlbum(artistName:string, id:number): Album[] | undefined{

    let albums: Album[] = [];

    this.albums.forEach(album => {
      if (album.artist === artistName && album.albumId === id) {
        albums.push(album);
      }
    });
    return albums;
  }

  public createAlbum(album: Album): number {
    // Add a new Album to the list of Albums
    this.albums.push(album);
    return 1;
  }

  public updateAlbum(album: Album): number {
    // Search for the Album in the list of Albums and replace it in the list
    for (let index = 0; index < this.albums.length; ++index) {
      if (this.albums[index].albumId == album.albumId) {
        this.albums.splice(index, 1, album);
        return 0;
      }
    }
    return -1;
  }

  public deleteAlbum(id: number): number {
    // Search for the Album in the list of Albums and delete from the list
    for (let index = 0; index < this.albums.length; ++index) {
      if (this.albums[index].albumId == id) {
        this.albums.splice(index, 1);
        return 0;
      }
    }
    return -1;
  }
}
