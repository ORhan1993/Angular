import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchQuery = signal<string>('');

  changeSearch(text: string) {
    this.searchQuery.set(text);
  }
}
