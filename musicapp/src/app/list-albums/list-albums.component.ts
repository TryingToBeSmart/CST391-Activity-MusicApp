import { Component, Input } from '@angular/core';
import { MusicServiceService } from '../service/music-service.service';
import { Artist } from '../models/artists.model';
import { Album } from '../models/albums.model';

@Component({
  selector: 'app-list-albums',
  templateUrl: './list-albums.component.html',
  styleUrls: ['./list-albums.component.css']
})
export class ListAlbumsComponent {
  // Input property to receive the selected artist
  @Input() artist: Artist | null = null;

  // Array to store albums related to the selected artist
  albums: Album[] = [];

  // Currently selected album
  selectedAlbum: Album | null = null;

  constructor(private service: MusicServiceService) { }

  // called after the component is initialized
  ngOnInit() {
    // Check if an artist is selected
    if (this.artist) {
      // Fetch albums for the selected artist from the service
      this.albums = this.service.getAlbums(this.artist.name);
    }
  }

  // Method triggered when an album is selected
  public onSelectedAlbum(album: Album) {
    console.log("Selected Album of " + album.title);

    // Set the selected album to what was passed in
    this.selectedAlbum = album;
  }
}
