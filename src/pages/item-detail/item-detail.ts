import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Items } from '../../providers/providers';

import { StreamingMedia, StreamingAudioOptions } from '@ionic-native/streaming-media';

@IonicPage()
@Component({
	selector: 'page-item-detail',
	templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
	playlist: any;
	baseUrl: any;
	imgSrc: any;

	constructor(public navCtrl: NavController, navParams: NavParams, items: Items,private streamingMedia: StreamingMedia) {
		// this.item = navParams.get('item') || items.defaultItem;

		this.playlist = navParams.get('item');
		console.log(this.playlist);
		this.baseUrl = 'http://35.154.215.58/';
		this.imgSrc = this.baseUrl+this.playlist.image;
	}

	playSong(song){
		console.log(song);
		let options: StreamingAudioOptions = {
			successCallback: () => { console.log('Finished Audio') },
			errorCallback: (e) => { console.log('Error: ', e) },
			initFullscreen: false, // iOS only!
			bgImage: this.baseUrl+this.playlist.image,
			bgImageScale: "fit",
		};
		let url = song.url;

		var link = url.split('/')
		link[2] = encodeURIComponent(link[2].trim());
		let finalurl = link.join('/');
		console.log(finalurl);
		let songlink = this.baseUrl+finalurl;
		console.log(songlink)
		this.streamingMedia.playAudio(songlink, options);
	}

}
