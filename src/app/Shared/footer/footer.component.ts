import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }
  temp: any
  login: any;
  ngOnInit(): void {
    this.temp = sessionStorage.getItem('temp');
    this.login = sessionStorage.getItem('roledid');
  }
}
