import { DataService } from './../services/data.service';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {

  fileType : string | undefined;
  
  constructor(private dataService : DataService){}

  ngOnDestroy(): void {
    this.dataService.toggleHome();
  }

  ngOnInit(): void {
    this.dataService.isSideBarActive.subscribe(
      isSideBarActive => {
        const sideBarElement = document.getElementById("sidebar");
        if(isSideBarActive){
          sideBarElement?.classList.add("active");
        }else{
          sideBarElement?.classList.remove("active");
        }
      } 
    )

    this.dataService.toggleHome();
  }

  onFileTypeChange(type : string | undefined){
    console.log("------------------"+type);
    this.fileType = type;
  }

  
}
