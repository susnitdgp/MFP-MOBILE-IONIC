import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  App,
  AlertController,
  reorderArray,
  ModalController,
} from "ionic-angular";
import { AlertProvider } from "../../providers/alert/alert";
import { AdapterCallsProvider } from "../../providers/adapter-calls/adapter-calls";
import { LoaderProvider } from "../../providers/loader/loader";
import { LoggerProvider } from "../../providers/logger/logger";

@IonicPage()
@Component({
  selector: "page-approval",
  templateUrl: "approval.html",
})
export class ApprovalPage {
  predefinedUsersList: any = [];
  forwardPayload: any = {};
  notesheetComments: string = "";
  taskVariables: any;
  searchBy = "Employee Name";
  searchByKeyWord = "";
  isAddingUser = false;
  selectedUser;

  employeeSearchResults: any = [];
  employeeSearchResultsUICopy: any = [];
  hideApprovalWindow = false;
  isApprovedFile = false;

  oldTaskMessage =
    "File can be Approved/Rejected/Forwarded from desktop browser only for all the files which has task creation date before 15th March 2020";
  isDOPRouteVerified = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    private alert: AlertProvider,
    private alertCtrl: AlertController,
    private adapter: AdapterCallsProvider,
    private loader: LoaderProvider,
    private logger: LoggerProvider,
    private modalCtrl: ModalController
  ) {
    let taskDetails = this.navParams.data.taskDetails;

    this.isApprovedFile = this.navParams.data.isApprovedFile;

    const deploymentDate = new Date("2020-04-19T00:00:00");
    const taskCreationDate = new Date(taskDetails.activationTime);
    this.hideApprovalWindow = deploymentDate > taskCreationDate;

    if (this.hideApprovalWindow) {
      this.oldTaskMessage = this.navParams.data.oldTaskMessage;
    }

    this.taskVariables = taskDetails.data.variables;
    if (this.taskVariables.predefinedUsersList) {
      this.predefinedUsersList = this.taskVariables.predefinedUsersList.items;
    }

    this.isDOPRouteVerified =
      this.taskVariables.DOP_Route_VerifiedBy &&
      this.taskVariables.DOP_Route_VerifiedBy != "none";

    this.forwardPayload.fromUserId = this.navParams.data.empNo;
    this.forwardPayload.noteSheetId = this.taskVariables.noteSheetPDFID;
    this.forwardPayload.folderId = this.taskVariables.fileFolderID;
    this.forwardPayload.instanceId = taskDetails.piid;
    this.forwardPayload.taskId = this.navParams.data.taskId.toString();
    this.forwardPayload.fileNumber = this.taskVariables.metaData.fileNumber;
    // this.forwardPayload.completedFilePathDetails = this.taskVariables.completedFilePathDetails.items;
  }

  ionViewDidLoad() {}

  goToInbox() {
    const root = this.app.getRootNav();
    root.popToRoot();
  }

  forward() {
    this.navCtrl.push("ForwardPage");
  }

  performAction(action) {
    this.forwardPayload.comments = this.notesheetComments.trim();
    this.forwardPayload.actionName = action;
    this.forwardPayload.isDOPRouteVerified = this.isDOPRouteVerified;
    if (this.predefinedUsersList.length || action == "Close") {
      if (this.predefinedUsersList.length) {
        this.forwardPayload.predefinedUserList = this.predefinedUsersList.map(
          (employee) => employee.empNo
        );
      }

      const params = {
        input: this.forwardPayload,
      };
      const payload = { params: encodeURIComponent(JSON.stringify(params)) };
      this.loader.showLoading();

      this.adapter
        .processPostRequest(
          "/adapters/BPM/resource/performActionOnTask",
          payload
        )
        .then(
          (response) => {
            this.isDOPRouteVerified =
              this.taskVariables.DOP_Route_VerifiedBy &&
              this.taskVariables.DOP_Route_VerifiedBy != "none";
            this.loader.dismissLoading();
            let message = "File submitted successfully";
            if (response.message) {
              message = response.message;
            } else if (response.exception) {
              message = response.exception;
            }
            if (response.isDOPRouteRequired) {
              this.showDOPRoutingValidationPrompt(action);
            } else if (response.status) {
              this.displayAlert(message, true);
            } else {
              this.displayAlert(message, false);
            }
          },
          (error) => {
            this.logger.debug(error);
            this.loader.dismissLoading();
          }
        );
    } else {
      this.navCtrl.push("ForwardPage", this.forwardPayload);
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
          },
        },
      ],
    });
    alert.present();
  }

  reorderItems(indexes) {
    let tempList = reorderArray(this.predefinedUsersList, indexes);

    let filteredList = tempList.filter((value, index) => {
      if (index != 0) {
        return tempList[index - 1].empNo !== value.empNo;
      }

      return true;
    });

    this.predefinedUsersList = filteredList;
  }

  removeUserFromList(index) {
    this.predefinedUsersList.splice(index, 1);
  }

  addUserToTheList() {
    this.isAddingUser = true;
  }

  addSelectedUserToThePath() {
    if (!this.selectedUser) {
      this.alert.showErrorMessage(728);
      return;
    } else if (
      this.predefinedUsersList.length &&
      this.selectedUser.empNo ==
        this.predefinedUsersList[this.predefinedUsersList.length - 1].empNo
    ) {
      this.alert.showErrorMessage(729);
      return;
    } else {
      this.predefinedUsersList.push(this.selectedUser);
      this.selectedUser = null;
      this.employeeSearchResults = [];
      this.employeeSearchResultsUICopy = [];
      this.isAddingUser = false;
    }
  }

  filterUsers() {
    this.employeeSearchResultsUICopy = this.employeeSearchResults;
    const userSearchFilter = this.modalCtrl.create(
      "UserSearchFilterPage",
      this.employeeSearchResults,
      {
        cssClass: "user-filter-modal",
        enableBackdropDismiss: false,
        showBackdrop: true,
      }
    );
    userSearchFilter.onDidDismiss((filters) => {
      if (filters) {
        this.applyFilters(filters);
      }
    });
    userSearchFilter.present();
  }

  applyFilters(filters) {
    if (filters.selectedPlant) {
      this.employeeSearchResultsUICopy = this.employeeSearchResultsUICopy.filter(
        (employee) => employee.empPSA === filters.selectedPlant
      );
    }

    if (filters.selectedDepartment) {
      this.employeeSearchResultsUICopy = this.employeeSearchResultsUICopy.filter(
        (employee) => employee.empDepartmentName === filters.selectedDepartment
      );
    }

    if (filters.selectedDesignation) {
      this.employeeSearchResultsUICopy = this.employeeSearchResultsUICopy.filter(
        (employee) => employee.empDesignation === filters.selectedDesignation
      );
    }
    if (this.employeeSearchResultsUICopy.length < 1) {
      this.alert.showErrorMessage(712);
      this.employeeSearchResultsUICopy = this.employeeSearchResults;
    }
  }

  search() {
    if (this.searchByKeyWord.length > 2) {
      let params: any = {
        data: {
          empNumber: this.searchByKeyWord,
        },
      };
      if (this.searchBy == "Employee Name") {
        params = {
          data: {
            empName: this.searchByKeyWord,
          },
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
        queryParamValue: encodeURIComponent(JSON.stringify(params)),
      },
    ];
    this.adapter
      .processGetRequest("/adapters/BPM/resource/userSearch", payload)
      .then(
        (response) => {
          this.loader.dismissLoading();
          if (
            response.data.data.results.items &&
            response.data.data.results.items.length
          ) {
            this.employeeSearchResults = response.data.data.results.items;
            this.employeeSearchResultsUICopy = this.employeeSearchResults;
            this.selectedUser = null;
            this.searchByKeyWord = "";
          } else {
            this.alert.showErrorMessage(720);
          }
        },
        (error) => {
          this.loader.dismissLoading();
          this.logger.debug(error);
        }
      );
  }

  selectEmployeeToAdd(employee) {
    this.selectedUser = employee;
  }

  cancelUserSearch() {
    this.isAddingUser = false;
  }

  showDOPRoutingValidationPrompt(action) {
    let dopValidationPrompt = this.alertCtrl.create({
      title: "DOP and routing of file path verification",
      inputs: [
        {
          label: "Reviewed the DOP",
          type: "checkbox",
          value: "dopCheck",
        },
        {
          label: "Checked routing of the file",
          type: "checkbox",
          value: "routeCheck",
        },
      ],
      buttons: [
        {
          text: "Close",
          handler: () => {
            dopValidationPrompt.dismiss();
            return false;
          },
        },
        {
          text: "Proceed",
          handler: (data) => {
            if (data.length == 2) {
              this.isDOPRouteVerified = true;
              this.performAction(action);
            } else {
              this.displayAlert(
                "Please ensure that you have verified both DOP and predefined path routing",
                false
              );
            }
            dopValidationPrompt.dismiss();
            return false;
          },
        },
      ],
    });

    dopValidationPrompt.present();
  }
}
