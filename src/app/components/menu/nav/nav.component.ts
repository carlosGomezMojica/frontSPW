import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public userType:any;

  constructor() { 
    this.userType = localStorage.getItem("type");
  }

  ngOnInit(): void {
  }


}
