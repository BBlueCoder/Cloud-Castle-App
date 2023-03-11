import { AppError } from './../app-errors/app-error';
import { FileService } from './../services/file-service.service';
import { Component, OnInit } from '@angular/core';
import { FileResponse } from '../services/response-interfaces/file-response';

@Component({
  selector: 'app-files-display',
  templateUrl: './files-display.component.html',
  styleUrls: ['./files-display.component.css']
})
export class FilesDisplayComponent implements OnInit{
  arrT = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,14,17,18,19,10,12,22,15,14,12,13,15];
  files : Array<FileResponse> = [];

  constructor(private service : FileService){}

  ngOnInit(): void {
    this.service.getFiles().subscribe({
      next: data =>{
        this.files = data;
      },
      error: (error : AppError) =>{
        console.log(error);
      }
    })
  }


}
