webpackJsonp([5],{

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TermsAndConditionsPageModule", function() { return TermsAndConditionsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__terms_and_conditions__ = __webpack_require__(438);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TermsAndConditionsPageModule = /** @class */ (function () {
    function TermsAndConditionsPageModule() {
    }
    TermsAndConditionsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__terms_and_conditions__["a" /* TermsAndConditionsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__terms_and_conditions__["a" /* TermsAndConditionsPage */]),
            ],
        })
    ], TermsAndConditionsPageModule);
    return TermsAndConditionsPageModule;
}());

//# sourceMappingURL=terms-and-conditions.module.js.map

/***/ }),

/***/ 438:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TermsAndConditionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_handler_auth_handler__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_adapter_calls_adapter_calls__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_loader_loader__ = __webpack_require__(102);
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






var TermsAndConditionsPage = /** @class */ (function () {
    function TermsAndConditionsPage(navCtrl, navParams, authHandler, adapter, loader, alert) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authHandler = authHandler;
        this.adapter = adapter;
        this.loader = loader;
        this.alert = alert;
        this.termsAndConditions = {};
        if (navParams && navParams.data) {
            this.termsAndConditions = navParams.data.termsAndConditions;
            console.log(this.termsAndConditions);
            this.authenticatedUser = navParams.data.user;
            this.showButtons = navParams.data.showButtons;
        }
        else {
        }
    }
    TermsAndConditionsPage.prototype.ionViewDidLoad = function () {
        this.loader.dismissLoading();
    };
    TermsAndConditionsPage.prototype.logout = function () {
        this.authHandler.logout();
        this.navCtrl.setRoot("LdapLoginPage");
    };
    TermsAndConditionsPage.prototype.updateUserConcent = function (userConsent) {
        var _this = this;
        if (userConsent) {
            this.loader.showLoading();
            this.adapter
                .callUnprotectedAdapterResource("/adapters/MobilitySMSAdapter/resource/termsAccept?empnum=" +
                this.authenticatedUser.id)
                .then(function (response) {
                if (response.responseText == "SUCCESS") {
                    _this.loader.dismissLoading();
                    _this.navCtrl.setRoot("InboxPage", _this.authenticatedUser);
                }
                else {
                    _this.alert.showErrorMessage(706);
                }
            })
                .catch(function (error) {
                _this.loader.dismissLoading();
                _this.alert.showErrorMessage(706);
            });
        }
        else {
            this.logout();
        }
    };
    TermsAndConditionsPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    TermsAndConditionsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-terms-and-conditions",template:/*ion-inline-start:"/workspaces/PRADIP-MOBILE-IONIC/src/pages/terms-and-conditions/terms-and-conditions.html"*/'<ion-header>\n\n  <ion-navbar mode="ios" hideBackButton>\n\n    <button ion-button icon-only clear *ngIf="!showButtons" (click)="goBack()">\n\n      <ion-icon name="arrow-back"></ion-icon>\n\n    </button>\n\n    <ion-title text-center mode="ios">\n\n      PRADIP Mobile App\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n  <h2><ion-icon name="list-box"></ion-icon> Terms And Conditions</h2>\n\n  <div class="terms-main">\n\n    <p [innerHTML]="termsAndConditions"></p>\n\n  </div>\n\n  <div class="terms-btns" *ngIf="showButtons">\n\n    <button\n\n      class="btn-disagree-cls"\n\n      color="danger"\n\n      outline\n\n      ion-button\n\n      (click)="updateUserConcent(false)"\n\n    >\n\n      Disagree\n\n    </button>\n\n    <button\n\n      class="btn-agree-cls"\n\n      color="primary"\n\n      outline\n\n      ion-button\n\n      (click)="updateUserConcent(true)"\n\n    >\n\n      I Agree\n\n    </button>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"/workspaces/PRADIP-MOBILE-IONIC/src/pages/terms-and-conditions/terms-and-conditions.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_auth_handler_auth_handler__["a" /* AuthHandlerProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_adapter_calls_adapter_calls__["a" /* AdapterCallsProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_loader_loader__["a" /* LoaderProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_alert_alert__["a" /* AlertProvider */]])
    ], TermsAndConditionsPage);
    return TermsAndConditionsPage;
}());

//# sourceMappingURL=terms-and-conditions.js.map

/***/ })

});
//# sourceMappingURL=5.js.map