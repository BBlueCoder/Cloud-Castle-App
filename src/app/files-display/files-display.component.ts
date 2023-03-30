import { AppError } from './../app-errors/app-error';
import { FileService } from './../services/file-service.service';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FileResponse } from '../services/response-interfaces/file-response';

@Component({
  selector: 'files-display',
  templateUrl: './files-display.component.html',
  styleUrls: ['./files-display.component.css']
})
export class FilesDisplayComponent implements OnInit,OnChanges{
  arrT = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,14,17,18,19,10,12,22,15,14,12,13,15];
  files : Array<FileResponse> = [];
  @Input() fileType : string | undefined;

  constructor(private service : FileService){}
  

  thumbnailSrc = 'http://localhost:3000/api/files/thumbnail/';
  currentFile? : FileResponse;

  ngOnInit(): void {
    // this.service.getFiles(this.fileType).subscribe({
    //   next: data =>{
    //     this.files = data;
    //   },
    //   error: (error : AppError) =>{
    //     console.log(error);
    //   }
    // })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.service.getFiles(this.fileType).subscribe({
      next: data =>{
        this.files = data;
      },
      error: (error : AppError) =>{
        console.log(error);
      }
    })
  }

  presentItem(file : FileResponse){
    this.currentFile = file;
    this.toggleBackButton();
  }

  closeMediaPresenter(){
    this.currentFile = undefined;
    this.toggleBackButton();
  }

  toggleBackButton(){
    const mediaThumbnail = document.querySelector('#back-button');
    mediaThumbnail?.classList.toggle('d-none');
  }

  
}
