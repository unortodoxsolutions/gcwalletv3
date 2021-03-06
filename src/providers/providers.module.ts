import { NgModule } from '@angular/core';

import { DecimalPipe } from '@angular/common';

import {
  AddressBookProvider,
  AddressProvider,
  // AmazonProvider,
  AndroidFingerprintAuth,
  AppIdentityProvider,
  AppProvider,
  BackupProvider,
  // **GCEdit: YOU CANNOT TAKE OUT THESE TWO BitPay providers because it will cause the home page to be completly blank.
  BitPayCardProvider,
  BitPayProvider,
  // BitPayAccountProvider, // **GCEdit: THis one was okay to take out.
  BwcErrorProvider,
  BwcProvider,
  Clipboard,
  // CoinbaseProvider,
  ConfigProvider,
  DerivationPathHelperProvider,
  Device,
  EmailNotificationsProvider,
  ExternalLinkProvider,
  FCM,
  FeedbackProvider,
  FeeProvider,
  File,
  FilterProvider,
  // GlideraProvider,
  HomeIntegrationsProvider,
  IncomingDataProvider,
  LanguageProvider,
  Logger,
  // MercadoLibreProvider,
  NodeWebkitProvider,
  OnGoingProcessProvider,
  PayproProvider,
  PersistenceProvider,
  PlatformProvider,
  PopupProvider,
  ProfileProvider,
  LoginProvider,
  PushNotificationsProvider,
  QRScanner,
  RateProvider,
  ReleaseProvider,
  ReplaceParametersProvider,
  ScanProvider,
  ScreenOrientation,
  // ShapeshiftProvider,
  SocialSharing,
  SplashScreen,
  StatusBar,
  TimeProvider,
  Toast,
  TouchID,
  TouchIdProvider,
  TxConfirmNotificationProvider,
  TxFormatProvider,
  Vibration,
  WalletProvider
} from './index';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@NgModule({
  providers: [
    AddressProvider,
    AddressBookProvider,
    AndroidFingerprintAuth,
    AppProvider,
    AppIdentityProvider,
    // AmazonProvider,
    BackupProvider,
    BitPayProvider,
    BitPayCardProvider,
    // BitPayAccountProvider,
    BwcProvider,
    BwcErrorProvider,
    ConfigProvider,
    // CoinbaseProvider,
    Clipboard,
    DerivationPathHelperProvider,
    Device,
    ExternalLinkProvider,
    FeedbackProvider,
    FCM,
    HomeIntegrationsProvider,
    FeeProvider,
    // GlideraProvider,
    InAppBrowser,
    IncomingDataProvider,
    LanguageProvider,
    Logger,
    { provide: 'console', useValue: console },
    // MercadoLibreProvider,
    NodeWebkitProvider,
    OnGoingProcessProvider,
    PayproProvider,
    PlatformProvider,
    ProfileProvider,
    PopupProvider,
    QRScanner,
    PushNotificationsProvider,
    RateProvider,
    ReleaseProvider,
    ReplaceParametersProvider,
    // ShapeshiftProvider,
    StatusBar,
    SplashScreen,
    ScanProvider,
    ScreenOrientation,
    SocialSharing,
    Toast,
    TouchID,
    Vibration,
    TimeProvider,
    TouchIdProvider,
    TxConfirmNotificationProvider,
    FilterProvider,
    TxFormatProvider,
    WalletProvider,
    EmailNotificationsProvider,
    DecimalPipe,
    PersistenceProvider,
    File
  ]
})
export class ProvidersModule {}
