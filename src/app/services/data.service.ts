import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private _isSideBarActive = new BehaviorSubject(false);
  private _isHomeActive = new BehaviorSubject(true);
  constructor() { }

  get isSideBarActive() {
    return this._isSideBarActive.asObservable();
  }

  get isHomeActive() {
    return this._isHomeActive.asObservable();
  }

  toggleHome(){
    this._isHomeActive.next(!this._isHomeActive.value);
  }

  toggleSideBar(){
    this._isSideBarActive.next(!this._isSideBarActive.value);
  }
}
