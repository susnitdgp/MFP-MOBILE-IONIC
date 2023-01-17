import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AdapterCallsProvider } from "../../providers/adapter-calls/adapter-calls";

@IonicPage()
@Component({
  selector: "page-dashboard-summary",
  templateUrl: "dashboard-summary.html"
})
export class DashboardSummaryPage {
  files;
  params;
  dashboardType: any;
  endpoint: any;
  pageTitle: any = "Dashboard Details";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private adapter: AdapterCallsProvider
  ) {
    const data = navParams.data;
    this.pageTitle = data.pageTitle;
    this.files = data.data;
    this.params = data.params;
    this.dashboardType = data.dashboardType;
    this.endpoint = data.endpoint;
  }

  loadMore(infiniteScroll) {
    this.params.pageOffset = this.files.length;
    const payload = [
      {
        queryParamName: "params",
        queryParamValue: encodeURIComponent(JSON.stringify(this.params))
      }
    ];
    this.adapter.processGetRequest(this.endpoint, payload).then(
      response => {
        const responseData = response.data.data;
        if (responseData.errorMessage) {
        } else {
          this.files.push(...responseData.results.items);
        }
        infiniteScroll.complete();
      },
      error => {
        infiniteScroll.complete();
      }
    );
  }
}
