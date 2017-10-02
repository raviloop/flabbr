import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Http } from '@angular/http';


import { Item } from '../../models/item';
import { Items } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: Item[];
  playlists : any;

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController, public http: Http) {
    // this.currentItems = this.items.query();
    this.http.get('http://35.154.215.58/allplaylist').map(res => res.json()).subscribe(data => {
      console.log(data);
      this.playlists = data;
    });

  }

  /**
   * The view loaded, let's query our items for the list
   */
   ionViewDidLoad() {
   }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */

    doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.http.get('http://35.154.215.58/allplaylist').map(res => res.json()).subscribe(data => {
      console.log(data);
      this.playlists = data;
    });
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }

   addItem() {
     let addModal = this.modalCtrl.create('ItemCreatePage');
     addModal.onDidDismiss(item => {
       if (item) {
         this.items.add(item);
       }
     })
     addModal.present();
   }

  /**
   * Delete an item from the list of items.
   */
   deleteItem(item) {
     this.items.delete(item);
   }

  /**
   * Navigate to the detail page for this item.
   */
   openItem(item) {
     console.log(item);
     this.navCtrl.push('ItemDetailPage', {
       item: item
     });
   }
 }
