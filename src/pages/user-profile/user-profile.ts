import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AdapterCallsProvider } from "../../providers/adapter-calls/adapter-calls";
import { LoaderProvider } from "../../providers/loader/loader";
import { LoggerProvider } from "../../providers/logger/logger";

@IonicPage()
@Component({
  selector: "page-user-profile",
  templateUrl: "user-profile.html"
})
export class UserProfilePage {
  userDetails: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private adapter: AdapterCallsProvider,
    private loader: LoaderProvider,
    private logger: LoggerProvider
  ) {
    this.userDetails = navParams.data;
  }

  goToInbox() {
    this.navCtrl.pop();
  }

  showTermsAndConditions() {
    this.loader.showLoading();

    this.adapter
      .callUnprotectedAdapterResource(
        "/adapters/MobilitySMSAdapter/resource/terms"
      )
      .then(response => {
        this.loader.dismissLoading();

        const navData = {
          termsAndConditions: response.responseText,
          showButtons: false
        };
        this.navCtrl.push("TermsAndConditionsPage", navData);
      })
      .catch(error => {
        this.loader.dismissLoading();
        this.logger.debug(error);
      });
  }
}
