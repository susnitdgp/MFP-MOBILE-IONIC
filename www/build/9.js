webpackJsonp([9],{

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LdapLoginPageModule", function() { return LdapLoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ldap_login__ = __webpack_require__(434);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LdapLoginPageModule = /** @class */ (function () {
    function LdapLoginPageModule() {
    }
    LdapLoginPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__ldap_login__["a" /* LdapLoginPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__ldap_login__["a" /* LdapLoginPage */]),
            ],
        })
    ], LdapLoginPageModule);
    return LdapLoginPageModule;
}());

//# sourceMappingURL=ldap-login.module.js.map

/***/ }),

/***/ 434:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LdapLoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_handler_auth_handler__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_loader_loader__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_alert_alert__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_logger_logger__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LdapLoginPage = /** @class */ (function () {
    function LdapLoginPage(navCtrl, navParams, authHandler, loader, alert, logger, alertCtrl, sanitizer) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authHandler = authHandler;
        this.loader = loader;
        this.alert = alert;
        this.logger = logger;
        this.alertCtrl = alertCtrl;
        this.sanitizer = sanitizer;
        this.passwordInputType = "password";
        this.formErrorMessages = {
            username: [
                {
                    type: "required",
                    code: 701,
                },
                { type: "pattern", code: 722 },
                {
                    type: "minlength",
                    code: 724,
                },
                {
                    type: "maxlength",
                    code: 724,
                },
            ],
            password: [
                {
                    type: "required",
                    code: 702,
                },
                { type: "pattern", code: 723 },
                {
                    type: "minlength",
                    code: 723,
                },
                {
                    type: "maxlength",
                    code: 723,
                },
            ],
        };
        this.authHandler.setLoginSuccessCallback(function (user) {
            _this.logger.debug(user);
            if (user.user && user.user.id) {
                if (_this.navCtrl.getActive().name == "LdapLoginPage") {
                    _this.loader.dismissLoading();
                    // if (this.navCtrl.canGoBack()) {
                    //   this.navCtrl.pop();
                    // }
                    // else {
                    _this.navCtrl.setRoot("OtpLoginPage", user.user);
                    // }
                }
                else {
                    _this.logger.debug("Login state");
                }
            }
            else {
                _this.alert.showErrorMessage(706);
            }
        });
        this.authHandler.setHandleChallengeCallback(function (challenge) {
            _this.loader.dismissLoading();
            if (challenge.errorCode) {
                _this.alert.showErrorMessage(challenge.errorCode);
            }
            else {
                _this.alert.showErrorMessage(799);
            }
            if (_this.navCtrl.getActive().name != "LdapLoginPage") {
                _this.navCtrl.push(LdapLoginPage_1);
            }
        });
        this.authHandler.setLoginFailureCallback(function (error) {
            logger.debug(error);
            _this.loader.dismissLoading();
            if (error.status) {
                _this.alert.showErrorMessage(error.status);
            }
            else if (error.errorCode) {
                _this.alert.showErrorMessage(error.errorCode);
            }
            else {
                _this.alert.showErrorMessage(799);
            }
            if (_this.navCtrl.getActive().name != "LdapLoginPage") {
                _this.navCtrl.setRoot(LdapLoginPage_1);
            }
        });
        this.form = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormGroup */]({
            username: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormControl */]("", [
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].minLength(6),
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].maxLength(30),
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].pattern("[a-zA-Z0-9.]*"),
            ]),
            password: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormControl */]("", [
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].minLength(4),
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].maxLength(30),
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["g" /* Validators */].pattern("[a-zA-Z0-9!@#$%^&*]*"),
            ]),
        });
    }
    LdapLoginPage_1 = LdapLoginPage;
    LdapLoginPage.prototype.processForm = function () {
        var _this = this;
        var username = this.form.value.username;
        var password = this.form.value.password;
        if (username == "" && password == "") {
            this.alert.showErrorMessage(700);
            return;
        }
        if (this.form.valid) {
            var credentials = {
                username: username,
                password: password,
            };
            this.loader.showLoading();
            this.authHandler.login(credentials);
        }
        else {
            this.formErrorMessages.username.forEach(function (validation) {
                if (_this.form.get("username").hasError(validation.type)) {
                    _this.alert.showErrorMessage(validation.code);
                }
            });
            this.formErrorMessages.password.forEach(function (validation) {
                if (_this.form.get("password").hasError(validation.type)) {
                    _this.alert.showErrorMessage(validation.code);
                }
            });
        }
    };
    LdapLoginPage.prototype.togglePasswordInputType = function (input) {
        this.passwordInputType =
            this.passwordInputType == "password" ? "text" : "password";
        input.setFocus();
    };
    LdapLoginPage.prototype.showContactUsPopup = function () {
        var contactUsPopup = this.alertCtrl.create({
            subTitle: "For any issue may please contact",
            message: this.getContactUsContent(),
            buttons: [
                {
                    text: "OK",
                    handler: function () {
                        contactUsPopup.dismiss();
                        return false;
                    },
                },
            ],
        });
        contactUsPopup.present();
    };
    LdapLoginPage.prototype.getContactUsContent = function () {
        return this.sanitizer.bypassSecurityTrustHtml("<ion-row><ion-icon name='phone'></ion-icon>  Mobile: <a href='tel:1800-102-5970'>1800-102-5970</a></ion-row> <br /><br /><ion-row><ion-icon name='mail'></ion-icon> Email: <a href='mailto:ecm@ntpc.co.in'>ecm@ntpc.co.in</a></ion-row>");
    };
    LdapLoginPage = LdapLoginPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-ldap-login",template:/*ion-inline-start:"/workspaces/PRADIP-MOBILE-IONIC/src/pages/ldap-login/ldap-login.html"*/'<ion-header class="header-cls">\n\n  <ion-title>PRADIP Mobile App</ion-title>\n\n</ion-header>\n\n<ion-content>\n\n  <div class="p-logo-div"></div>\n\n  <div class="user-icon"></div>\n\n  <div class="login-form">\n\n    <form [formGroup]="form" (ngSubmit)="processForm()">\n\n      <ion-list>\n\n        <ion-item class="login-input">\n\n          <ion-label floating>\n\n            <ion-icon name="ios-person-outline"> </ion-icon> Username (six digit\n\n            emp number)</ion-label\n\n          >\n\n          <ion-input formControlName="username" type="text"></ion-input>\n\n        </ion-item>\n\n        <ion-item class="login-input">\n\n          <ion-label floating>\n\n            <ion-icon name="ios-lock-outline"></ion-icon> Password</ion-label\n\n          >\n\n          <button\n\n            class="view-hide-password"\n\n            ion-button\n\n            item-end\n\n            clear\n\n            icon-only\n\n            color="light"\n\n            type="button"\n\n            (click)="togglePasswordInputType(passwordInput)"\n\n          >\n\n            <ion-icon\n\n              name="eye"\n\n              *ngIf="passwordInputType == \'password\'"\n\n            ></ion-icon>\n\n            <ion-icon\n\n              name="eye-off"\n\n              *ngIf="passwordInputType == \'text\'"\n\n            ></ion-icon>\n\n          </button>\n\n          <ion-input\n\n            #passwordInput\n\n            formControlName="password"\n\n            type="{{passwordInputType}}"\n\n            clearOnEdit="false"\n\n          ></ion-input>\n\n        </ion-item>\n\n      </ion-list>\n\n      <div padding>\n\n        <button\n\n          color="light"\n\n          class="light-button"\n\n          ion-button\n\n          block\n\n          type="submit"\n\n        >\n\n          Login\n\n        </button>\n\n      </div>\n\n    </form>\n\n  </div>\n\n  <ion-row justify-content-center>\n\n    <button ion-button clear color="light" text-capitalize="false" (click)="showContactUsPopup()">Contact Us</button>\n\n  </ion-row>\n\n</ion-content>\n\n'/*ion-inline-end:"/workspaces/PRADIP-MOBILE-IONIC/src/pages/ldap-login/ldap-login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_auth_handler_auth_handler__["a" /* AuthHandlerProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_loader_loader__["a" /* LoaderProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_alert_alert__["a" /* AlertProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_logger_logger__["a" /* LoggerProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__["c" /* DomSanitizer */]])
    ], LdapLoginPage);
    return LdapLoginPage;
    var LdapLoginPage_1;
}());

//# sourceMappingURL=ldap-login.js.map

/***/ })

});
//# sourceMappingURL=9.js.map