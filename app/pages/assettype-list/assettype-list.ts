import { Component } from '@angular/core';
import { NavController , Platform, ModalController, ToastController, AlertController } from 'ionic-angular';

//import page to push (go)
import { NewAssettypePage } from '../new-assettype/new-assettype';
import { EditAssettypePage} from '../edit-assettype/edit-assettype';

import {SQLite} from 'ionic-native'
/*
  Generated class for the AssettypeListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/assettype-list/assettype-list.html',
})
export class AssettypeListPage {
  db: SQLite
  assettypeList: Array<Object>

  constructor(private navCtrl: NavController, private toastCtrl: ToastController, private alertCtrl: AlertController) {

    //init db  to connect table
    this.db = new SQLite()
    this.db.openDatabase({
      name: 'data.db',
      location: 'default'
    }).then(() => {
    }, error => {
      console.log(error)
    });
  }
  //end of init db
    //start action go new department
  goNewAssettype() {
    this.navCtrl.push(NewAssettypePage)
  }
  //end go new department

    //get list of all department
    getList() {
    this.assettypeList = [];
    this.db.executeSql('SELECT * FROM assettype', [])
      .then(data => {
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            this.assettypeList.push({
              assettype_id: data.rows.item(i).assettype_id,
              assettypename: data.rows.item(i).assettypename
            });
          }

          console.log(this.assettypeList)
        }
      }, err => {
        console.log(err)
      });
  }
  //end of list all department

  // ???
  ionViewDidEnter() {
    this.getList()
  }
  // ???

  //start edit form with params
  edit(assettype: Object) {
    this.navCtrl.push(EditAssettypePage, assettype)
  }  
    //end edit form

    //start delete process
  doRemove(id: number) {
    this.showConfirm(id)
  }


  showConfirm(id: number) {
    let confirm = this.alertCtrl.create({
      title: 'คุณมั่นใจที่จะทำรายการนี้ ?',
      message: 'คุณต้องการลบรายการนี้?',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            // console.log('Disagree clicked');
          }
        },
        {
          text: 'ใช่',
          handler: () => {
            let sql = `DELETE FROM assettype WHERE assettype_id=?`;
            this.db.executeSql(sql, [id])
              .then(() => {
                this.getList()
              }, error => {
                console.log(error)
              });
          }
        }
      ]
    });
    confirm.present();
  }
  //end delete process

}
