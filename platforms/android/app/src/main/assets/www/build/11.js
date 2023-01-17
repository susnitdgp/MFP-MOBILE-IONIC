webpackJsonp([11],{

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForwardPageModule", function() { return ForwardPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__forward__ = __webpack_require__(432);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ForwardPageModule = /** @class */ (function () {
    function ForwardPageModule() {
    }
    ForwardPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__forward__["a" /* ForwardPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__forward__["a" /* ForwardPage */]),
            ],
        })
    ], ForwardPageModule);
    return ForwardPageModule;
}());

//# sourceMappingURL=forward.module.js.map

/***/ }),

/***/ 432:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForwardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_adapter_calls_adapter_calls__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_alert_alert__ = __webpack_require__(52);
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






var ForwardPage = /** @class */ (function () {
    function ForwardPage(navCtrl, navParams, adapter, alert, loader, modalCtrl, alertCtrl, app, logger) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.adapter = adapter;
        this.alert = alert;
        this.loader = loader;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.logger = logger;
        this.searchBy = "Employee Name";
        this.searchByKeyWord = "";
        this.employeeSearchResults = [];
        this.employeeSearchResultsUICopy = [];
        this.forwardPayload = this.navParams.data;
    }
    ForwardPage.prototype.search = function () {
        if (this.searchByKeyWord.length > 2) {
            var params = {
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
        }
        else {
            this.alert.showErrorMessage(709);
        }
    };
    ForwardPage.prototype.searchUserByKeyword = function (params) {
        var _this = this;
        this.loader.showLoading();
        var payload = [
            {
                queryParamName: "params",
                queryParamValue: encodeURIComponent(JSON.stringify(params))
            }
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
            }
            else {
                _this.alert.showErrorMessage(720);
            }
        }, function (error) {
            _this.loader.dismissLoading();
            _this.logger.debug(error);
        });
    };
    ForwardPage.prototype.filterUsers = function () {
        var _this = this;
        this.employeeSearchResultsUICopy = this.employeeSearchResults;
        var userSearchFilter = this.modalCtrl.create("UserSearchFilterPage", this.employeeSearchResults, {
            cssClass: "user-filter-modal",
            enableBackdropDismiss: false,
            showBackdrop: true
        });
        userSearchFilter.onDidDismiss(function (filters) {
            if (filters) {
                _this.applyFilters(filters);
            }
        });
        userSearchFilter.present();
    };
    ForwardPage.prototype.applyFilters = function (filters) {
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
    ForwardPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    ForwardPage.prototype.performAction = function () {
        var _this = this;
        if (this.selectedUser) {
            this.forwardPayload.toUserId = this.selectedUser.empNo;
            var params = {
                input: this.forwardPayload
            };
            var payload = { params: encodeURIComponent(JSON.stringify(params)) };
            this.loader.showLoading();
            this.adapter
                .processPostRequest("/adapters/BPM/resource/performActionOnTask", payload)
                .then(function (response) {
                _this.loader.dismissLoading();
                var message = "File submitted successfully";
                if (response.message) {
                    message = response.message;
                }
                else if (response.exception) {
                    message = response.exception;
                }
                if (response.status) {
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
            this.alert.showErrorMessage(713);
        }
    };
    ForwardPage.prototype.displayAlert = function (alertText, goToInbox) {
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
                    }
                }
            ]
        });
        alert.present();
    };
    ForwardPage.prototype.goToInbox = function () {
        var root = this.app.getRootNav();
        root.popToRoot();
    };
    ForwardPage.prototype.getSubmitButtonClass = function () {
        var className = "primary";
        if (this.forwardPayload.actionName == "Forward") {
            className = "secondary";
        }
        else if (this.forwardPayload.actionName == "Reject") {
            className = "danger";
        }
        return className;
    };
    ForwardPage.prototype.selectEmployeeToAdd = function (employee) {
        this.selectedUser = employee;
    };
    ForwardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-forward",template:/*ion-inline-start:"/workspaces/PRADIP-MOBILE-IONIC/src/pages/forward/forward.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Back</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div class="contentcls">\n\n    <ion-item no-padding>\n\n      <ion-textarea\n\n        placeholder="Notesheet comments"\n\n        rows="6"\n\n        maxlength="400"\n\n        [(ngModel)]="forwardPayload.comments"\n\n      ></ion-textarea>\n\n    </ion-item>\n\n\n\n    <div class="em-search">\n\n      <ion-label>Search By</ion-label>\n\n      <ion-row class="radio-cls" radio-group [(ngModel)]="searchBy">\n\n        <ion-col class="radio-col" ion-item>\n\n          <ion-radio value="Employee Name" item-left mode="md"></ion-radio>\n\n          <ion-label text-wrap>Employee Name</ion-label>\n\n        </ion-col>\n\n        <ion-col class="radio-col" ion-item>\n\n          <ion-radio value="Employee Number" item-left mode="md"> </ion-radio>\n\n          <ion-label text-wrap>Employee Number</ion-label>\n\n        </ion-col>\n\n      </ion-row>\n\n      <form>\n\n        <ion-item class="user-search-box" lines="none">\n\n          <ion-input\n\n            placeholder="{{searchBy}}"\n\n            name="searchKeyword"\n\n            [(ngModel)]="searchByKeyWord"\n\n          ></ion-input>\n\n          <button\n\n            ion-button\n\n            type="submit"\n\n            item-right\n\n            icon-only\n\n            clear\n\n            (click)="search()"\n\n          >\n\n            <ion-icon name="search"></ion-icon>\n\n          </button>\n\n        </ion-item>\n\n      </form>\n\n    </div>\n\n\n\n    <ion-row>\n\n      <ion-col col-3 class="filter-col">\n\n        <button\n\n          ion-button\n\n          small\n\n          *ngIf="employeeSearchResultsUICopy.length > 1"\n\n          text-capitalize="false"\n\n          (click)="filterUsers()"\n\n        >\n\n          <ion-icon class="filter-icon" name="ios-funnel-outline"></ion-icon>\n\n          &nbsp;Filter\n\n        </button>\n\n      </ion-col>\n\n      <ion-col\n\n        col-9\n\n        *ngIf="employeeSearchResultsUICopy.length"\n\n        class="action-button-col"\n\n      >\n\n        <button\n\n          ion-button\n\n          round\n\n          color="{{getSubmitButtonClass()}}"\n\n          (click)="performAction()"\n\n        >\n\n          {{forwardPayload.actionName}}\n\n        </button>\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n    <table\n\n      radio-group\n\n      *ngIf="employeeSearchResultsUICopy.length"\n\n      [(ngModel)]="selectedUser"\n\n      class="emp-table"\n\n    >\n\n      <thead>\n\n        <tr>\n\n          <th></th>\n\n          <th>Department</th>\n\n          <th>Emp Name</th>\n\n          <th>Designation</th>\n\n        </tr>\n\n      </thead>\n\n      <tbody>\n\n        <tr\n\n          *ngFor="let employee of employeeSearchResultsUICopy"\n\n          (click)="selectEmployeeToAdd(employee)"\n\n        >\n\n          <td><ion-radio mode="md" [value]="employee"></ion-radio></td>\n\n          <td>{{employee.empDepartmentName}}</td>\n\n          <td>{{employee.empFirstName + " " + employee.empLastName}}</td>\n\n          <td>{{employee.empDesignation}}</td>\n\n        </tr>\n\n      </tbody>\n\n    </table>\n\n\n\n    <ion-row justify-content-end *ngIf="employeeSearchResultsUICopy.length > 4">\n\n      <!-- <button ion-button round color="danger" (click)="goBack()">Cancel</button> -->\n\n      <button\n\n        ion-button\n\n        round\n\n        color="{{getSubmitButtonClass()}}"\n\n        (click)="performAction()"\n\n      >\n\n        {{forwardPayload.actionName}}\n\n      </button>\n\n    </ion-row>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"/workspaces/PRADIP-MOBILE-IONIC/src/pages/forward/forward.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_adapter_calls_adapter_calls__["a" /* AdapterCallsProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_alert_alert__["a" /* AlertProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_loader_loader__["a" /* LoaderProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_5__providers_logger_logger__["a" /* LoggerProvider */]])
    ], ForwardPage);
    return ForwardPage;
}());

//# sourceMappingURL=forward.js.map

/***/ })

});
//# sourceMappingURL=11.js.map