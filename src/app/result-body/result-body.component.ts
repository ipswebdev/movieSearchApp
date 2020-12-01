import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/searches-data.service';
import { DataStorage } from '../services/data-storage.service';
import { Movie } from './models/movie.model';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-result-body',
  templateUrl: './result-body.component.html',
  styleUrls: ['./result-body.component.scss']
})
export class ResultBodyComponent implements OnInit {

constructor(private searchservices: SearchService, private dataStorage: DataStorage) {}
isLoading = false;
showSuggestion = true;
isSearchValid = false;
title = '';
searchType = ''  || 'movie';
searchBy = '' || 'title';
movieObj;
recentSearches = [];
titleExists = false;
switch = false;
successfulAddition = false;
isFaveMarked = true;
ngOnInit() {
  this.isFaveMarked = false;
  this.successfulAddition = false;
  this.recentSearches = this.searchservices.recentSearches;
  console.log('recent serches value', this.recentSearches);
  this.dataStorage.fetchAllMovies().subscribe(
    (movies: Movie) => {
      this.dataStorage.myFaves.length = 0;
      console.log('fetched result is', movies);
      if (movies) {
        for (const key in movies) {
          if (movies.hasOwnProperty(key)) {
            this.dataStorage.myFaves.push(movies[key]);
          }
        }
      } else {
        console.log('no movie on the list');
      }
      console.log(' faves list of movies..ng init fn', this.dataStorage.myFaves.slice());
    }
  ),
  // tslint:disable-next-line: no-unused-expression
  (error) => {
    console.log(error);
  }
}
getMovie(title) {
  this.isFaveMarked = false;
  this.successfulAddition = false;
  this.isLoading = true;
  this.showSuggestion = false;
  this.searchservices.getMovie(title, this.searchBy, this.searchType).subscribe(
    (movie) => {
      this.isLoading = false;
      if (movie.Title) {
      this.isSearchValid = false;
      console.log('subscribe fn ran!');
      console.log(movie);
      this.movieObj = movie;
      if (this.movieObj.Poster === 'N/A' ) {
        this.movieObj.Poster = '/assets/images/no-img.png';
      }

      // tslint:disable-next-line: no-shadowed-variable
      this.titleExists = this.recentSearches.find(title => {
        if (title === movie.Title) {
        return true;
        }
        return false;
      });
      if (this.isMovieFave(this.movieObj)) {
        this.isFaveMarked = true;
        this.movieObj.isFave = true;
        console.log('Fave status is ', this.isFaveMarked);
      }
      if (!this.isMovieFave(this.movieObj)) {
        this.isFaveMarked = false;
        this.movieObj.isFave = false;
        console.log('Fave status is ', this.isFaveMarked);
      }
      this.searchservices.recentSearches.push(movie.Title);
      } else {
        this.movieObj = null;
        this.isSearchValid = false ;
        alert(movie.Error);
      }
      this.showSuggestion = true;
    },
    (err) => {
      console.log('to err is human! error is ', err);
    }
    );
  this.title = '';
}

setTitle(selectedTitle) {
  this.title = selectedTitle;
  console.log('selected title is ');
  this.showSuggestion = false;
}

addMovie() {
  const movie: Movie = {
    title : this.movieObj.Title,
    releaseYear : this.movieObj.Released,
    ratings : this.movieObj.Rated,
    poster :  this.movieObj.Poster ,
    actors : this.movieObj.Actors,
    directors : this.movieObj.Director,
    plot : this.movieObj.Plot,
    id : '',
    fave : true,
  };
  if (!this.isMovieFave(movie)) {
    this.dataStorage.addMovie(movie)
  .pipe(map(
    (obj) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          // console.log('key is', obj);
          // console.log('key is', obj[key]);
          return obj[key];
        }
      }
    }
  ))
  .subscribe(
    (response) => {
   movie.id = response;
   movie.fave = true;
   this.dataStorage.myFaves.push(movie);
   this.dataStorage.faveMovieAdded.next(1);
   this.successfulAddition = true;
   console.log('Added movie successfully to favourites', this.dataStorage.myFaves.slice());
  },
  error => {
    console.log('sorry! couldnt add your movie to the faves list');
    this.dataStorage.faveMovieAdded.next(0);
    this.successfulAddition = true;
  });
} else {
  this.successfulAddition = true;
  console.log('Movie Already marked as Fave!');
}
}

isMovieFave(movie) {
  let fave = null;
  fave = this.dataStorage.myFaves.filter(obj => {
    if (obj.title === this.movieObj.Title) {
    return obj.title;
    }
    return null;
  });
  if (fave.length && (fave[0].title === this.movieObj.Title)) {
    // console.log('is movie already present in array');
    return true;
  }
  // console.log('is movie NOT present in array');
  return false;
}

}
/* toggleSwitch(){
    this.switch = !this.switch;
  }
*/
