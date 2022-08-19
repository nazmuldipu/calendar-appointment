import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  constructor() {}

  public saveData(key: string, obj: object) {
    localStorage.setItem(key, JSON.stringify(obj));
  }

  public getData(key: string) {
    let data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }
}
