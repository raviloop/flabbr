import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http } from '@angular/http';

import { StreamingMedia, StreamingAudioOptions } from '@ionic-native/streaming-media';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-home',
 	templateUrl: 'home.html',
 })
 export class HomePage {

 	tracks: any;
 	playing: boolean = true;
 	currentTrack: any;
 	progressInterval: any;
 	songs : any;
 	baseUrl : any;
 	thumbnail: any;

 	constructor(public navCtrl: NavController, public navParams: NavParams,private streamingMedia: StreamingMedia, public http: Http) {


 		/*this.http.get('http://localhost:8000/allplaylist').map(res => res.json()).subscribe(data => {
 			console.log(data);
 			this.tracks = data;
 		});*/



 		this.tracks = [
 		{title: 'Something About You', artist: 'ODESZA', playing: false, progress: 0, link: 'assets/songs/ogg/CashCash-HowToLoveFeat_SofiaReyes.ogg'},
 		{title: 'Run', artist: 'Allison Wonderland', playing: false, progress: 0, link: 'assets/songs/ogg/CleanBanditJessGlynne_RealLoveTheChainsmokersRemix.ogg'},
 		{title: 'Breathe', artist: 'Seeb Neev', playing: false, progress: 0, link: 'assets/songs/ogg/Marc_ShowYouTheLightFeat_EfraimLeo.ogg'},
 		{title: 'HyperParadise', artist: 'Hermitude', playing: false, progress: 0, link: 'assets/songs/ogg/MartinGarrixLipa_ScaredToBeLonely.ogg'},
 		{title: 'Lifespan', artist: 'Vaults', playing: false, progress: 0, link: 'assets/songs/ogg/RainMan_BringBackTheSummerFeat_OLY.ogg'},
 		{title: 'Stay High', artist: 'Tove Lo', playing: false, progress: 0, link: 'assets/songs/ogg/TheChainsmokersColdplay_SomethingJustLikeThisAlessoRemix.ogg'},
 		{title: 'Lean On', artist: 'Major Lazer', playing: false, progress: 0, link: 'assets/songs/ogg/TheChainsmokers_AllWeKnowFeat_PhoebeRyan.ogg'}
 		];



 		this.currentTrack = this.tracks[0];
 		this.baseUrl = 'http://ec2-35-154-215-58.ap-south-1.compute.amazonaws.com/';
 		this.thumbnail = 'https://api.adorable.io/avatars/75/';
 		// this.songs = [
 		// {link :'', title : '', artist: ''}
 		// ]
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad HomePage');
 	}

 	startOgg(track) {
 		console.log(track)
 		console.log(this.thumbnail+track.artist)
 		let options: StreamingAudioOptions = {
 			successCallback: () => { console.log('Finished Audio') },
 			errorCallback: (e) => { console.log('Error: ', e) },
 			initFullscreen: false, // iOS only!
 			bgImage: this.thumbnail+track.artist,
 			bgImageScale: "fit",
 		};
 		let songlink = this.baseUrl+track.link;
 		console.log(songlink)
 		this.streamingMedia.playAudio(songlink, options);
 	}

 	

 	playTrack(track){

 		// First stop any currently playing tracks

 		for(let checkTrack of this.tracks){

 			if(checkTrack.playing){
 				this.pauseTrack(checkTrack);
 			}

 		}

 		track.playing = true;
 		this.currentTrack = track;

 		let options: StreamingAudioOptions = {
 			successCallback: () => { console.log('Finished Audio') },
 			errorCallback: (e) => { console.log('Error: ', e) },
 			initFullscreen: false, // iOS only!
 			bgImage: this.thumbnail+track.artist,
 			bgImageScale: "fit",
 		};
 		let songlink = this.baseUrl+track.link;
 		console.log(songlink)
 		this.streamingMedia.playAudio(songlink, options);

 		// Simulate track playing
 		this.progressInterval = setInterval(() => {

 			track.progress < 100 ? track.progress++ : track.progress = 0;

 		}, 1000);

 	}

 	pauseTrack(track){

 		track.playing = false;
 		clearInterval(this.progressInterval);

 	}

 	nextTrack(){

 		let index = this.tracks.indexOf(this.currentTrack);
 		index >= this.tracks.length - 1 ? index = 0 : index++;

 		this.playTrack(this.tracks[index]);

 	}

 	prevTrack(){

 		let index = this.tracks.indexOf(this.currentTrack);
 		index > 0 ? index-- : index = this.tracks.length - 1;

 		this.playTrack(this.tracks[index]);

 	}


 }
