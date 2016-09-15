import { Component } from '@angular/core';
//ระบบ Login import AlertController เข้ามาในระบบ
import { NavController , AlertController} from 'ionic-angular';

//ระบบ Login Import Tabpage เข้ามา เพื่อ Redirect ไปหา เวลา Login เสร็จแล้ว
import {TabsPage} from '../tabs/tabs'
/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
})

export class LoginPage {

  //กำหนด username + password เพื่อเชื่อมกับ model ในหน้า html
  username: string
  password: string

  //ระบบ Login เพิ่ม alert alertCtrl เข้ามาใน construc
  constructor(private navCtrl: NavController, private alertCtrl: AlertController) {

  }

  doLogin() {
    if (this.username == 'admin' && this.password == '212224') {
      this.navCtrl.setRoot(TabsPage)
    }else{
      let alert = this.alertCtrl.create({
        title: 'เกิดข้อผิดพลาด',
        subTitle: 'ชื่อผู้ใช้งาน หรือ รหัสผ่านไม่ถูกต้อง',
        buttons: ['ตกลง']
      });
      alert.present();
    }
  }

}
