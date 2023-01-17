webpackJsonp([14],{

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApprovalPageModule", function() { return ApprovalPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__approval__ = __webpack_require__(423);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ApprovalPageModule = /** @class */ (function () {
    function ApprovalPageModule() {
    }
    ApprovalPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__approval__["a" /* ApprovalPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__approval__["a" /* ApprovalPage */]),
            ],
        })
    ], ApprovalPageModule);
    return ApprovalPageModule;
}());

//# sourceMappingURL=approval.module.js.map

/***/ }),

/***/ 423:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApprovalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_alert_alert__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_adapter_calls_adapter_calls__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_loader_loader__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_logger_logger__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ApprovalPage = /** @class */ (function () {
    function ApprovalPage(navCtrl, navParams, app, alert, alertCtrl, adapter, loader, logger, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.app = app;
        this.alert = alert;
        this.alertCtrl = alertCtrl;
        this.adapter = adapter;
        this.loader = loader;
        this.logger = logger;
        this.modalCtrl = modalCtrl;
        this.predefinedUsersList = [];
        this.forwardPayload = {};
        this.notesheetComments = "";
        this.searchBy = "Employee Name";
        this.searchByKeyWord = "";
        this.isAddingUser = false;
        this.employeeSearchResults = [];
        this.employeeSearchResultsUICopy = [];
        this.hideApprovalWindow = false;
        this.isApprovedFile = false;
        this.oldTaskMessage = "File can be Approved/Rejected/Forwarded from desktop browser only for all the files which has task creation date before 15th March 2020";
        this.isDOPRouteVerified = false;
        var taskDetails = this.navParams.data.taskDetails;
        this.isApprovedFile = this.navParams.data.isApprovedFile;
        var deploymentDate = new Date("2020-04-19T00:00:00");
        var taskCreationDate = new Date(taskDetails.activationTime);
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
    ApprovalPage.prototype.ionViewDidLoad = function () { };
    ApprovalPage.prototype.goToInbox = function () {
        var root = this.app.getRootNav();
        root.popToRoot();
    };
    ApprovalPage.prototype.forward = function () {
        this.navCtrl.push("ForwardPage");
    };
    ApprovalPage.prototype.performAction = function (action) {
        var _this = this;
        this.forwardPayload.comments = this.notesheetComments.trim();
        this.forwardPayload.actionName = action;
        this.forwardPayload.isDOPRouteVerified = this.isDOPRouteVerified;
        if (this.predefinedUsersList.length || action == "Close") {
            if (this.predefinedUsersList.length) {
                this.forwardPayload.predefinedUserList = this.predefinedUsersList.map(function (employee) { return employee.empNo; });
            }
            var params = {
                input: this.forwardPayload,
            };
            var payload = { params: encodeURIComponent(JSON.stringify(params)) };
            this.loader.showLoading();
            this.adapter
                .processPostRequest("/adapters/BPM/resource/performActionOnTask", payload)
                .then(function (response) {
                _this.isDOPRouteVerified =
                    _this.taskVariables.DOP_Route_VerifiedBy &&
                        _this.taskVariables.DOP_Route_VerifiedBy != "none";
                _this.loader.dismissLoading();
                var message = "File submitted successfully";
                if (response.message) {
                    message = response.message;
                }
                else if (response.exception) {
                    message = response.exception;
                }
                if (response.isDOPRouteRequired) {
                    _this.showDOPRoutingValidationPrompt(action);
                }
                else if (response.status) {
                    _this.displayAlert(message, true);
                }
                else {
                    _this.displayAlert(message, false);
                }
            }, function (error) {
                _this.logger.debug(error);
                _this.loader.dismissLoading();
            });
        }
        else {
            this.navCtrl.push("ForwardPage", this.forwardPayload);
        }
    };
    ApprovalPage.prototype.displayAlert = function (alertText, goToInbox) {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: alertText,
            buttons: [
                {
                    text: "OK",
                    handler: function () {
                        alert.dismiss();
                        if (goToInbox) {
                            _this.goToInbox();
                        }
                        return false;
                    },
                },
            ],
        });
        alert.present();
    };
    ApprovalPage.prototype.reorderItems = function (indexes) {
        var tempList = Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* reorderArray */])(this.predefinedUsersList, indexes);
        var filteredList = tempList.filter(function (value, index) {
            if (index != 0) {
                return tempList[index - 1].empNo !== value.empNo;
            }
            return true;
        });
        this.predefinedUsersList = filteredList;
    };
    ApprovalPage.prototype.removeUserFromList = function (index) {
        this.predefinedUsersList.splice(index, 1);
    };
    ApprovalPage.prototype.addUserToTheList = function () {
        this.isAddingUser = true;
    };
    ApprovalPage.prototype.addSelectedUserToThePath = function () {
        if (!this.selectedUser) {
            this.alert.showErrorMessage(728);
            return;
        }
        else if (this.predefinedUsersList.length &&
            this.selectedUser.empNo ==
                this.predefinedUsersList[this.predefinedUsersList.length - 1].empNo) {
            this.alert.showErrorMessage(729);
            return;
        }
        else {
            this.predefinedUsersList.push(this.selectedUser);
            this.selectedUser = null;
            this.employeeSearchResults = [];
            this.employeeSearchResultsUICopy = [];
            this.isAddingUser = false;
        }
    };
    ApprovalPage.prototype.filterUsers = function () {
        var _this = this;
        this.employeeSearchResultsUICopy = this.employeeSearchResults;
        var userSearchFilter = this.modalCtrl.create("UserSearchFilterPage", this.employeeSearchResults, {
            cssClass: "user-filter-modal",
            enableBackdropDismiss: false,
            showBackdrop: true,
        });
        userSearchFilter.onDidDismiss(function (filters) {
            if (filters) {
                _this.applyFilters(filters);
            }
        });
        userSearchFilter.present();
    };
    ApprovalPage.prototype.applyFilters = function (filters) {
        if (filters.selectedPlant) {
            this.employeeSearchResultsUICopy = this.employeeSearchResultsUICopy.filter(function (employee) { return employee.empPSA === filters.selectedPlant; });
        }
        if (filters.selectedDepartment) {
            this.employeeSearchResultsUICopy = this.employeeSearchResultsUICopy.filter(function (employee) { return employee.empDepartmentName === filters.selectedDepartment; });
        }
        if (filters.selectedDesignation) {
            this.employeeSearchResultsUICopy = this.employeeSearchResultsUICopy.filter(function (employee) { return employee.empDesignation === filters.selectedDesignation; });
        }
        if (this.employeeSearchResultsUICopy.length < 1) {
            this.alert.showErrorMessage(712);
            this.employeeSearchResultsUICopy = this.employeeSearchResults;
        }
    };
    ApprovalPage.prototype.search = function () {
        if (this.searchByKeyWord.length > 2) {
            var params = {
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
        }
        else {
            this.alert.showErrorMessage(709);
        }
    };
    ApprovalPage.prototype.searchUserByKeyword = function (params) {
        var _this = this;
        this.loader.showLoading();
        var payload = [
            {
                queryParamName: "params",
                queryParamValue: encodeURIComponent(JSON.stringify(params)),
            },
        ];
        this.adapter
            .processGetRequest("/adapters/BPM/resource/userSearch", payload)
            .then(function (response) {
            _this.loader.dismissLoading();
            if (response.data.data.results.items &&
                response.data.data.results.items.length) {
                _this.employeeSearchResults = response.data.data.results.items;
                _this.employeeSearchResultsUICopy = _this.employeeSearchResults;
                _this.selectedUser = null;
                _this.searchByKeyWord = "";
            }
            else {
                _this.alert.showErrorMessage(720);
            }
        }, function (error) {
            _this.loader.dismissLoading();
            _this.logger.debug(error);
        });
    };
    ApprovalPage.prototype.selectEmployeeToAdd = function (employee) {
        this.selectedUser = employee;
    };
    ApprovalPage.prototype.cancelUserSearch = function () {
        this.isAddingUser = false;
    };
    ApprovalPage.prototype.showDOPRoutingValidationPrompt = function (action) {
        var _this = this;
        var dopValidationPrompt = this.alertCtrl.create({
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
                    handler: function () {
                        dopValidationPrompt.dismiss();
                        return false;
                    },
                },
                {
                    text: "Proceed",
                    handler: function (data) {
                        if (data.length == 2) {
                            _this.isDOPRouteVerified = true;
                            _this.performAction(action);
                        }
                        else {
                            _this.displayAlert("Please ensure that you have verified both DOP and predefined path routing", false);
                        }
                        dopValidationPrompt.dismiss();
                        return false;
                    },
                },
            ],
        });
        dopValidationPrompt.present();
    };
    ApprovalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-approval",template:/*ion-inline-start:"/workspaces/PRADIP-MOBILE-IONIC/src/pages/approval/approval.html"*/'<ion-header>\n\n  <ion-navbar mode="ios" hideBackButton>\n\n    <button\n\n      ion-button\n\n      icon-only\n\n      clear\n\n      text-capitalize="false"\n\n      (click)="goToInbox()"\n\n    >\n\n      <ion-icon name="arrow-back"></ion-icon> <ion-label>Inbox</ion-label>\n\n    </button>\n\n    <ion-title mode="ios">Action</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div class="page-content" *ngIf="!hideApprovalWindow">\n\n    <ion-item class="comment-box" *ngIf="!isApprovedFile">\n\n      <ion-textarea\n\n        placeholder="Notesheet comments"\n\n        rows="6"\n\n        maxlength="400"\n\n        [(ngModel)]="notesheetComments"\n\n      ></ion-textarea>\n\n    </ion-item>\n\n\n\n    <ion-row justify-content-around>\n\n      <button\n\n        ion-button\n\n        round\n\n        color="primary"\n\n        *ngIf="!predefinedUsersList.length && !isApprovedFile"\n\n        (click)="performAction(\'Approve\')"\n\n      >\n\n        Approve\n\n      </button>\n\n\n\n      <button\n\n        ion-button\n\n        round\n\n        color="danger"\n\n        (click)="performAction(\'Reject\')"\n\n        *ngIf="!predefinedUsersList.length && !isApprovedFile"\n\n      >\n\n        Reject\n\n      </button>\n\n      <button\n\n        ion-button\n\n        round\n\n        color="secondary"\n\n        (click)="performAction(\'Forward\')"\n\n        *ngIf="predefinedUsersList.length"\n\n      >\n\n        Forward\n\n      </button>\n\n\n\n      <button\n\n        ion-button\n\n        round\n\n        color="primary"\n\n        *ngIf="!predefinedUsersList.length && isApprovedFile"\n\n        (click)="performAction(\'Close\')"\n\n      >\n\n        Close\n\n      </button>\n\n    </ion-row>\n\n\n\n    <ion-card>\n\n      <ion-card-header ion-item>\n\n        File Future Path\n\n        <button\n\n          item-end\n\n          ion-button\n\n          small\n\n          clear\n\n          icon-only\n\n          (click)="addUserToTheList()"\n\n        >\n\n          <ion-icon name="add" color="primary"></ion-icon>\n\n        </button>\n\n      </ion-card-header>\n\n      <ion-card-content no-padding>\n\n        <ion-row text-center *ngIf="!predefinedUsersList.length">\n\n          <ion-label>\n\n            You are the last user in the path. <br />\n\n            You can add users to the future path by clicking on \'+\' icon\n\n          </ion-label>\n\n        </ion-row>\n\n\n\n        <ion-list\n\n          *ngIf="predefinedUsersList.length"\n\n          reorder="true"\n\n          side="start"\n\n          (ionItemReorder)="reorderItems($event)"\n\n        >\n\n          <ion-item\n\n            detail-none\n\n            no-padding\n\n            *ngFor="let user of predefinedUsersList; let i = index"\n\n          >\n\n            <ion-label>\n\n              <!-- <h2>{{user.empNo}}</h2> -->\n\n              <h2>{{user.empFirstName + " " + user.empLastName}}</h2>\n\n              <p>{{user.empNo + " | " + user.empDesignation}}</p>\n\n            </ion-label>\n\n            <button\n\n              item-end\n\n              ion-button\n\n              small\n\n              clear\n\n              icon-only\n\n              (click)="removeUserFromList(i)"\n\n            >\n\n              <ion-icon name="close" color="danger"></ion-icon>\n\n            </button>\n\n          </ion-item>\n\n        </ion-list>\n\n      </ion-card-content>\n\n    </ion-card>\n\n\n\n    <div class="em-search" *ngIf="isAddingUser">\n\n      <ion-row no-padding justify-content-between>\n\n        <ion-label>Search By</ion-label>\n\n        <button\n\n          ion-button\n\n          clear\n\n          icon-only\n\n          color="danger"\n\n          text-capitalize="false"\n\n          (click)="cancelUserSearch()"\n\n        >\n\n          Cancel\n\n        </button>\n\n      </ion-row>\n\n      <ion-row class="radio-cls" radio-group [(ngModel)]="searchBy">\n\n        <ion-col class="radio-col" ion-item>\n\n          <ion-radio value="Employee Name" item-left mode="md"></ion-radio>\n\n          <ion-label text-wrap>Employee Name</ion-label>\n\n        </ion-col>\n\n        <ion-col class="radio-col" ion-item>\n\n          <ion-radio value="Employee Number" item-left mode="md"> </ion-radio>\n\n          <ion-label text-wrap>Employee Number</ion-label>\n\n        </ion-col>\n\n      </ion-row>\n\n      <form>\n\n        <ion-item class="user-search-box" lines="none">\n\n          <ion-input\n\n            placeholder="{{searchBy}}"\n\n            name="searchKeyword"\n\n            [(ngModel)]="searchByKeyWord"\n\n          ></ion-input>\n\n          <button\n\n            ion-button\n\n            type="submit"\n\n            item-right\n\n            icon-only\n\n            clear\n\n            (click)="search()"\n\n          >\n\n            <ion-icon name="search"></ion-icon>\n\n          </button>\n\n        </ion-item>\n\n      </form>\n\n\n\n      <ion-row>\n\n        <ion-col col-3 class="filter-col">\n\n          <button\n\n            ion-button\n\n            small\n\n            *ngIf="employeeSearchResultsUICopy.length > 1"\n\n            text-capitalize="false"\n\n            (click)="filterUsers()"\n\n          >\n\n            <ion-icon class="filter-icon" name="ios-funnel-outline"></ion-icon>\n\n            &nbsp;Filter\n\n          </button>\n\n        </ion-col>\n\n        <ion-col\n\n          col-9\n\n          *ngIf="employeeSearchResultsUICopy.length"\n\n          class="action-button-col"\n\n        >\n\n          <button\n\n            ion-button\n\n            round\n\n            color="primary"\n\n            (click)="addSelectedUserToThePath()"\n\n          >\n\n            Add\n\n          </button>\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n      <table\n\n        radio-group\n\n        *ngIf="employeeSearchResultsUICopy.length"\n\n        [(ngModel)]="selectedUser"\n\n        class="emp-table"\n\n      >\n\n        <thead>\n\n          <tr>\n\n            <th></th>\n\n            <th>Department</th>\n\n            <th>Emp Name</th>\n\n            <th>Designation</th>\n\n          </tr>\n\n        </thead>\n\n        <tbody>\n\n          <tr\n\n            *ngFor="let employee of employeeSearchResultsUICopy"\n\n            (click)="selectEmployeeToAdd(employee)"\n\n          >\n\n            <td><ion-radio mode="md" [value]="employee"></ion-radio></td>\n\n            <td>{{employee.empDepartmentName}}</td>\n\n            <td>{{employee.empFirstName + " " + employee.empLastName}}</td>\n\n            <td>{{employee.empDesignation}}</td>\n\n          </tr>\n\n        </tbody>\n\n      </table>\n\n\n\n      <ion-row\n\n        justify-content-end\n\n        *ngIf="employeeSearchResultsUICopy.length > 4"\n\n      >\n\n        <button\n\n          ion-button\n\n          round\n\n          color="primary"\n\n          (click)="addSelectedUserToThePath()"\n\n        >\n\n          Add\n\n        </button>\n\n      </ion-row>\n\n    </div>\n\n  </div>\n\n  <div\n\n    class="error-message"\n\n    justify-content-center\n\n    align-items-center\n\n    *ngIf="hideApprovalWindow"\n\n  >\n\n    <h3 text-center>{{oldTaskMessage}}</h3>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"/workspaces/PRADIP-MOBILE-IONIC/src/pages/approval/approval.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_2__providers_alert_alert__["a" /* AlertProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_adapter_calls_adapter_calls__["a" /* AdapterCallsProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_loader_loader__["a" /* LoaderProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_logger_logger__["a" /* LoggerProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]])
    ], ApprovalPage);
    return ApprovalPage;
}());

//# sourceMappingURL=approval.js.map

/***/ })

});
//# sourceMappingURL=14.js.map