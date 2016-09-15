import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//import list-service
import {ListServicePage} from '../list-service/list-service';

/*
  Generated class for the ServicePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/service/service.html',
})
export class ServicePage {

  constructor(private navCtrl: NavController) {

  }

  //start go list service page
  goListServicePage() {
    this.navCtrl.push(ListServicePage)
  }
  //end go list service page

}
