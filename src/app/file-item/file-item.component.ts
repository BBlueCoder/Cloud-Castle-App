import { Utils } from './../../utils/utils';
import { FileResponse } from './../services/response-interfaces/file-response';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Constants } from 'src/utils/constants';

@Component({
  selector: 'file-item',
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.css']
})
export class FileItemComponent implements OnInit {
  @Input() file?: FileResponse;
  @Output() presentedItem = new EventEmitter();

  thumbnailSrc = '';
  isItemSelected = false;
  constructor() { }

  ngOnInit(): void {
    if (this.file?.filetype.includes("image") || this.file?.filetype.includes("video")) {
      this.thumbnailSrc = `${Constants.FILE_THUMBNAIL_ENDPOINT}${this.file.id}`;
    } else if (this.file?.filetype.includes("audio")) {
      this.thumbnailSrc = Constants.AUDIO_PLACEHOLDER_PATH;
    } else {
      this.thumbnailSrc = Constants.FILE_PLACEHOLDER_PATH;
    }
  }

  formatDuration() {
    const seconds = this.file?.duration!!;
    if (!seconds)
      return
    return Utils.formatDuration(seconds);
  }

  get fileName() {
    let title = this.file?.originname;
    if (!title)
      return "";

    if (title.length > 13)
      return title.substring(0, 12).concat('...');

    return title;
  }

  itemDoubleClick(){
    this.presentedItem.emit(this.file);
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
