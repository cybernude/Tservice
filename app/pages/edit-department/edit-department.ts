import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import {SQLite} from 'ionic-native'


/*
  Generated class for the EditDepartmentPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/edit-department/edit-department.html',
})
export class EditDepartmentPage {

  department_id: number
  departmentname: string
  db: SQLite

  constructor(private navCtrl: NavController, private navParams: NavParams,
    private toastCtrl: ToastController) {

    this.department_id = this.navParams.get('department_id');
    this.departmentname = this.navParams.get('departmentname');
    
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
    let sql = 'UPDATE department set departmentname=? WHERE department_id=?'
    this.db.executeSql(sql, [this.departmentname, this.department_id])
      .then(() => {
        let toast = this.toastCtrl.create({
          message: 'Department was added successfully',
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
