import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import {SQLite} from 'ionic-native'
/*
  Generated class for the NewDepartmentPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/new-department/new-department.html',
})
export class NewDepartmentPage {

  db: SQLite
  departmentname: string

  constructor(private navCtrl: NavController, private loadingCtrl: LoadingController) {
this.db = new SQLite()
     this.db.openDatabase({
       name: 'data.db',
       location: 'default'
     }).then(() => {
     }, error => {
       console.log(error)
     });
  }

  save() {
    let sql = `INSERT INTO department(departmentname) VALUES (?)`;
    this.db.executeSql(sql, [this.departmentname])
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

}
