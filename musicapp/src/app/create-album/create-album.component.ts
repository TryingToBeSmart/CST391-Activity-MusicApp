import { Component, OnInit } from '@angular/core';
import { Album } from '../models/albums.model';
import { Track } from '../models/tracks.model';
import { MusicServiceService } from '../service/music-service.service';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.css'],
})
export class CreateAlbumComponent implements OnInit {
  // The Album object to be created and submitted
  album: Album = {
    albumId: Math.floor(Math.random() * 1000000),
    title: '',
    artist: '',
    description: '',
    year: '',
    image: '',
    tracks: [],
  };
  // Raw string input for album tracks
  tracksRaw: string = '';

  // Flag to track whether the album was successfully submitted
  wasSubmitted: boolean = false;

  constructor(private service: MusicServiceService) { }

  ngOnInit() { }

  // Method triggered when the form is submitted
  public onSubmit() {
    // Parse the raw tracks input into Track objects
    const tracks: Track[] = this.parseTracks(this.tracksRaw);

    // Assign the parsed tracks to the album
    this.album.tracks = tracks;

    // Call the service to create the new Album
    this.service.createAlbum(this.album, () => {
      console.log("createAlbum() was success");
      // Set the flag to indicate that the album was submitted successfully
      this.wasSubmitted = true;
    },
      (error) => {
        console.log("createAlbum() was failure");
      });
  }

  // Private method to parse raw track data into Track objects
  private parseTracks(rawTracks: string): Track[] {
    const tracks: Track[] = [];
    const lines = rawTracks.split('\n');

    // Iterate through each line of raw track data
    lines.forEach((line, index) => {
      // Split each line into title, lyrics, and video parts
      const [title, lyrics, video] = line.split(':');

      // Create a new Track object and add it to the tracks array
      tracks.push({
        trackId: Math.floor(Math.random() * 1000000),
        title: title,
        number: index + 1,
        video: video || '',
        lyrics: lyrics || ''
      });
    });

    // Return the array of parsed Track objects
    return tracks;
  }
}
