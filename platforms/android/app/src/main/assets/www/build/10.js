webpackJsonp([10],{

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InboxPageModule", function() { return InboxPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__inbox__ = __webpack_require__(433);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var InboxPageModule = /** @class */ (function () {
    function InboxPageModule() {
    }
    InboxPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__inbox__["a" /* InboxPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__inbox__["a" /* InboxPage */])
            ],
        })
    ], InboxPageModule);
    return InboxPageModule;
}());

//# sourceMappingURL=inbox.module.js.map

/***/ }),

/***/ 433:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InboxPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_adapter_calls_adapter_calls__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_logger_logger__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_loader_loader__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_handler_auth_handler__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var InboxPage = /** @class */ (function () {
    function InboxPage(navCtrl, navParams, adapter, logger, loader, authHandler, alertController) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.adapter = adapter;
        this.logger = logger;
        this.loader = loader;
        this.authHandler = authHandler;
        this.alertController = alertController;
        this.tasksEmptyText = "Pull down to refresh";
        this.arrowIcons = {
            upEmpty: "../../assets/imgs/up-arrow.png",
            downFilled: "../../assets/imgs/fill-down-arrow.png",
            upFilled: "../../assets/imgs/fill-up-arrow.png",
            downEmpty: "../../assets/imgs/down-arrow.png",
        };
        this.sortArrows = {
            up: this.arrowIcons.upEmpty,
            down: this.arrowIcons.downFilled,
        };
        this.tasks = [];
        this.senders = [];
        this.filterBySenderValue = "";
        this.tasksUICopy = [];
        this.inboxCount = 0;
        this.firstTime = true;
        this.authenticatedUser = navParams.data;
        this.getDashboardVisibilities();
    }
    InboxPage.prototype.getDashboardVisibilities = function () {
        var _this = this;
        this.adapter
            .processGetRequest("/adapters/BPM/resource/getDashboardVisibilities", [])
            .then(function (response) {
            _this.userDashboardVisibility = response.data.data.dashboardVisibility;
        })
            .catch(function (error) {
            _this.logger.debug(error);
        });
    };
    InboxPage.prototype.ionViewDidEnter = function () {
        this.tasks = [];
        this.tasksUICopy = [];
        this.loadTasks();
    };
    InboxPage.prototype.loadTasks = function (infiniteScroll) {
        var _this = this;
        this.loader.showLoading();
        this.adapter
            .processGetRequest("/adapters/BPM/resource/getInbox/" + this.tasks.length, [], true)
            .then(function (response) {
            _this.loader.dismissLoading();
            _this.logger.debug(response);
            var resHeaders = response.responseHeaders;
            if (_this.firstTime && resHeaders.announcement) {
                _this.showAnnouncement(resHeaders.announcement);
                _this.firstTime = false;
            }
            var resJSON = response.responseJSON;
            _this.inboxCount = resJSON.data.totalCount;
            var tasks = resJSON.data.items;
            if (!tasks || tasks.length == 0) {
                _this.tasksEmptyText = "Inbox is empty";
            }
            else {
                (_a = _this.tasks).push.apply(_a, tasks);
                _this.senders = Array.from(new Set(_this.tasks.map(function (task) { return task.BD_SENT_BY; }))).slice();
                if (_this.filterBySenderValue) {
                    _this.filterBySender();
                }
                else {
                    (_b = _this.tasksUICopy).push.apply(_b, tasks);
                }
            }
            if (infiniteScroll) {
                infiniteScroll.complete();
            }
            var _a, _b;
        })
            .catch(function (error) {
            if (infiniteScroll) {
                infiniteScroll.complete();
            }
            _this.logger.debug(error);
            _this.loader.dismissLoading();
        });
    };
    InboxPage.prototype.showTaskDetails = function (task) {
        var _this = this;
        this.logger.debug(task);
        this.loader.showLoading();
        this.adapter
            .processGetRequest("/adapters/BPM/resource/getTaskDetails/" +
            task["TASK.TKIID"], [], true)
            .then(function (response) {
            _this.logger.debug(response);
            _this.loader.dismissLoading();
            var taskSubject = task.TAD_DISPLAY_NAME;
            var isApprovedFile = taskSubject.includes("Approved") ||
                taskSubject.includes("Rejected");
            var navData = {
                empNo: _this.authenticatedUser.id,
                taskDetails: response.responseJSON.data,
                taskId: task["TASK.TKIID"],
                oldTaskMessage: response.responseHeaders.oldtaskmessage,
                isApprovedFile: isApprovedFile,
            };
            _this.navCtrl.push("TaskDetailsPage", navData);
        }, function (error) {
            _this.logger.debug(error);
            _this.loader.dismissLoading();
        });
    };
    InboxPage.prototype.goToDashBoard = function () {
        this.navCtrl.push("DashboardPage", this.userDashboardVisibility);
    };
    InboxPage.prototype.showUserProfile = function () {
        var _this = this;
        this.loader.showLoading();
        this.adapter
            .processGetRequest("/adapters/userDetails/" + this.authenticatedUser.id, [])
            .then(function (response) {
            _this.loader.dismissLoading();
            _this.navCtrl.push("UserProfilePage", response);
        })
            .catch(function (error) {
            _this.loader.dismissLoading();
            _this.logger.debug(error);
        });
    };
    InboxPage.prototype.reverseSort = function () {
        this.loader.showLoading();
        if (this.sortArrows.up == this.arrowIcons.upEmpty) {
            this.logger.debug("Latest first");
            this.sortArrows.up = this.arrowIcons.upFilled;
            this.sortArrows.down = this.arrowIcons.downEmpty;
        }
        else {
            this.logger.debug("Latest last");
            this.sortArrows.up = this.arrowIcons.upEmpty;
            this.sortArrows.down = this.arrowIcons.downFilled;
        }
        this.tasksUICopy.reverse();
        this.loader.dismissLoading();
    };
    InboxPage.prototype.filterBySender = function () {
        var _this = this;
        if (this.filterBySenderValue) {
            this.tasksUICopy = this.tasks.filter(function (task) { return task.BD_SENT_BY === _this.filterBySenderValue; });
            this.logger.debug(this.tasksUICopy);
        }
    };
    InboxPage.prototype.clearFilters = function () {
        this.filterBySenderValue = "";
        this.tasksUICopy = this.tasks;
        this.logger.debug(this.tasksUICopy);
    };
    InboxPage.prototype.refreshTasks = function (event) {
        this.tasks = [];
        this.tasksUICopy = [];
        this.loadTasks(event);
    };
    InboxPage.prototype.logout = function () {
        var _this = this;
        var logoutCheckAlert = this.alertController.create({
            message: "Are you sure you want to logout?",
            buttons: [
                {
                    text: "NO",
                    role: "cancel",
                    handler: function () {
                        logoutCheckAlert.dismiss();
                        return false;
                    },
                },
                {
                    text: "YES",
                    handler: function () {
                        logoutCheckAlert.dismiss();
                        _this.authHandler.logout();
                        _this.navCtrl.setRoot("LdapLoginPage");
                        return false;
                    },
                },
            ],
        });
        logoutCheckAlert.present();
    };
    InboxPage.prototype.showAnnouncement = function (message) {
        var announcement = message.split("|");
        if (!announcement[0] || !announcement[1]) {
            return;
        }
        var announcementAlert = this.alertController.create({
            title: announcement[0],
            message: announcement[1],
            buttons: [
                {
                    text: "OK",
                    handler: function () {
                        announcementAlert.dismiss();
                        return false;
                    },
                },
            ],
        });
        announcementAlert.present();
    };
    InboxPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-inbox",template:/*ion-inline-start:"/workspaces/PRADIP-MOBILE-IONIC/src/pages/inbox/inbox.html"*/'<ion-header>\n\n  <ion-navbar mode="ios">\n\n    <ion-title text-center mode="ios">\n\n      PRADIP Mobile App\n\n    </ion-title>\n\n    <button\n\n      ion-button\n\n      icon-only\n\n      color="danger"\n\n      text-right\n\n      clear\n\n      class="logout-button"\n\n      (click)="logout()"\n\n    >\n\n      <ion-icon name="power"></ion-icon>\n\n    </button>\n\n  </ion-navbar>\n\n\n\n  <ion-row align-items-center>\n\n    <ion-col>\n\n      <ion-row align-items-center>\n\n        <button ion-button icon-only clear (click)="showUserProfile()">\n\n          <ion-icon name="contact"></ion-icon>\n\n        </button>\n\n        <ion-label class="wlcomcls"\n\n          >Welcome,<br />\n\n          {{authenticatedUser? authenticatedUser.displayName: ""}}</ion-label\n\n        >\n\n      </ion-row>\n\n    </ion-col>\n\n\n\n    <button class="dashboard-button" ion-button (click)="goToDashBoard()">\n\n      Dashboard\n\n    </button>\n\n  </ion-row>\n\n  <ion-row justify-content-between class="headerrowcls">\n\n    <ion-col ion-item class="selctcls" col-3>\n\n      <ion-select\n\n        *ngIf="senders.length > 1"\n\n        placeholder="Sent By"\n\n        [(ngModel)]="filterBySenderValue"\n\n        (ionChange)="filterBySender()"\n\n        cancelText="Clear"\n\n        (ionCancel)="clearFilters()"\n\n      >\n\n        <ion-option *ngFor="let sender of senders" [value]="sender">\n\n          {{sender}}\n\n        </ion-option>\n\n      </ion-select>\n\n    </ion-col>\n\n    <ion-col col-7>\n\n      <h3>\n\n        Office Note - Inbox({{inboxCount}})\n\n      </h3>\n\n    </ion-col>\n\n    <ion-col col-2>\n\n      <div\n\n        class="sorting-arrows"\n\n        (click)="reverseSort()"\n\n        *ngIf="tasksUICopy.length > 1"\n\n      >\n\n        <span class="up-arrow"><img [src]="sortArrows.up"/></span>\n\n        <span class="down-arrow"><img [src]="sortArrows.down"/></span>\n\n      </div>\n\n    </ion-col>\n\n  </ion-row>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="refreshTasks($event)"> </ion-refresher>\n\n\n\n  <ion-row text-center *ngIf="!tasksUICopy.length">\n\n    <ion-label>{{tasksEmptyText}}</ion-label>\n\n  </ion-row>\n\n\n\n  <ion-list>\n\n    <ion-item *ngFor="let task of tasksUICopy" (click)="showTaskDetails(task)">\n\n      <p class="txt-right datecls">\n\n        {{task.ACTIVATED | date: "dd/MM/yyyy HH:mm"}}\n\n      </p>\n\n      <h5>{{task.PI_NAME}}</h5>\n\n      <p>{{task.TAD_DISPLAY_NAME}}</p>\n\n      <p>{{task.BDFILE_NUMBER}}</p>\n\n\n\n      <p class="txt-right">Sent By: {{task.BD_SENT_BY}}</p>\n\n    </ion-item>\n\n  </ion-list>\n\n  <ion-infinite-scroll (ionInfinite)="loadTasks($event)">\n\n    <ion-infinite-scroll-content\n\n      loadingSpinner="bubbles"\n\n      loadingText="Loading more tasks..."\n\n    ></ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n</ion-content>\n\n'/*ion-inline-end:"/workspaces/PRADIP-MOBILE-IONIC/src/pages/inbox/inbox.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_adapter_calls_adapter_calls__["a" /* AdapterCallsProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_logger_logger__["a" /* LoggerProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_loader_loader__["a" /* LoaderProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_auth_handler_auth_handler__["a" /* AuthHandlerProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], InboxPage);
    return InboxPage;
}());

//# sourceMappingURL=inbox.js.map

/***/ })

});
//# sourceMappingURL=10.js.map