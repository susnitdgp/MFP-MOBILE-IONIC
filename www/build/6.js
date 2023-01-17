webpackJsonp([6],{

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskDetailsPageModule", function() { return TaskDetailsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__task_details__ = __webpack_require__(437);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TaskDetailsPageModule = /** @class */ (function () {
    function TaskDetailsPageModule() {
    }
    TaskDetailsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__task_details__["a" /* TaskDetailsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__task_details__["a" /* TaskDetailsPage */]),
            ]
        })
    ], TaskDetailsPageModule);
    return TaskDetailsPageModule;
}());

//# sourceMappingURL=task-details.module.js.map

/***/ }),

/***/ 437:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TaskDetailsPage = /** @class */ (function () {
    function TaskDetailsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.metaDataRoot = "MetaDataPage";
        this.filesRoot = "FilesPage";
        this.actionHistoryRoot = "ActionHistoryPage";
        this.approvalRoot = "ApprovalPage";
        this.taskDetails = this.navParams.data.taskDetails;
        this.empNo = this.navParams.data.empNo;
        this.taskId = this.navParams.data.taskId;
        this.oldTaskMessage = this.navParams.data.oldTaskMessage;
        this.isApprovedFile = this.navParams.data.isApprovedFile;
    }
    TaskDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-task-details",template:/*ion-inline-start:"/workspaces/PRADIP-MOBILE-IONIC/src/pages/task-details/task-details.html"*/'<!-- https://medium.com/@alexandrubereghici/ionic-the-easy-and-the-right-way-to-add-custom-icons-b15330a2173b -->\n<ion-tabs tabsPlacement="top">\n  <ion-tab\n    [root]="metaDataRoot"\n    [rootParams]="taskDetails"\n    tabTitle="Meta data"\n    tabIcon="custom-meta-data"\n  ></ion-tab>\n  <ion-tab\n    [root]="filesRoot"\n    tabTitle="Files"\n    [rootParams]="taskDetails"\n    tabIcon="custom-files"\n  ></ion-tab>\n  <ion-tab\n    [root]="actionHistoryRoot"\n    tabTitle="Action history"\n    [rootParams]="taskDetails"\n    tabIcon="custom-action-history"\n  ></ion-tab>\n  <ion-tab\n    [root]="approvalRoot"\n    tabTitle="Action"\n    [rootParams]="{taskDetails: taskDetails, empNo: empNo, taskId: taskId, oldTaskMessage: oldTaskMessage, isApprovedFile: isApprovedFile}"\n    tabIcon="custom-approval"\n  ></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/workspaces/PRADIP-MOBILE-IONIC/src/pages/task-details/task-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], TaskDetailsPage);
    return TaskDetailsPage;
}());

//# sourceMappingURL=task-details.js.map

/***/ })

});
//# sourceMappingURL=6.js.map