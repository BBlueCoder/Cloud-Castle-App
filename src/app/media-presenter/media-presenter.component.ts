import { FileService } from './../services/file-service.service';
import { FileResponse } from './../services/response-interfaces/file-response';
import { Component, Input, OnChanges } from '@angular/core';
import { Constants } from '../../utils/constants'
import { Utils } from 'src/utils/utils';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'media-presenter',
  templateUrl: './media-presenter.component.html',
  styleUrls: ['./media-presenter.component.css']
})
export class MediaPresenterComponent implements OnChanges {
  thumbnailSrc = '';
  fileSrc = '';
  @Input() selectedItem?: FileResponse;
  @Input() items?: Array<FileResponse>;
  animationDirection = 'normal';

  constructor(private fileService : FileService,private sanitizer: DomSanitizer){}

  ngOnChanges() {
    this.presentItem();
    if (this.selectedItem) {
      console.log(this.selectedItem);
      this.presentItem();
    } else {
      console.log(this.selectedItem);
      this.closePresenter();
    }
  }

  presentItem() {
    const mediaPresentElement = document.querySelector('.media-presenter');
    console.log(this.selectedItem);
    this.presentThumbnail();
    this.fileSrc = `${Constants.FILE_PATH}${this.selectedItem?.id}`;
    mediaPresentElement?.classList.add('show');
    const mediaThumbnail = document.querySelector('.media-thumbnail');
    mediaThumbnail?.classList.add('zoom-in');
    this.checkIfItemIsFirst();
    this.checkIfItemIsLast();
    this.playVideo();
  }

  closePresenter() {
    this.animationDirection = 'reverse';
    const mediaPresentElement = document.querySelector('.media-presenter');
    mediaPresentElement?.classList.remove('show');
    const mediaThumbnail = document.querySelector('.media-thumbnail');
    mediaThumbnail?.classList.remove('zoom-in');
  }

  presentThumbnail() {
    if (this.selectedItem?.filetype.includes("image") || this.selectedItem?.filetype.includes("video")) {
      this.thumbnailSrc = `${Constants.FILE_THUMBNAIL_ENDPOINT}${this.selectedItem.id}`;
    } else if (this.selectedItem?.filetype.includes("audio")) {
      this.thumbnailSrc = Constants.AUDIO_PLACEHOLDER_PATH;
    } else {
      this.thumbnailSrc = Constants.FILE_PLACEHOLDER_PATH;
    }
  }

  getSelectedIndex(){
    return this.items?.findIndex(item => item.id === this.selectedItem?.id);
  }

  getPreviousIndex(){
    let selectedIndex = this.getSelectedIndex();
    return selectedIndex!! - 1;
  }

  getNextIndex(){
    let selectedIndex = this.getSelectedIndex();
    return selectedIndex!! + 1;
  }

  presentPrevious() {
    let previousIndex = this.getPreviousIndex();
    if (previousIndex >= 0) {
      this.selectedItem = this.items!![previousIndex];
      this.presentItem();
    }
  }

  presentNext(){
    let nextIndex = this.getNextIndex();
    if (nextIndex < this.items?.length!!) {
      this.selectedItem = this.items!![nextIndex];
      this.presentItem();
    }
  }

  checkIfItemIsFirst(){
    let previousIndex = this.getPreviousIndex();
    let element = document.querySelector('div button i.bi-caret-left-fill')?.parentNode?.parentNode;
    if(previousIndex < 0){
      (element as HTMLElement).classList.remove('arrows-effect');
    }else{
      (element as HTMLElement).classList.add('arrows-effect');
    }
  }

  checkIfItemIsLast(){
    let nextIndex = this.getNextIndex();
    let element = document.querySelector('div button i.bi-caret-right-fill')?.parentNode?.parentNode;
    if(nextIndex >= this.items?.length!!){
      (element as HTMLElement).classList.remove('arrows-effect');
    }else{
      (element as HTMLElement).classList.add('arrows-effect');
    }
  }

  formatDuration() {
    const seconds = this.selectedItem?.duration!!;
    if (!seconds)
      return
    return Utils.formatDuration(seconds);
  }

  playVideo(){
    // this.fileService.getFile(this.selectedItem?.id!!,{ responseType: 'arraybuffer' }).subscribe({
    //   next: response =>{
    //     const videoBlob = new Blob([response as Blob], { type: 'video/mp4' });
    //     this.fileSrc = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(videoBlob));
    //   },
    //   error: error =>{
    //     console.log('Error playing video');
    //     console.log(error);
    //   }
    // });
  }

  toggleThumbnail(){
    let element = document.querySelector('#file-thumbnail') as HTMLElement;
    element.classList.toggle('d-none');
  }

  handleVideoError(message : any){
    console.log('Video Player error :'+message);
  }
}
