import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import {SQLite} from 'ionic-native'

/*
  Generated class for the EditAssettypePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/edit-assettype/edit-assettype.html',
})
export class EditAssettypePage {
  assettype_id: number
  assettypename: string
  db: SQLite

  constructor(private navCtrl: NavController, private navParams: NavParams,
    private toastCtrl: ToastController) {
          this.assettype_id = this.navParams.get('assettype_id');
    this.assettypename = this.navParams.get('assettypename');
    
    //start init db
    this.db = new SQLite()
    this.db.openDatabase({
      name: 'data.db',
      location: 'default'
    }).then(() => {
    }, error => {
      console.log(error)
    })
    //end init db

  }

        //start update function
    update() {
    let sql = 'UPDATE assettype set assettypename=? WHERE assettype_id=?'
    this.db.executeSql(sql, [this.assettypename, this.assettype_id])
      .then(() => {
        let toast = this.toastCtrl.create({
          message: 'AssetType was Update successfully',
          duration: 3000
        });
        toast.present();
        this.navCtrl.pop()
      }, err => {
        console.log(err)
      });
  }

  //end update function

}
