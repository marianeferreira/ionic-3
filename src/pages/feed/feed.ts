import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { MovieDetailsPage } from '../movie-details/movie-details';

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


  private _movieProvider: MovieProvider;

  public objeto_feed = {
    titulo: "Mariane Ferreira",
    data: "January 4th, 2018",
    descricao: "Estou criando um app utilizando o ionic.",
    qnt_likes: 0,
    qnt_comments: 0,
    time_post: "11h ago"
  }

  public lista_filmes = Array<any>();
  public page = 1;
  public loader;
  public refresher;
  public isRefreshing:boolean = false;
  public infiniteScroll;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    @Inject(MovieProvider) movieProvider: MovieProvider,
    public loadingCtrl: LoadingController
  ) {
    this._movieProvider = movieProvider;
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
      //duration: 5000
    });
    this.loader.present();
  }

  hideLoading() {
    this.loader.dismiss();
  }

  public soma_likes(): void {
    this.objeto_feed.qnt_likes += 1;
  }

  public soma_comments(): void {
    this.objeto_feed.qnt_comments += 1;
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    console.log('Begin async operation', refresher);
    this.isRefreshing = true;
    this.loadFeed();
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter FeedPage');
    this.loadFeed();
  }

  openDetails(filmeId){
    console.log(filmeId);
    this.navCtrl.push(MovieDetailsPage, {id: filmeId});
  }


  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.loadFeed(true);

    // setTimeout(() => {
    //   for (let i = 0; i < 30; i++) {
    //     this.items.push( this.items.length );
    //   }

    //   console.log('Async operation has ended');
    //   infiniteScroll.complete();
    // }, 500);
  }

  loadFeed(newpage: boolean = false){
    this.presentLoading();
    this._movieProvider.getLatestMovies(this.page).subscribe(
      data => {
        console.log(data);
        const response = (data as any);

        if(newpage){
          this.lista_filmes = this.lista_filmes.concat(response.results);
          console.log(this.page);
          this.infiniteScroll.complete();
        }else{
          this.lista_filmes = response.results;
        }
        
        console.log(this.lista_filmes);
        this.hideLoading();
        if(this.isRefreshing){
          console.log('Async operation has ended');
          this.refresher.complete();
          this.isRefreshing = false;
        }
      },
      error => {
        console.log(error);
        this.hideLoading();
        if(this.isRefreshing){
          console.log('Async operation has ended');
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
    )
  }

}
