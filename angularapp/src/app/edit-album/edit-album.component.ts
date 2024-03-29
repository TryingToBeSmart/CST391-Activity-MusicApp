import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MusicServiceService } from '../service/music-service.service';
import { Album } from '../models/albums.model';

@Component({
  selector: 'app-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.css']
})
export class EditAlbumComponent implements OnInit {
  album!: Album;
  tracksRaw: string = "";
  wasSubmitted: boolean = false;

  constructor(private route: ActivatedRoute, private service: MusicServiceService, private location: Location) { }

  ngOnInit() {
    let artist = this.route.snapshot.paramMap.get('artist');
    const idString = this.route.snapshot.paramMap.get('id');
    const id = idString ? parseInt(idString, 10) : NaN;
    console.log("The ID is " + id);
    console.log("The Artist is " + artist);

    if (artist !== null && id !== null && !isNaN(id)) {
      this.service.getAlbum(artist, id, (foundAlbum: Album) => {
        this.album = foundAlbum;

        // Assign lyrics and video to albums if they are not null or empty string
        for (let x = 0; x < this.album.tracks.length; ++x) {
          this.tracksRaw = this.tracksRaw + this.album.tracks[x].title;
          if (this.album.tracks[x].lyrics != null && this.album.tracks[x].lyrics != '')
            this.tracksRaw = this.tracksRaw + ';' + this.album.tracks[x].lyrics;
          if (this.album.tracks[x].video != null && this.album.tracks[x].video != '')
            this.tracksRaw = this.tracksRaw + ';' + this.album.tracks[x].video;
          this.tracksRaw = this.tracksRaw + '\n';
        }
      });
    } else { console.error("Artist or id is null"); }
  }

  public onCancel() {
    console.log("I am going back");
    this.location.back();
  }

  public onSubmit() {
    this.service.updateAlbum(this.album, () => {
      console.log("The return from updateAlbum() was success");
      this.wasSubmitted = true;
    },
      (error) => {
        console.log("The return from updateAlbum() was failure");
      }
    );
  }
}
