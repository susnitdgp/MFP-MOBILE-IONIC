webpackJsonp([8],{

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetaDataPageModule", function() { return MetaDataPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__meta_data__ = __webpack_require__(435);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MetaDataPageModule = /** @class */ (function () {
    function MetaDataPageModule() {
    }
    MetaDataPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__meta_data__["a" /* MetaDataPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__meta_data__["a" /* MetaDataPage */]),
            ],
        })
    ], MetaDataPageModule);
    return MetaDataPageModule;
}());

//# sourceMappingURL=meta-data.module.js.map

/***/ }),

/***/ 435:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MetaDataPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_logger_logger__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loader_loader__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_adapter_calls_adapter_calls__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_alert_alert__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MetaDataPage = /** @class */ (function () {
    function MetaDataPage(navCtrl, navParams, app, logger, loader, adapter, alert) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.app = app;
        this.logger = logger;
        this.loader = loader;
        this.adapter = adapter;
        this.alert = alert;
        this.showDopTable = false;
        this.taskDetails = this.navParams.data;
        this.taskVariables = this.taskDetails.data.variables;
        this.metaData = this.taskVariables.metaData;
        if (!this.metaData) {
            this.alert.showErrorMessage(725);
            this.goToInbox();
        }
        this.logger.debug("Nav Params", this.taskDetails);
    }
    MetaDataPage.prototype.ionViewDidLoad = function () { };
    MetaDataPage.prototype.goToInbox = function () {
        var root = this.app.getRootNav();
        root.popToRoot();
    };
    MetaDataPage.prototype.displayDOPTable = function () {
        this.showDopTable = true;
    };
    MetaDataPage.prototype.showDOP = function (dop) {
        var _this = this;
        var params = {
            data: dop.selectedDOP.page_id,
        };
        var payload = [
            {
                queryParamName: "params",
                queryParamValue: encodeURIComponent(JSON.stringify(params)),
            },
        ];
        this.loader.showLoading();
        this.adapter
            .processGetRequest("/adapters/BPM/resource/getDOPContent", payload)
            .then(function (response) {
            var dopContent = response.data.data.results;
            _this.openDOP(dopContent);
            _this.loader.dismissLoading();
        }, function (error) {
            _this.logger.debug(error);
            _this.loader.dismissLoading();
        });
    };
    MetaDataPage.prototype.openDOP = function (dopContent) {
        var navParams = { dopContent: dopContent };
        this.navCtrl.push("DopPage", navParams);
    };
    MetaDataPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-meta-data",template:/*ion-inline-start:"/workspaces/PRADIP-MOBILE-IONIC/src/pages/meta-data/meta-data.html"*/'<ion-header>\n\n  <ion-navbar mode="ios" hideBackButton>\n\n    <button\n\n      ion-button\n\n      icon-only\n\n      clear\n\n      text-capitalize="false"\n\n      (click)="goToInbox()"\n\n    >\n\n      <ion-icon name="arrow-back"></ion-icon> <ion-label>Inbox</ion-label>\n\n    </button>\n\n    <ion-title mode="ios">Meta Data</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div class="contentcls">\n\n    <p>{{taskDetails.displayName}}</p>\n\n    <ul class="listcls" *ngIf="metaData">\n\n      <li>File Number: {{metaData.fileNumber? metaData.fileNumber: ""}}</li>\n\n      <li>File Subject: {{metaData.fileSubject? metaData.fileSubject: ""}}</li>\n\n      <li>\n\n        File Category: {{metaData.fileCategory? metaData.fileCategory: ""}}\n\n      </li>\n\n      <li>\n\n        Priority of File: {{metaData.filePriority? metaData.filePriority: ""}}\n\n      </li>\n\n      <li>\n\n        Target Date: {{metaData.fileTargetDate | date: "dd/MM/yyyy HH:mm" }}\n\n      </li>\n\n\n\n      <li\n\n        *ngIf="taskVariables.DOP_Route_VerifiedBy && taskVariables.DOP_Route_VerifiedBy != \'none\'"\n\n      >\n\n        DOP and File Routing Verified By: {{taskVariables.DOP_Route_VerifiedBy}}\n\n      </li>\n\n\n\n      <li *ngIf="metaData.DOP_Applicable">\n\n        DOP: {{metaData.DOP_Applicable}}\n\n      </li>\n\n\n\n      <ion-label\n\n        class="dop-reason"\n\n        *ngIf=" metaData.DOP_Applicable == \'No\' && metaData.DOP_Reason"\n\n        >{{metaData.DOP_Reason}}</ion-label\n\n      >\n\n\n\n      <ion-grid class="dop-table" *ngIf="metaData.DOP_Applicable == \'Yes\'">\n\n        <ion-row>\n\n          <ion-col col-3>Clause</ion-col>\n\n          <ion-col col-3>Approving Authority</ion-col>\n\n          <ion-col col-3>Added By</ion-col>\n\n          <ion-col col-3></ion-col>\n\n        </ion-row>\n\n        <ion-row *ngFor="let item of metaData.selectedDOP.items">\n\n          <ion-col col-3>{{item.showDOP}}</ion-col>\n\n          <ion-col col-3>{{item.approvingAuthority}}</ion-col>\n\n          <ion-col col-3>{{item.addedBy}}</ion-col>\n\n          <ion-col col-3 align-content-center>\n\n            <button ion-button small primary round (click)="showDOP(item)">\n\n              View\n\n            </button>\n\n          </ion-col>\n\n        </ion-row>\n\n      </ion-grid>\n\n    </ul>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"/workspaces/PRADIP-MOBILE-IONIC/src/pages/meta-data/meta-data.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_2__providers_logger_logger__["a" /* LoggerProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_loader_loader__["a" /* LoaderProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_adapter_calls_adapter_calls__["a" /* AdapterCallsProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_alert_alert__["a" /* AlertProvider */]])
    ], MetaDataPage);
    return MetaDataPage;
}());

//# sourceMappingURL=meta-data.js.map

/***/ })

});
//# sourceMappingURL=8.js.map