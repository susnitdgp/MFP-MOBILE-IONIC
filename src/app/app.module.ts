import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Network } from "@ionic-native/network";
import { FileOpener } from '@ionic-native/file-opener';
import { File } from "@ionic-native/file";


import { MyApp } from "./app.component";
import { AuthHandlerProvider } from "../providers/auth-handler/auth-handler";
import { AdapterCallsProvider } from "../providers/adapter-calls/adapter-calls";
import { LoaderProvider } from "../providers/loader/loader";
import { LoggerProvider } from "../providers/logger/logger";
import { AlertProvider } from "../providers/alert/alert";
import { ErrorMessagesProvider } from "../providers/error-messages/error-messages";
import { OtpHandlerProvider } from '../providers/otp-handler/otp-handler';

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { scrollAssist: true, autoFocusAssist: true})
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Network,
    StatusBar,
    AuthHandlerProvider,
    AdapterCallsProvider,
    LoaderProvider,
    LoggerProvider,
    AlertProvider,
    ErrorMessagesProvider,
    FileOpener,
    File,
    OtpHandlerProvider
  ]
})
export class AppModule {}
