import { Component, ViewChild, ElementRef } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @ViewChild('searchText') searchText!: ElementRef<HTMLInputElement>;
  constructor(
    private gifsServices:GifsService
  ){}

  searching(){
    
    const value = this.searchText.nativeElement.value;
    if ( value.trim().length === 0 ) {
      return;
    }
        
    this.gifsServices.searchGifs( value );
    this.searchText.nativeElement.value = '';

  }
}
