import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'My Music Collection';
  version = "1.0";

  displayVersion() {
    alert(`${this.title} Version ${this.version}`);
  }

  displayArtistList() {
    alert(`display list here`);
  }
}
