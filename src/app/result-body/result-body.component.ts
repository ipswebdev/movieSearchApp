import { Component, OnInit } from '@angular/core';
import { searchService } from "../services/searches-data.service";
import { DataStorage } from '../services/data-storage.service';
import { Movie } from './models/movie.model';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-result-body',
  templateUrl: './result-body.component.html',
  styleUrls: ['./result-body.component.scss']
})
export class ResultBodyComponent implements OnInit{

constructor(private searchservices : searchService, private dataStorage : DataStorage){}
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
  console.log(this.recentSearches);
  this.dataStorage.fetchAllMovies().subscribe(
    (movies:Movie) => {
      this.searchservices.myFaves.length = 0;
      console.log('fetched result is',movies);
      if(movies){
        for (const key in movies) {
          if(movies.hasOwnProperty(key)){
            this.searchservices.myFaves.push(movies[key]);
          }
        }
      }
      else {
        console.log('no movie on the list');
      }
      console.log(this.searchservices.myFaves.slice());
    }
  ),
  (error) => {
    console.log(error);
  }
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
        return false;
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

addMovie(){
  const movie :Movie = {
    title : this.movieObj.Title,
    releaseYear : this.movieObj.Released,
    ratings : this.movieObj.Rated,
    poster :  this.movieObj.Poster ,
    actors : this.movieObj.Actors,
    directors : this.movieObj.Director,
    plot : this.movieObj.plot,
    id : ''
  }
  this.dataStorage.addMovie(movie)
  .pipe(map(
    (obj) => {
      for (const key in obj) {
        console.log('key is',obj)
        console.log('key is',obj[key])
        return obj[key];
      }
    }
  ))
  .subscribe(
    (response) => {
   movie.id = response;
   this.searchservices.myFaves.push(movie);
   console.log(this.searchservices.myFaves.slice())
});
}

markFaveCheck(movie){
  let doesMovieAlreadyExist = this.searchservices.myFaves.find((movieObj) => {
    if(movieObj.title === movie.title){
      return true;
    }
    return false;
  });
  if(doesMovieAlreadyExist){
    return !doesMovieAlreadyExist;
  }
  return !doesMovieAlreadyExist;
}
}
