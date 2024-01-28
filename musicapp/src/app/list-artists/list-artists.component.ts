import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicServiceService } from '../service/music-service.service';
import { Artist } from '../models/artists.model';

@Component({
  selector: 'app-list-artists',
  templateUrl: './list-artists.component.html',
  styleUrl: './list-artists.component.css'
})
export class ListArtistsComponent {
  selectedArtist: Artist | null = null;
  artists: Artist[] = [];

  constructor(private route: ActivatedRoute, private service: MusicServiceService) {}

  ngOnInit() {
    console.log("Getting data...");
    this.service.getArtists((artists: Artist[]) => {
      this.artists = artists;
      console.log('this.artists', this.artists);
    })
  }



  onSelectArtist(artist: Artist) {
    console.log('Selected artist: ' + artist.artist);
    this.selectedArtist = artist;
  }

  /* FROM ACTIVITY 3
  selectedArtist: Artist | null = null;
  artists: Artist[] = [];

  constructor(private route: ActivatedRoute, private service: MusicServiceService) {}


  *
  * In the ngOnInit() method, subscribe to the
  * queryParams changes from the route and call
  * the Music Service getArtists() method, which
  * will set the artists property and set the
  * selectedArtist property to null.
  *
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
			console.log("Getting data...");
			this.artists = this.service.getArtists();
			this.selectedArtist = null;
		});
  }

  onSelectArtist(artist: Artist) {
    this.selectedArtist = artist;
  }

  */
}
