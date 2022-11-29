import {Component} from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {

  constructor(private router: Router) {
    let session = sessionStorage.getItem("email");
    if (session == undefined) {
      this.router.navigate(['login']);
    }
  }

}
