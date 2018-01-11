import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {

  // private baseApiPath = "https://api.themoviedb.org/3/";
  // private apiKey = "?api_key=c4ef456eea2fab64deb3d8c4754ba17b";
  // private apiList = "movie/upcoming";

  constructor(public http: HttpClient) {
    console.log('Hello MovieProvider Provider');
  }

  getLatestMovies(page = 1){
    //return this.http.get(this.baseApiPath + this.apiList + this.apiKey);
    //return this.http.get("http://www.omdbapi.com/?s=Batman&apikey=8139bfb5");
    return this.http.get("https://api.themoviedb.org/3/movie/upcoming?page=" + page + "&api_key=c4ef456eea2fab64deb3d8c4754ba17b");
  }

  getMovieDetails(id){
    return this.http.get("https://api.themoviedb.org/3/movie/"+ id +"?api_key=c4ef456eea2fab64deb3d8c4754ba17b");
  }
}
