import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApisService {
  url = "localhost:5000"
  constructor(private _http: HttpClient) { }

  postBooks(books: any) {
    return this._http.post(`{url}/books`, books);
  }

  postAuthors(authors: any) {
    return this._http.post(`{url}/authors`, authors);
  }
}
