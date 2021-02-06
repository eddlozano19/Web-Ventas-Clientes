import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/services/ng-global/global';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public company: any;
  public version: any;

  constructor() { }

  ngOnInit(): void {
    this.company = Global.company;
    this.version = Global.version;
  }

}
