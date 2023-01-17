import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AuthHandlerProvider } from "../../providers/auth-handler/auth-handler";
import { AdapterCallsProvider } from "../../providers/adapter-calls/adapter-calls";
import { LoaderProvider } from "../../providers/loader/loader";
import { AlertProvider } from "../../providers/alert/alert";

@IonicPage()
@Component({
  selector: "page-terms-and-conditions",
  templateUrl: "terms-and-conditions.html",
})
export class TermsAndConditionsPage {
  termsAndConditions: any = {};
  showButtons;
  authenticatedUser;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authHandler: AuthHandlerProvider,
    private adapter: AdapterCallsProvider,
    private loader: LoaderProvider,
    private alert: AlertProvider
  ) {
    if (navParams && navParams.data) {
      this.termsAndConditions = navParams.data.termsAndConditions;
      console.log(this.termsAndConditions);
      this.authenticatedUser = navParams.data.user;
      this.showButtons = navParams.data.showButtons;
    } else {
    }
  }

  ionViewDidLoad() {
    this.loader.dismissLoading();
  }

  logout() {
    this.authHandler.logout();
    this.navCtrl.setRoot("LdapLoginPage");
  }

  updateUserConcent(userConsent: boolean) {
    if (userConsent) {
      this.loader.showLoading();
      this.adapter
        .callUnprotectedAdapterResource(
          "/adapters/MobilitySMSAdapter/resource/termsAccept?empnum=" +
            this.authenticatedUser.id
        )
        .then((response) => {
          if (response.responseText == "SUCCESS") {
            this.loader.dismissLoading();
            this.navCtrl.setRoot("InboxPage", this.authenticatedUser);
          } else {
            this.alert.showErrorMessage(706);
          }
        })
        .catch((error) => {
          this.loader.dismissLoading();
          this.alert.showErrorMessage(706);
        });
    } else {
      this.logout();
    }
  }

  goBack() {
    this.navCtrl.pop();
  }
}
