import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';

//Import Page ต่างๆ  เข้ามาในระบบ
import {ServicePage} from '../service/service'
import {ReportPage} from '../report/report'
import {SettingPage} from '../setting/setting'

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;
  private tab4Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = HomePage;
    this.tab2Root = ServicePage;
    this.tab3Root = ReportPage;
    this.tab4Root = SettingPage;
  }
}
