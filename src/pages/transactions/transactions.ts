import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Events, NavController, MenuController, NavParams, AlertController, Platform } from 'ionic-angular';
import { Logger } from '../../providers/logger/logger';
// Providers
import { ConfigProvider } from '../../providers/config/config';
import { DerivationPathHelperProvider } from '../../providers/derivation-path-helper/derivation-path-helper';
import { OnGoingProcessProvider } from '../../providers/on-going-process/on-going-process';
import { PopupProvider } from '../../providers/popup/popup';
import { ProfileProvider } from '../../providers/profile/profile';
import { LoginProvider } from '../../providers/login/service';
import { PushNotificationsProvider } from '../../providers/push-notifications/push-notifications';
import {
  WalletOptions,
  WalletProvider
} from '../../providers/wallet/wallet';

import { LoginPage } from './../login/login';
// import { TransactionsPage } from './transactions';
import 'rxjs/add/observable/interval'
import {Observable} from 'rxjs/Rx';

import { TransactionDetailsPage } from '../transaction-details/transaction-details';

import * as _ from 'lodash';

@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html'
  // styleUrls: ['./transactions.scss']
})
export class TransactionsPage implements OnInit {
 
  /* For compressed keys, m*73 + n*34 <= 496 */

  private createForm: FormGroup;
  private defaults;
  private tc: number;
  private derivationPathByDefault: string;
  private derivationPathForTestnet: string;
  private phone = true;
  private otp = false;
  private Register = "Proceed"
  public copayers: number[];
  public signatures: number[];
  public showAdvOpts: boolean;
  public seedOptions;
  public isShared: boolean;
  public title: string;
  public okText: string;
  public cancelText: string;
  public data;
  public username;
  public password;
  private cookie;
  private passkey;
  
  public loading: boolean;
  public newResults: any = [];
  public offline: boolean;
  public newResultsReady: boolean = false;
  public geolocation;
  public translat;
  public translng;
  public transname;
  public userid;
  public sub;

  public pages: Array<{title: string, component: any,icon:any}>;

  constructor(
    public http: HttpClient,
    private navCtrl: NavController,
    private navParams: NavParams,
    private fb: FormBuilder,
    private profileProvider: ProfileProvider,
    private loginProvider: LoginProvider,
    private configProvider: ConfigProvider,
    private derivationPathHelperProvider: DerivationPathHelperProvider,
    private popupProvider: PopupProvider,
    private onGoingProcessProvider: OnGoingProcessProvider,
    private logger: Logger,
    private walletProvider: WalletProvider,
    private translate: TranslateService,
    private events: Events,
    private pushNotificationsProvider: PushNotificationsProvider,
    public alertCtrl: AlertController,
    private menu: MenuController
  ) {
    this.pages = [
      { title: 'Dashboard', component: 'TransactionsPage',icon:'banki-summary' },
      { title: 'Transactions', component: 'TransactionsPage',icon:'banki-exchange' },
    ];
    this.okText = this.translate.instant('Ok');
    this.cancelText = this.translate.instant('Cancel');
    this.isShared = this.navParams.get('isShared');
    this.defaults = this.configProvider.getDefaults();
    this.tc = this.isShared ? this.defaults.wallet.totalCopayers : 1;

    this.copayers = _.range(2, this.defaults.limits.totalCopayers + 1);
    this.derivationPathByDefault = this.derivationPathHelperProvider.default;
    this.derivationPathForTestnet = this.derivationPathHelperProvider.defaultTestnet;
    this.showAdvOpts = false;
    this.loading = true;

  }

  ngOnInit() {
    this.calltransac();
    this.sub = Observable.interval(120000)
    .subscribe((val) => { 
      console.log(val);
       this.calltransac();
    });
  }

  public calltransac(){
    for (const [k, v] of this.loginProvider.cookie.headers.entries()) {
      console.log(k, v)
      if(k == "authorization"){
        this.passkey = v;
      }
    }
    
    this.cookie = this.passkey[0];
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    this.userid = username;
    console.log(this.cookie.split(" ")[1]);
    const cookieval = this.loginProvider.cookieval;
    this.loginProvider.getTransactions(token, this.cookie.split(" ")[1], username)
      .subscribe((res:HttpResponse<any>) => {
        const response = res;
        this.newResults = response.body.data;
        this.loading = false;
        this.newResultsReady = true;
        console.log(response.body.data);
        this.data = response;
      }, (err) => {
        const error = err;
        console.log(error);
      });
  }

