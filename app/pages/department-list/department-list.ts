import { Component } from '@angular/core';
//เพิ่ม Platform, ModalController, ToastController เข้ามาเพื่อทำระบบ Modal
import { NavController, Platform, ModalController, ToastController, AlertController } from 'ionic-angular';

//import {ModalNewPage} from '../modal-new/modal-new'
import {NewDepartmentPage} from '../new-department/new-department';

//import Edit page
import {EditDepartmentPage} from '../edit-department/edit-department';

import {SQLite} from 'ionic-native'

/*
  Generated class for the DepartmentListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/department-list/department-list.html',
})
export class DepartmentListPage {
  db: SQLite
  departmentList: Array<Object>

  // เพิ่ม private toastCtrl: ToastController เข้ามาเพื่อทำ Modal
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
  goNewDepartment() {
    this.navCtrl.push(NewDepartmentPage)
  }
  //end go new department

  newPerson() {
    this.navCtrl.push(NewDepartmentPage)
  }

  //get list of all department
    getList() {
    this.departmentList = [];
    this.db.executeSql('SELECT * FROM department', [])
      .then(data => {
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            this.departmentList.push({
              department_id: data.rows.item(i).department_id,
              departmentname: data.rows.item(i).departmentname
            });
          }

          console.log(this.departmentList)
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
  edit(department: Object) {
    this.navCtrl.push(EditDepartmentPage, department)
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
            let sql = `DELETE FROM department WHERE department_id=?`;
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
