webpackJsonp([4],{

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserProfilePageModule", function() { return UserProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_profile__ = __webpack_require__(439);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var UserProfilePageModule = /** @class */ (function () {
    function UserProfilePageModule() {
    }
    UserProfilePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__user_profile__["a" /* UserProfilePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__user_profile__["a" /* UserProfilePage */]),
            ],
        })
    ], UserProfilePageModule);
    return UserProfilePageModule;
}());

//# sourceMappingURL=user-profile.module.js.map

/***/ }),

/***/ 439:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_adapter_calls_adapter_calls__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loader_loader__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_logger_logger__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UserProfilePage = /** @class */ (function () {
    function UserProfilePage(navCtrl, navParams, adapter, loader, logger) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.adapter = adapter;
        this.loader = loader;
        this.logger = logger;
        this.userDetails = {};
        this.userDetails = navParams.data;
    }
    UserProfilePage.prototype.goToInbox = function () {
        this.navCtrl.pop();
    };
    UserProfilePage.prototype.showTermsAndConditions = function () {
        var _this = this;
        this.loader.showLoading();
        this.adapter
            .callUnprotectedAdapterResource("/adapters/MobilitySMSAdapter/resource/terms")
            .then(function (response) {
            _this.loader.dismissLoading();
            var navData = {
                termsAndConditions: response.responseText,
                showButtons: false
            };
            _this.navCtrl.push("TermsAndConditionsPage", navData);
        })
            .catch(function (error) {
            _this.loader.dismissLoading();
            _this.logger.debug(error);
        });
    };
    UserProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-user-profile",template:/*ion-inline-start:"/workspaces/PRADIP-MOBILE-IONIC/src/pages/user-profile/user-profile.html"*/'<ion-header>\n\n  <ion-navbar mode="ios" hideBackButton>\n\n    <button\n\n      ion-button\n\n      icon-only\n\n      clear\n\n      text-capitalize="false"\n\n      (click)="goToInbox()"\n\n    >\n\n      <ion-icon name="arrow-back"></ion-icon> <ion-label>Inbox</ion-label>\n\n    </button>\n\n    <ion-title mode="ios">PRADIP Mobile App</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div class="emtycls"></div>\n\n  <div class="userprofile">\n\n    <div class="user-icon"></div>\n\n\n\n    <ion-row class="mar-top"\n\n      ><ion-col>Employee Name:</ion-col\n\n      ><ion-col\n\n        >{{userDetails.firstName + " " + userDetails.lastName}}</ion-col\n\n      ></ion-row\n\n    >\n\n    <ion-row\n\n      ><ion-col>Employee Number:</ion-col\n\n      ><ion-col>{{userDetails.employeeNumber}}</ion-col></ion-row\n\n    >\n\n    <ion-row\n\n      ><ion-col>Mobile Number:</ion-col\n\n      ><ion-col>{{userDetails.phoneNumber}}</ion-col></ion-row\n\n    >\n\n    <ion-row\n\n      ><ion-col>Department:</ion-col\n\n      ><ion-col>{{userDetails.department}}</ion-col></ion-row\n\n    >\n\n    <ion-row\n\n      ><ion-col>Designation:</ion-col\n\n      ><ion-col>{{userDetails.designation}}</ion-col></ion-row\n\n    >\n\n    <ion-row\n\n      ><ion-col>Plant:</ion-col\n\n      ><ion-col>{{userDetails.location}}</ion-col></ion-row\n\n    >\n\n    <ion-row\n\n      ><ion-col>E-mail:</ion-col\n\n      ><ion-col>{{userDetails.email}}</ion-col></ion-row\n\n    >\n\n  </div>\n\n</ion-content>\n\n<ion-footer text-center class="terms-footer">\n\n  <ion-label color="primary" (click)="showTermsAndConditions()"\n\n    >Terms and Conditions</ion-label\n\n  >\n\n</ion-footer>\n\n'/*ion-inline-end:"/workspaces/PRADIP-MOBILE-IONIC/src/pages/user-profile/user-profile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_adapter_calls_adapter_calls__["a" /* AdapterCallsProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_loader_loader__["a" /* LoaderProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_logger_logger__["a" /* LoggerProvider */]])
    ], UserProfilePage);
    return UserProfilePage;
}());

//# sourceMappingURL=user-profile.js.map

/***/ })

});
//# sourceMappingURL=4.js.map