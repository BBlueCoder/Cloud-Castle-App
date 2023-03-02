import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isHomeActive = false;

  constructor(private dataService : DataService){

  }
  ngOnInit(): void {
    this.dataService.isHomeActive.subscribe(isActive => {
      this.isHomeActive = isActive
    })
  }

  navmenu(){
    this.dataService.toggleSideBar();
  }
}
