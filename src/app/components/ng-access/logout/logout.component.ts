import { Component, OnInit } from '@angular/core';
import { CookiesService } from '../../../services/ng-global/cookies.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  providers: [ CookiesService ]
})
export class LogoutComponent implements OnInit {

  constructor(private cookie: CookiesService) { }

  ngOnInit(): void {
    localStorage.clear();
    this.cookie.removeCookies();
  }

}
