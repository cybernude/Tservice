import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import {SQLite} from 'ionic-native'

/*
  Generated class for the NewAssettypePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/new-assettype/new-assettype.html',
})
export class NewAssettypePage {

  db: SQLite
  assettypename: string

  constructor(private navCtrl: NavController, private loadingCtrl: LoadingController) {

  //init db
  this.db = new SQLite()
     this.db.openDatabase({
       name: 'data.db',
       location: 'default'
     }).then(() => {
     }, error => {
       console.log(error)
     });
  //end init db
  

  }

//save assettype function
  save() {
    let sql = `INSERT INTO assettype(assettypename) VALUES (?)`;
    this.db.executeSql(sql, [this.assettypename])
      .then(() => {
        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        loading.present();

        setTimeout(() => {
          this.navCtrl.pop()
          loading.dismiss();
        }, 1000)
      }, err => {
        console.log(err)
      });
  
  }
//end save assettype function

}
