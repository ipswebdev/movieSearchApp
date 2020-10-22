import { Component, OnInit } from '@angular/core';
import { searchService } from "../searches-data.service";

@Component({
  selector: 'app-result-body',
  templateUrl: './result-body.component.html',
  styleUrls: ['./result-body.component.scss']
})
export class ResultBodyComponent implements OnInit{

constructor(private searchservices : searchService){
}
ngOnInit(){
  
}
isLoading =false;
isSearchValid = false;
title ='';
movieObj;
getMovie(title){
  this.isLoading = true;
  this.searchservices.getMovie(title).subscribe(
    (movie) => {
      this.isLoading=false;
      if(movie.Title){
      this.isSearchValid = false;
      console.log('subscribe fn ran!')
      console.log(movie);
      this.movieObj = movie;
      }
      else{
        this.isSearchValid = false ;
        alert(movie.Error)
      }
    },
    (err) => {
      console.log('to err is human! error is ',err)
    }
    );
}
}
