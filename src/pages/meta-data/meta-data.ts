import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, App } from "ionic-angular";
import { LoggerProvider } from "../../providers/logger/logger";
import { LoaderProvider } from "../../providers/loader/loader";
import { AdapterCallsProvider } from "../../providers/adapter-calls/adapter-calls";
import { AlertProvider } from "../../providers/alert/alert";

@IonicPage()
@Component({
  selector: "page-meta-data",
  templateUrl: "meta-data.html",
})
export class MetaDataPage {
  taskDetails;
  metaData;
  showDopTable = false;
  taskVariables;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    private logger: LoggerProvider,
    private loader: LoaderProvider,
    private adapter: AdapterCallsProvider,
    private alert: AlertProvider
  ) {
    this.taskDetails = this.navParams.data;
    this.taskVariables = this.taskDetails.data.variables;
    this.metaData = this.taskVariables.metaData;
    if (!this.metaData) {
      this.alert.showErrorMessage(725);
      this.goToInbox();
    }
    this.logger.debug("Nav Params", this.taskDetails);
  }

  ionViewDidLoad() {}

  goToInbox() {
    const root = this.app.getRootNav();
    root.popToRoot();
  }

  displayDOPTable() {
    this.showDopTable = true;
  }

  showDOP(dop) {
    const params = {
      data: dop.selectedDOP.page_id,
    };
    const payload = [
      {
        queryParamName: "params",
        queryParamValue: encodeURIComponent(JSON.stringify(params)),
      },
    ];
    this.loader.showLoading();
    this.adapter
      .processGetRequest("/adapters/BPM/resource/getDOPContent", payload)
      .then(
        (response) => {
          const dopContent = response.data.data.results;
          this.openDOP(dopContent);
          this.loader.dismissLoading();
        },
        (error) => {
          this.logger.debug(error);
          this.loader.dismissLoading();
        }
      );
  }
  openDOP(dopContent: any) {
    const navParams = { dopContent: dopContent };
    this.navCtrl.push("DopPage", navParams);
  }
}
