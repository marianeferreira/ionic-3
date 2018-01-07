import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider
  ]
})
export class FeedPage {


  private _movieProvider : MovieProvider;

  public objeto_feed = {
    titulo: "Mariane Ferreira",
    data: "January 4th, 2018",
    descricao: "Estou criando um app utilizando o ionic.",
    qnt_likes: 0,
    qnt_comments: 0,
    time_post: "11h ago"
  }

  public lista_filmes = Array<any>();

  constructor(public navCtrl: NavController, public navParams: NavParams, @Inject(MovieProvider) movieProvider: MovieProvider) {
    this._movieProvider = movieProvider;
  }

  public soma_likes(): void{
    this.objeto_feed.qnt_likes += 1;
  }

  public soma_comments(): void{
    this.objeto_feed.qnt_comments += 1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
    this._movieProvider.getLatestMovies().subscribe(
      data => {
        console.log(data);
        const response = (data as any);
        this.lista_filmes = response.results;
        console.log(this.lista_filmes);
      },
      error => {
        console.log(error);
      }
    )
  }

}
