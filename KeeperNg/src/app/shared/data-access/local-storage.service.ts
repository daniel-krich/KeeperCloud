import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: string): T | null {
    let item = localStorage.getItem(key);
    if(!item) return null;
    return JSON.parse(item) as T;
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

}
