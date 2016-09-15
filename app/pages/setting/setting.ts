import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//import page you want to take action
import {DepartmentListPage} from '../department-list/department-list';
import {AssettypeListPage} from '../assettype-list/assettype-list';

/*
  Generated class for the SettingPage page.รท

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/setting/setting.html',
})
export class SettingPage {

  constructor(private navCtrl: NavController) {

  }

  //start action menu to link
  //start action go list department
  goListDepartment() {
    this.navCtrl.push(DepartmentListPage)
  }
  //end go list department

  //star action go list assettype
  goListAssettype() {
    this.navCtrl.push(AssettypeListPage)
  }
  //edn go list assettype

}
