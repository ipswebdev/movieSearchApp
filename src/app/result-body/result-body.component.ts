import { Component, OnInit } from '@angular/core';
import { searchService } from "../searches-data.service";

@Component({
  selector: 'app-result-body',
  templateUrl: './result-body.component.html',
  styleUrls: ['./result-body.component.scss']
})
export class ResultBodyComponent implements OnInit{

constructor(private searchservices : searchService){}
isLoading =false;
showSuggestion :boolean = true;
isSearchValid = false;
title ='';
searchType = ''  || 'movie';
searchBy = '' || 'title';
movieObj;
recentSearches = [];
titleExists :boolean = false;
ngOnInit(){
  this.recentSearches = this.searchservices.recentSearches;
  console.log(this.recentSearches)
}
getMovie(title){
  this.isLoading = true;
  this.showSuggestion = false
  this.searchservices.getMovie(title,this.searchBy,this.searchType).subscribe(
    (movie) => {
      this.isLoading=false;
      if(movie.Title){
      this.isSearchValid = false;
      console.log('subscribe fn ran!')
      console.log(movie);
      this.movieObj = movie;
      if(this.movieObj.Poster === 'N/A' ){
        this.movieObj.Poster = '/assets/images/no-img.png'    
      }

      this.titleExists=this.recentSearches.find(title => {
        if(title === movie.Title){
        return true;
        }
      })
      console.log(this.titleExists);
      // if(this.titleExists){
        this.searchservices.recentSearches.push(movie.Title);
      // }   
      }
      else{
        this.movieObj = null;
        this.isSearchValid = false ;
        alert(movie.Error)
      }
      this.showSuggestion =true;
    },
    (err) => {
      console.log('to err is human! error is ',err)
    }
    );
  this.title = '';
}
setTitle(selectedTitle){
  this.title = selectedTitle;
  console.log('selected title is ');
  this.showSuggestion = false;
}
}
