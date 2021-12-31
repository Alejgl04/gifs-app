import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  loading: boolean = false;
  constructor(
    private gifsServices: GifsService
    ) {
      this.loading = true;
    }
    
    get results() {
      return this.gifsServices.results;
    }
    

  ngOnInit(): void {
  }
}
