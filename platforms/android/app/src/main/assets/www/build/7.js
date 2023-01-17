webpackJsonp([7],{

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OtpLoginPageModule", function() { return OtpLoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__otp_login__ = __webpack_require__(436);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var OtpLoginPageModule = /** @class */ (function () {
    function OtpLoginPageModule() {
    }
    OtpLoginPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__otp_login__["a" /* OtpLoginPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__otp_login__["a" /* OtpLoginPage */]),
            ],
        })
    ], OtpLoginPageModule);
    return OtpLoginPageModule;
}());

//# sourceMappingURL=otp-login.module.js.map

/***/ }),

/***/ 436:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OtpLoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_adapter_calls_adapter_calls__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_logger_logger__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_loader_loader__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth_handler_auth_handler__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_alert_alert__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var OtpLoginPage = /** @class */ (function () {
    function OtpLoginPage(navCtrl, navParams, adapter, authHandler, logger, loader, alert, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.adapter = adapter;
        this.authHandler = authHandler;
        this.logger = logger;
        this.loader = loader;
        this.alert = alert;
        this.platform = platform;
        this.otp = ["", "", "", ""];
        this.numberOfResendOTPTries = 0;
        this.disableButtons = true;
        this.resendOTPButtonText = "Resend OTP";
        if (this.platform.is("android")) {
            this.startListeningSMS();
        }
        this.authenticatedUser = navParams.data;
        this.userId = this.authenticatedUser.id;
        this.otpForm = new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["b" /* FormGroup */]({
            otp1: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormControl */]("", [
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].pattern("[0-9]"),
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].minLength(1),
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].maxLength(1),
            ]),
            otp2: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormControl */]("", [
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].pattern("[0-9]"),
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].minLength(1),
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].maxLength(1),
            ]),
            otp3: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormControl */]("", [
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].pattern("[0-9]"),
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].minLength(1),
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].maxLength(1),
            ]),
            otp4: new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormControl */]("", [
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].pattern("[0-9]"),
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].minLength(1),
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["g" /* Validators */].maxLength(1),
            ]),
        });
    }
    OtpLoginPage.prototype.startListeningSMS = function () {
        var _this = this;
        try {
            var smsRetriever = window.cordova.plugins.smsRetriever;
            // smsRetriever["getAppHash"](
            //   (res) => {
            //     // this.appHashString = res;
            //     console.log("App Hash", res);
            //   },
            //   (err) => {
            //     console.warn(err);
            //   }
            // );
            // SMSReceive.startWatch(
            //   () => {
            //     document.addEventListener("onSMSArrive", (sms: any) => {
            //       const incomingSMS = sms.data;
            //       this.processSMS(incomingSMS);
            //     });
            //   },
            //   () => {
            //     this.logger.debug("watch start failed");
            //   }
            // );
            // const smsRetriever: any = window.cordova.plugins.smsRetriever;
            smsRetriever["startWatching"](function (res) {
                _this.processSMS(res);
            }, function (err) {
                console.warn(err);
            });
        }
        catch (error) {
            this.logger.debug(error);
        }
    };
    OtpLoginPage.prototype.stopListeningSMS = function () {
        // try {
        //   SMSReceive.stopWatch(
        //     () => {
        //       this.logger.debug("watch stopped");
        //     },
        //     () => {
        //       this.logger.debug("watch stop failed");
        //     }
        //   );
        // } catch (error) {
        //   this.logger.debug(error);
        // }
    };
    OtpLoginPage.prototype.processSMS = function (sms) {
        try {
            var smsBody = sms.Message;
            var otp = smsBody.slice(4, 8);
            if (!isNaN(otp)) {
                var otpArray = otp.split("");
                this.otp = otpArray;
                this.validateOTP(true);
            }
        }
        catch (error) {
            this.logger.debug("Error detecting OTP");
        }
    };
    OtpLoginPage.prototype.ionViewDidLoad = function () {
        this.startTimer();
        this.startResendOTPTimer();
    };
    OtpLoginPage.prototype.validateOTP = function (preValidated) {
        var _this = this;
        if (!preValidated && !this.otpForm.valid) {
            this.alert.showErrorMessage(719);
            return;
        }
        var otp = this.otp.join("");
        if (otp && otp.length == 4 && !isNaN(otp)) {
            var params = {
                userId: this.userId,
                otp: otp,
            };
            this.loader.showLoading();
            this.adapter
                .processPostRequest("/adapters/otp/resource/validateOTP", params)
                .then(function (response) {
                if (response.isValid) {
                    _this.stopListeningSMS();
                    if (response.userConsent) {
                        _this.logger.debug(_this.navCtrl.getActive().name);
                        if (_this.navCtrl.getActive().name == "OtpLoginPage") {
                            _this.navCtrl.popToRoot();
                            _this.navCtrl.setRoot("InboxPage", _this.authenticatedUser);
                        }
                    }
                    else {
                        var navData = {
                            termsAndConditions: response.termsAndConditionsData,
                            user: _this.authenticatedUser,
                            showButtons: true,
                        };
                        _this.navCtrl.popToRoot();
                        _this.navCtrl.setRoot("TermsAndConditionsPage", navData);
                    }
                }
                else {
                    _this.loader.dismissLoading();
                    _this.alert.showErrorMessage(707);
                }
            }, function (error) {
                _this.loader.dismissLoading();
                _this.logger.debug(error);
            });
        }
        else {
            if (otp.length != 4) {
                this.alert.showErrorMessage(703);
            }
            else {
                this.alert.showErrorMessage(719);
            }
        }
    };
    OtpLoginPage.prototype.otpInputController = function (event, nextElement, prevElement) {
        // if (event.target.value.length > 1) {
        //   let val = event.target.value.toString().slice(0, -1);
        //   event.target.value = parseInt(val);
        // }
        if (event.target.value.length < 1 && prevElement) {
            prevElement.setFocus();
        }
        else if (nextElement && event.target.value.length > 0) {
            nextElement.setFocus();
        }
        else {
            return 0;
        }
    };
    OtpLoginPage.prototype.goBack = function () {
        this.authHandler.logout();
        this.navCtrl.setRoot("LdapLoginPage");
    };
    OtpLoginPage.prototype.resendOTP = function () {
        var _this = this;
        this.loader.showLoading();
        this.adapter
            .callUnprotectedAdapterResource("/adapters/MobilitySMSAdapter/resource/sendOTP?empnum=" + this.userId)
            .then(function (response) {
            _this.loader.dismissLoading();
            _this.numberOfResendOTPTries++;
            _this.startResendOTPTimer();
            _this.alert.showErrorMessage(717);
        }, function (error) {
            _this.loader.dismissLoading();
            _this.alert.showErrorMessage(718);
            _this.logger.debug(error);
        });
    };
    OtpLoginPage.prototype.startTimer = function () {
        var _this = this;
        var timerSeconds = 300;
        var timer = setInterval(function () {
            _this.timerText = _this.getMinutesAndSeconds(timerSeconds);
            if (timerSeconds < 1) {
                clearInterval(timer);
                if (_this.navCtrl.getActive().name == "OtpLoginPage") {
                    _this.goBack();
                }
            }
            timerSeconds--;
        }, 1000);
    };
    OtpLoginPage.prototype.getMinutesAndSeconds = function (inputSeconds) {
        var secNum = parseInt(inputSeconds.toString(), 10);
        var hours = Math.floor(secNum / 3600);
        var minutes = Math.floor((secNum - hours * 3600) / 60);
        var seconds = secNum - hours * 3600 - minutes * 60;
        var minutesString = "";
        var secondsString = "";
        minutesString = minutes < 10 ? "0" + minutes : minutes.toString();
        secondsString = seconds < 10 ? "0" + seconds : seconds.toString();
        return minutesString + ":" + secondsString;
    };
    OtpLoginPage.prototype.startResendOTPTimer = function () {
        var _this = this;
        this.disableButtons = true;
        var timerSeconds = 20;
        var timer = setInterval(function () {
            _this.resendOTPButtonText = "Resend OTP in " + timerSeconds + " sec";
            if (timerSeconds < 1) {
                clearInterval(timer);
                _this.disableButtons = false;
                _this.resendOTPButtonText = "Resend OTP";
            }
            timerSeconds--;
        }, 1000);
    };
    OtpLoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-otp-login",template:/*ion-inline-start:"/workspaces/PRADIP-MOBILE-IONIC/src/pages/otp-login/otp-login.html"*/'<ion-header class="header-cls">\n\n  <ion-title>PRADIP Mobile App</ion-title>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div class="p-logo-div"></div>\n\n\n\n  <div class="otp-main">\n\n    <button class="close-icon" ion-button clear icon-only (click)="goBack()">\n\n      <ion-icon name="ios-close-circle-outline"></ion-icon>\n\n    </button>\n\n    <ion-label>Please Enter Your OTP</ion-label>\n\n    <ion-row justify-content-center>\n\n      <ion-label>{{timerText}}</ion-label>\n\n    </ion-row>\n\n    <form [formGroup]="otpForm" (ngSubmit)="validateOTP(false)">\n\n      <ion-row align-items-between>\n\n        <ion-col ion-item no-lines>\n\n          <ion-input\n\n            class="otp-input"\n\n            text-center\n\n            #otp1\n\n            formControlName="otp1"\n\n            [(ngModel)]="otp[0]"\n\n            maxlength="1"\n\n            type="tel"\n\n            (keyup)="otpInputController($event,otp2,\'\')"\n\n          ></ion-input>\n\n        </ion-col>\n\n        <ion-col ion-item no-lines>\n\n          <ion-input\n\n            class="otp-input"\n\n            text-center\n\n            #otp2\n\n            formControlName="otp2"\n\n            [(ngModel)]="otp[1]"\n\n            maxlength="1"\n\n            type="tel"\n\n            (keyup)="otpInputController($event,otp3,otp1)"\n\n          ></ion-input>\n\n        </ion-col>\n\n        <ion-col ion-item no-lines>\n\n          <ion-input\n\n            class="otp-input"\n\n            text-center\n\n            #otp3\n\n            formControlName="otp3"\n\n            [(ngModel)]="otp[2]"\n\n            maxlength="1"\n\n            type="tel"\n\n            (keyup)="otpInputController($event,otp4,otp2)"\n\n          ></ion-input>\n\n        </ion-col>\n\n        <ion-col ion-item no-lines>\n\n          <ion-input\n\n            class="otp-input"\n\n            text-center\n\n            #otp4\n\n            formControlName="otp4"\n\n            [(ngModel)]="otp[3]"\n\n            maxlength="1"\n\n            type="tel"\n\n            (keyup)="otpInputController($event,\'\',otp3)"\n\n          ></ion-input>\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n      <button\n\n        class="marg-top20 light-button"\n\n        color="light"\n\n        ion-button\n\n        block\n\n        type="submit"\n\n      >\n\n        Submit\n\n      </button>\n\n    </form>\n\n    <button\n\n      *ngIf="numberOfResendOTPTries < 2"\n\n      class="marg-top20 light-button"\n\n      color="light"\n\n      ion-button\n\n      block\n\n      [disabled]="disableButtons"\n\n      (click)="resendOTP()"\n\n    >\n\n      {{resendOTPButtonText}}\n\n    </button>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"/workspaces/PRADIP-MOBILE-IONIC/src/pages/otp-login/otp-login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_adapter_calls_adapter_calls__["a" /* AdapterCallsProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_auth_handler_auth_handler__["a" /* AuthHandlerProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_logger_logger__["a" /* LoggerProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_loader_loader__["a" /* LoaderProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_alert_alert__["a" /* AlertProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */]])
    ], OtpLoginPage);
    return OtpLoginPage;
}());

//# sourceMappingURL=otp-login.js.map

/***/ })

});
//# sourceMappingURL=7.js.map