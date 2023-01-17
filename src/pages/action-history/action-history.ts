import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, App } from "ionic-angular";
import { AdapterCallsProvider } from "../../providers/adapter-calls/adapter-calls";
import { LoaderProvider } from "../../providers/loader/loader";
import { LoggerProvider } from "../../providers/logger/logger";
import { AlertProvider } from "../../providers/alert/alert";

@IonicPage()
@Component({
  selector: "page-action-history",
  templateUrl: "action-history.html"
})
export class ActionHistoryPage {
  actionHistory = [];
  processInstanceId: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    private adapter: AdapterCallsProvider,
    private loader: LoaderProvider,
    private logger: LoggerProvider,
    private alert: AlertProvider
  ) {
    this.processInstanceId = navParams.data.piid;
    logger.debug(this.processInstanceId);
    this.loadActionHistory();
  }

  loadActionHistory() {
    this.loader.showLoading();
    const params = {
      processInstanceId: this.processInstanceId
    };
    const payload = [
      {
        queryParamName: "params",
        queryParamValue: encodeURIComponent(JSON.stringify(params))
      }
    ];
    this.adapter
      .processGetRequest("/adapters/BPM/resource/getActionHistory", payload)
      .then(
        response => {
          this.loader.dismissLoading();
          this.actionHistory = response.data.data.bpmActions.items;
          if (!this.actionHistory.length) {
            this.alert.showErrorMessage(726);
          }
        },
        error => {
          this.logger.debug(error);
          this.loader.dismissLoading();
        }
      );
  }

  goToInbox() {
    const root = this.app.getRootNav();
    root.popToRoot();
  }
}
