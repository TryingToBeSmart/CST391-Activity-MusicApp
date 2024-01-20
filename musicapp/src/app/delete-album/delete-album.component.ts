import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicServiceService } from '../service/music-service.service';

@Component({
  selector: 'app-delete-album',
  templateUrl: './delete-album.component.html',
  styleUrl: './delete-album.component.css'
})
// just copied from Bobby Estey
export class DeleteAlbumComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: MusicServiceService) {  }

  ngOnInit()
  {
  //   let artist = this.route.snapshot.paramMap.get('artist');
  //   let id = this.route.snapshot.paramMap.get('id');
  //   let status = this.service.deleteAlbum(Number.parseInt(id), artist);
  //   console.log("The return from deleteAblum() was " + status);
  }

}
