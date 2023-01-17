import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  App,
  AlertController
} from "ionic-angular";
import { AdapterCallsProvider } from "../../providers/adapter-calls/adapter-calls";
import { AlertProvider } from "../../providers/alert/alert";
import { LoaderProvider } from "../../providers/loader/loader";
import { LoggerProvider } from "../../providers/logger/logger";

@IonicPage()
@Component({
  selector: "page-forward",
  templateUrl: "forward.html"
})
export class ForwardPage {
  searchBy = "Employee Name";
  searchByKeyWord = "";
  employeeSearchResults: any = [];
  employeeSearchResultsUICopy: any = [];
  selectedUser;
  forwardPayload: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private adapter: AdapterCallsProvider,
    private alert: AlertProvider,
    private loader: LoaderProvider,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private app: App,
    private logger: LoggerProvider
  ) {
    this.forwardPayload = this.navParams.data;
  }

  search() {
    if (this.searchByKeyWord.length > 2) {
      let params: any = {
        data: {
          empNumber: this.searchByKeyWord
        }
      };
      if (this.searchBy == "Employee Name") {
        params = {
          data: {
            empName: this.searchByKeyWord
          }
        };
      }

      this.searchUserByKeyword(params);
    } else {
      this.alert.showErrorMessage(709);
    }
  }

  searchUserByKeyword(params) {
    this.loader.showLoading();
    const payload = [
      {
        queryParamName: "params",
        queryParamValue: encodeURIComponent(JSON.stringify(params))
      }
    ];
    this.adapter
      .processGetRequest("/adapters/BPM/resource/userSearch", payload)
      .then(
        response => {
          this.loader.dismissLoading();
          if (
            response.data.data.results.items &&
            response.data.data.results.items.length
          ) {
            this.employeeSearchResults = response.data.data.results.items;
            this.employeeSearchResultsUICopy = this.employeeSearchResults;
            this.selectedUser = null;
          } else {
            this.alert.showErrorMessage(720);
          }
        },
        error => {
          this.loader.dismissLoading();
          this.logger.debug(error);
        }
      );
  }

  filterUsers() {
    this.employeeSearchResultsUICopy = this.employeeSearchResults;
    const userSearchFilter = this.modalCtrl.create(
      "UserSearchFilterPage",
      this.employeeSearchResults,
      {
        cssClass: "user-filter-modal",
        enableBackdropDismiss: false,
        showBackdrop: true
      }
    );
    userSearchFilter.onDidDismiss(filters => {
      if (filters) {
        this.applyFilters(filters);
      }
    });
    userSearchFilter.present();
  }

  applyFilters(filters) {
    if (filters.selectedPlant) {
      this.employeeSearchResultsUICopy = this.employeeSearchResultsUICopy.filter(
        employee => employee.empPSA === filters.selectedPlant
      );
    }

    if (filters.selectedDepartment) {
      this.employeeSearchResultsUICopy = this.employeeSearchResultsUICopy.filter(
        employee => employee.empDepartmentName === filters.selectedDepartment
      );
    }

    if (filters.selectedDesignation) {
      this.employeeSearchResultsUICopy = this.employeeSearchResultsUICopy.filter(
        employee => employee.empDesignation === filters.selectedDesignation
      );
    }
    if (this.employeeSearchResultsUICopy.length < 1) {
      this.alert.showErrorMessage(712);
      this.employeeSearchResultsUICopy = this.employeeSearchResults;
    }
  }

  goBack() {
    this.navCtrl.pop();
  }

  performAction() {
    if (this.selectedUser) {
      this.forwardPayload.toUserId = this.selectedUser.empNo;
      const params = {
        input: this.forwardPayload
      };
      const payload = { params: encodeURIComponent(JSON.stringify(params)) };
      this.loader.showLoading();

      this.adapter
        .processPostRequest(
          "/adapters/BPM/resource/performActionOnTask",
          payload
        )
        .then(
          response => {
            this.loader.dismissLoading();
            let message = "File submitted successfully";
            if (response.message) {
              message = response.message;
            } else if (response.exception) {
              message = response.exception;
            }
            if (response.status) {
              this.displayAlert(message, true);
            } else {
              this.displayAlert(message, false);
            }
          },
          error => {
            this.logger.debug(error);
            this.loader.dismissLoading();
          }
        );
    } else {
      this.alert.showErrorMessage(713);
    }
  }

  displayAlert(alertText, goToInbox) {
    let alert = this.alertCtrl.create({
      message: alertText,
      buttons: [
        {
          text: "OK",
          handler: () => {
            alert.dismiss();
            if (goToInbox) {
              this.goToInbox();
            }
            return false;
          }
        }
      ]
    });
    alert.present();
  }

  goToInbox() {
    const root = this.app.getRootNav();
    root.popToRoot();
  }

  getSubmitButtonClass() {
    let className = "primary";
    if (this.forwardPayload.actionName == "Forward") {
      className = "secondary";
    } else if (this.forwardPayload.actionName == "Reject") {
      className = "danger";
    }

    return className;
  }

  selectEmployeeToAdd(employee) {
    this.selectedUser = employee;
  }
}
