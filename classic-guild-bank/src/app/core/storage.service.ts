import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public itemSet$: Observable<string>;
  private _itemSet: Subject<string> = new Subject();

  public itemRemoved$: Observable<string>;
  private _itemRemoved: Subject<string> = new Subject();
  constructor() { }

  public setItem(key: string, value: string) {
      localStorage.setItem(key, value);
      this._itemSet.next(key);
  }

  public removeItem(key: string) {
      var hadItem = localStorage.getItem(key) !== null;

      localStorage.removeItem(key)

      if(hadItem)
        this._itemRemoved.next(key);
  }

  public getItem(key: string) {
      return localStorage.getItem(key);
  }

  public hasItem(key: string): boolean {
      return localStorage.getItem(key) !== null;
  }
}
