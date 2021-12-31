import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private servicesUrl: string = 'https://api.giphy.com/v1/gifs';
  private _apiKey:  string   = 'a5p66CD2w3YUBPj9wBKQpE6jxF4B6BNv';
  private _history: string[] = [];
  public results:   Gif[]    = [];

  get history() {
    return [...this._history];
  } 
  
  constructor(
    private http:HttpClient
  ){
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.results  = JSON.parse(localStorage.getItem('results')!) || [];
  }

  searchGifs( query: string = '' ) {
    query = query.trim().toLocaleLowerCase();
    if ( !this._history.includes( query ) ) {

      this._history.unshift( query );
      this._history = this._history.splice(0,10);
      localStorage.setItem('history', JSON.stringify(this._history));

    }
    
    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.servicesUrl}/search`, { params })
    .subscribe( (response ) => {
      this.results = response.data;
      localStorage.setItem('results', JSON.stringify( this.results ));
    })
  }
}
