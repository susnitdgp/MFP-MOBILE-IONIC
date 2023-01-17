import { Network } from "@ionic-native/network";
import { Component, Renderer } from "@angular/core";
import { Platform, App } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";

import { AuthHandlerProvider } from "../providers/auth-handler/auth-handler";
import { LoggerProvider } from "../providers/logger/logger";
import { LoaderProvider } from "../providers/loader/loader";
import { AlertProvider } from "../providers/alert/alert";
import { StatusBar } from "@ionic-native/status-bar";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = "LdapLoginPage";

  constructor(
    platform: Platform,
    renderer: Renderer,
    splashScreen: SplashScreen,
    statusBar: StatusBar,
    private authHandler: AuthHandlerProvider,
    private logger: LoggerProvider,
    private app: App,
    private loader: LoaderProvider,
    private alert: AlertProvider,
    public network: Network
  ) {
    const disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.alert.showErrorMessage(721);
    });

    renderer.listenGlobal("document", "mfpjsloaded", () => {
      logger.debug("--> MyApp mfpjsloaded");
      this.authHandler.init();
    });
    
    platform.ready().then(() => {
      //statusBar.styleLightContent();
      splashScreen.hide();
    });
    platform.registerBackButtonAction(() => {
      if (this.loader.isActive()) {
        // Do nothing
      } else {
        this.app.goBack();
      }
    });
  }
}
