import { ResultDetails } from "./result-details";
import { Result } from "./result";
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn : 'root'
})

export class searchService {
   message = new Subject<string>();
   movie;
   constructor(private http : HttpClient){}
   sendData(msg){
    return this.message.next(msg);
   }
   receiveData(){
    return this.message;
   }         
//    }apikey=5dca3b0c
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
