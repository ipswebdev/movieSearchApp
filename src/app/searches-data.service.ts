import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn : 'root'
})

export class searchService {
   movie;
   recentSearches = [];
   constructor(private http : HttpClient){
       console.log(this.recentSearches);
   }
   getMovie(title,searchBy,searchType){
       let parameter = new HttpParams();
       parameter = parameter.set('apikey','5dca3b0c');
    //    parameter = parameter.set('plot','full');
       if(searchBy === 'title'){
        parameter = parameter.set('t',title);
       }
       if(searchBy === 'id'){
        parameter = parameter.set('i',title);
       } 
       if (searchType === 'movie'){
        parameter = parameter.set('type','movie');
       }
       if (searchType === 'series'){
        parameter = parameter.set('type','series');
       }
        this.movie = this.http.get('https://www.omdbapi.com/',
        {
            params : parameter
        }
        );
        return this.movie;       
   }
}
