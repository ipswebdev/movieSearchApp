import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn : 'root'
})

export class searchService {
   movie;
   constructor(private http : HttpClient){}
   getMovie(title){ 
       let parameter = new HttpParams();
       parameter = parameter.set('t',title);
       parameter = parameter.append('apikey','5dca3b0c')
        this.movie = this.http.get('https://www.omdbapi.com/',
        {
            params : parameter
        }
        );
        return this.movie;       
   }
}
