import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar, SQLite} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';

//import login page เข้ามา
import {LoginPage} from './pages/login/login';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    // ระบบ Login เปลี่ยน root page จาก tabpage เป็น LoginPage
    this.rootPage = TabsPage;
    //this.rootPage = LoginPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      //start init db for project
      let db = new SQLite()
      db.openDatabase({
        name: 'data.db',
        location: 'default'
      }).then(() => {
        //create department table
        let sql1 = `CREATE TABLE IF NOT EXISTS 
        department (department_id INTEGER PRIMARY KEY AUTOINCREMENT,
        departmentname TEXT)`;

        //create subdepartment table
        let sql2 = `CREATE TABLE IF NOT EXISTS 
        subdepartment (subdepartment_id INTEGER PRIMARY KEY AUTOINCREMENT,
        department_id INTEGER, subdepartmentname TEXT)`;

        //create assettype table
        let sql3 =`CREATE TABLE IF NOT EXISTS 
        assettype (assettype_id INTEGER PRIMARY KEY AUTOINCREMENT,
        assettypename TEXT)`;
        
        db.sqlBatch([sql1, sql2, sql3])
          .then(() => {
          console.log("TABLE CREATED");
        }, (error) => {
          console.error("Unable to execute sql", error);
        });
      }, error => {
        console.error("Unable to open database", error)
      });  
      //end init db
    });
  }
}

ionicBootstrap(MyApp);
