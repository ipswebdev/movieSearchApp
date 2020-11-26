import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Movie } from '../result-body/models/movie.model';


@Injectable({
    providedIn : 'root'
})

export class DataStorage {
    constructor(private http: HttpClient) {}
    myFaves: Movie[] = [];
    faveMovieAdded: Subject<number>  = new Subject();
    logOP() {
        console.log('thisis the service that is being used');
    }
    addMovie(movie) {
        return this.http.post('https://movie-search-app-88ca4.firebaseio.com/movies.json', movie);
    }
    fetchAllMovies() {
        return this.http.get('https://movie-search-app-88ca4.firebaseio.com/movies.json');
    }

}