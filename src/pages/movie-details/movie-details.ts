import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

/**
 * Generated class for the MovieDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie-details',
  templateUrl: 'movie-details.html',
  providers: [MovieProvider]
})
export class MovieDetailsPage {

  public filme;
  public filme_id;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public movieProvider: MovieProvider
  ) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter MovieDetailsPage');
    this.filme_id = this.navParams.get("id");
    console.log('filme id recebido: ', this.filme_id);
    this.movieProvider.getMovieDetails(this.filme_id).subscribe(
      data => {
        console.log(data);
        this.filme = data;
      }, error => {
        console.log(error);
      }
    )
  }

}
