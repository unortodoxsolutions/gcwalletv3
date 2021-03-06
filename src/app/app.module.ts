import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
// import { FCM } from '@ionic-native/fcm';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';

/* Modules */
import { TranslatePoHttpLoader } from '@biesbjerg/ngx-translate-po-http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MomentModule } from 'angular2-moment';
import { NgxQRCodeModule } from 'ngx-qrcode2';
// import { CookieService } from 'ngx-cookie-service';

/* GetCoins App */
import env from '../environments';
import { GCApp } from './app.component';

import { PAGES } from './../pages/pages';

/* Pipes */
import { FiatToUnitPipe } from '../pipes/fiatToUnit';
import { KeysPipe } from '../pipes/keys';
import { OrderByPipe } from '../pipes/order-by';
import { SatToFiatPipe } from '../pipes/satToFiat';
import { SatToUnitPipe } from '../pipes/satToUnit';
import { SafeUrlPipe } from '../pipes/safeUrl';
import { StoreNamePipe } from '../pipes/store-name';

/* Directives */
import { Animate } from '../directives/animate/animate';
import { CopyToClipboard } from '../directives/copy-to-clipboard/copy-to-clipboard';
import { IosScrollBgColor } from '../directives/ios-scroll-bg-color/ios-scroll-bg-color';
import { LongPress } from '../directives/long-press/long-press';
import { NavbarBg } from '../directives/navbar-bg/navbar-bg';
import { NoLowFee } from '../directives/no-low-fee/no-low-fee';

/* Components */
import { COMPONENTS } from './../components/components';

/* Providers */
import { ProvidersModule } from './../providers/providers.module';
import { AtmLocationProvider } from '../providers/atm-location/atm-location';
import { LoginProvider } from '../providers/login/service';
import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';

import { HttpModule } from '@angular/http';
/* Read translation files */
export function createTranslateLoader(http: HttpClient) {
  return new TranslatePoHttpLoader(http, 'assets/i18n/po', '.po');
}

@NgModule({
  declarations: [
    GCApp,
    ...PAGES,
    ...COMPONENTS,
    /* Directives */
    CopyToClipboard,
    IosScrollBgColor,
    LongPress,
    NavbarBg,
    NoLowFee,
    Animate,
    /* Pipes */
    SatToUnitPipe,
    SatToFiatPipe,
    FiatToUnitPipe,
    KeysPipe,
    SafeUrlPipe,
    OrderByPipe,
    StoreNamePipe
  ],
  imports: [
    IonicModule.forRoot(GCApp, {
      animate: env.enableAnimations,
      tabsHideOnSubPages: true,
      tabsPlacement: 'bottom',
      backButtonIcon: 'arrow-round-back',
      backButtonText: ''
    }),
    BrowserModule,
    HttpClientModule,
    HttpModule,
    MomentModule,
    NgxQRCodeModule,
    ProvidersModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    ZXingScannerModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [GCApp, ...PAGES, ...COMPONENTS],
  providers: [
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    AtmLocationProvider,
    LoginProvider,
    InAppBrowser,
    // CookieService,
    Geolocation,
    BackgroundGeolocation,
    LocationTrackerProvider,
    OpenNativeSettings,
  ]
})
export class AppModule {}
