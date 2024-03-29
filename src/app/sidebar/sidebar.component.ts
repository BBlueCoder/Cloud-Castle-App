import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Output() fileType = new EventEmitter();

  rotateChevron(target : any){
    const element = target as HTMLElement;
    const nextSib = element.firstElementChild;
    console.log(element);
    element?.classList.toggle("rotated");
    console.log(nextSib);
  }

  sidebarActiveItem(target : any,type? : string | undefined){
    const currentActiveItem = document.querySelector('li.bg-secondary');
    currentActiveItem?.classList.remove('bg-secondary');
    const listElement = (target as HTMLElement).parentElement;
    listElement?.classList.add("bg-secondary");
    this.fileType.emit(type);
  }
}
