import { FileResponse } from './../services/response-interfaces/file-response';
import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'file-item',
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.css']
})
export class FileItemComponent implements OnInit {
  @Input() file?: FileResponse;

  thumbnailSrc = '';
  isItemSelected = false;
  constructor() { }

  ngOnInit(): void {
    if (this.file?.filetype.includes("image") || this.file?.filetype.includes("video")) {
      this.thumbnailSrc = `http://localhost:3000/api/files/thumbnail/${this.file.id}`;
    } else if (this.file?.filetype.includes("audio")) {
      this.thumbnailSrc = './assets/img/audio-file-placeholder.svg'
    } else {
      this.thumbnailSrc = './assets/img/file-placeholder.png';
    }
  }

  formatDuration() {
    const seconds = this.file?.duration!!;
    if (!seconds)
      return
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds - (hours * 3600)) / 60);
    let remainingSeconds = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
  }

  get fileName() {
    let title = this.file?.originname;
    if (!title)
      return "";

    if (title.length > 13)
      return title.substring(0, 12).concat('...');

    return title;
  }

  itemClick() {
    this.unselectAll();
    this.isItemSelected = !this.isItemSelected;
  }

  private unselectAll(){
    const selectedDivs = document.querySelectorAll('.selected');
    selectedDivs.forEach((div) => {
      div.classList.remove('selected');
    });
  }

  @HostListener('document:click',['$event'])
  onClick(event: MouseEvent){
    if((event.target as HTMLElement).tagName.toLowerCase() != 'img'){
      this.unselectAll();
    }
  }
}
