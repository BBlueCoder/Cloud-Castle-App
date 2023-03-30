import { FileResponse } from './response-interfaces/file-response';
import { HttpService } from './http-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService extends HttpService {

  constructor(http: HttpClient) {
    super("http://localhost:3000/api/files", http);
  }

  getFiles(fileType : string | undefined) {
    return this.get<Array<FileResponse>>('',{},fileType === undefined ? '': `file_type=${fileType}`);
  }

  
}
