import { Component, Input, OnInit } from '@angular/core';
import { Album } from '../models/albums.model';

@Component({
  selector: 'app-display-album',
  templateUrl: './display-album.component.html',
  styleUrl: './display-album.component.css'
})
export class DisplayAlbumComponent implements OnInit {
  @Input() album: Album | null = null;

  constructor() { }

	ngOnInit() {
    console.log('Album: ', this.album);
    console.log('Tracks: ', this.album?.tracks);
   }
}
