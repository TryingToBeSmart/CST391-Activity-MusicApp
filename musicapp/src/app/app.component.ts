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

  constructor(private router: Router) {

  }

  displayVersion() {
    alert(`${this.title} Version ${this.version}`);
  }

  /*
  * passes a timestamp in the query params
  * (this is required to get the query params
  * to make changes to the Artist List Component
  * when it gets reinitialized):
  */
  displayArtistList() {
    {
      this.router.navigate(['list-artists'], { queryParams: { data: new Date() } });
    }

    /*
          const navigationExtras: NavigationExtras = {
      queryParams: { data: new Date() },
      queryParamsHandling: 'merge'
    };

    this.router.navigate(['list-artists'], navigationExtras);
    */

  }
}