  public doRefresh(refresher) {
    refresher.pullMin = 90;
    setTimeout(() => {
      this.calltransac();
      refresher.complete();
    }, 2000);
  }

  public showATMLocationsError(): void {
    const alert = this.alertCtrl.create({
      title: 'Some connection errors Occured',
      subTitle: 'Sorry, please come back later and refresh the app!',
      buttons: ['OK']
    });
    alert.present();
  }

  public goToLocationDetails(loc_id, tdata, kiosk_id): void {
    this.loginProvider.getlocationslocal()
    .subscribe(data => {
      this.geolocation = data['locations'];
      this.translat = this.geolocation.find(x=>x.kiosk_id == kiosk_id).lat;
      this.translng = this.geolocation.find(x=>x.kiosk_id == kiosk_id).lng;
      this.transname = this.geolocation.find(x=>x.kiosk_id == kiosk_id).name;
      // this.location(kiosk_id);
      if (data == null) {
        return this.showATMLocationsError();
      }
      console.log(this.translat);
      console.log(this.translng);
      this.navCtrl.push(TransactionDetailsPage, {
        locationId: loc_id,
        dataSet: tdata,
        locdata: this.geolocation.find(x=>x.kiosk_id == kiosk_id),
        lat: this.translat,
        lng: this.translng
        // geolocation: this.myLocation
      });
      // this.logger.info(data);
    },err => {
        console.log(err);
    });
  }

  public getLocalJsonInstead(locid) {
    this.loginProvider.getlocationslocal()
    .subscribe(data => {
      this.geolocation = data['locations'];
      this.translat = this.geolocation.find(x=>x.kiosk_id == locid).lat;
      this.translng = this.geolocation.find(x=>x.kiosk_id == locid).lng;
    },err => {
        console.log(err);
    });
  }

  private convertdate(date) {
    return new Date(date * 1000);
  }

  public location(locid) {
    // this.logger.info('getAPIdata entered now');
    let observableAPI = this.loginProvider.getLocation();
    // ** Get all ATM locations from API */
    observableAPI.subscribe(
      data => {
        this.geolocation = data['locations'];
        this.translat = this.geolocation.find(x=>x.kiosk_id == locid).lat;
        this.translng = this.geolocation.find(x=>x.kiosk_id == locid).lng;
      },err => {
        this.getLocalJsonInstead(locid);
      }
    );
  }

  public getCurrencyCrypto(code){
    const cur = "Unknown";
    switch (code){
        case 1:
            return "BTC";
        case 2:
            return "LTC";
        case 3:
            return "ETH";
        default:
            break;
    }
    return cur;
  }

  public getStatus(stat){
    const cur = "STATUS_UNKNOWN";
    switch (stat){
        case 1:
            return "COMPLETE";
        case 2:
            return "ERROR";
        case  3:
            return "CANCELLED";
        case  4:
            return "FROZEN";
        case  5:
            return "SEIZED";
        case  6:
            return "BLACKLISTED";
        case 7:
            return "AUTOFROZEN";
        default:
            break;
    }
    return cur;
  }

  public getAmount(coin){
    return coin/100;//amount is now in USD not BTC 100000000;
  }

  public getCurrency(code){
    const cur = "FIAT_UNKNOWN";
    switch (code){
        case 1:
            return "$"; 
        case 2:
            return "¥";
        case 3:
            return "£";
        case 4:
            return "A$";
        case 5:
            return "C$";
        case 6:
            return "Лв";
        default:
            break;
    }
    return cur;
  }

  openMenu() {
   this.menu.open();
  }

  toggleMenu() {
    console.log("i clicked");
    this.menu.toggle(); //Add this method to your button click function
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.ionViewWillEnter();
  }

  ionViewWillEnter(){
    this.myDefaultMethodToFetchData();
  }


  myDefaultMethodToFetchData(){
    console.log("new page");
  }

  logout(){
    localStorage.removeItem("issessionactive");
    this.navCtrl.setRoot(LoginPage);
  }
}
