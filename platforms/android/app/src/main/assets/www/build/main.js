webpackJsonp([15],{

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoaderProvider; });
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


var LoaderProvider = /** @class */ (function () {
    function LoaderProvider(loading) {
        this.loading = loading;
        this.isShowing = false;
    }
    LoaderProvider.prototype.showLoading = function () {
        if (this.isShowing) {
            this.loader.dismiss();
        }
        this.loader = this.loading.create({
            spinner: "bubbles",
            content: "Loading..."
        });
        this.loader.present();
        this.isShowing = true;
    };
    LoaderProvider.prototype.dismissLoading = function () {
        try {
            if (this.isShowing) {
                this.loader.dismiss().catch(function (error) {
                    console.log("Error dismissing the loader");
                });
                this.isShowing = false;
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    LoaderProvider.prototype.isActive = function () {
        return this.isShowing;
    };
    LoaderProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
    ], LoaderProvider);
    return LoaderProvider;
}());

//# sourceMappingURL=loader.js.map

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthHandlerProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logger_logger__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthHandlerProvider = /** @class */ (function () {
    function AuthHandlerProvider(logger, platform) {
        this.logger = logger;
        this.platform = platform;
        this.securityCheckName = "LTPA";
        this.handleChallengeCallback = null;
        this.loginSuccessCallback = null;
        this.loginFailureCallback = null;
        this.initialized = false;
    }
    AuthHandlerProvider.prototype.init = function () {
        if (this.initialized) {
            return;
        }
        this.initialized = true;
        this.userLoginChallengeHandler = WL.Client.createSecurityCheckChallengeHandler(this.securityCheckName);
        // https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
        this.userLoginChallengeHandler.handleChallenge = this.handleChallenge.bind(this);
        this.userLoginChallengeHandler.handleSuccess = this.handleSuccess.bind(this);
        this.userLoginChallengeHandler.handleFailure = this.handleFailure.bind(this);
        this.logout();
    };
    AuthHandlerProvider.prototype.handleChallenge = function (challenge) {
        this.logout();
        this.userLoginChallengeHandler.cancel();
        this.logger.debug("handleChallenge", challenge);
        this.handleChallengeCallback(challenge);
    };
    AuthHandlerProvider.prototype.setHandleChallengeCallback = function (onHandleChallenge) {
        this.handleChallengeCallback = onHandleChallenge;
    };
    AuthHandlerProvider.prototype.setLoginSuccessCallback = function (onSuccess) {
        this.loginSuccessCallback = onSuccess;
    };
    AuthHandlerProvider.prototype.setLoginFailureCallback = function (onFailure) {
        this.loginFailureCallback = onFailure;
    };
    AuthHandlerProvider.prototype.handleSuccess = function (data) {
        if (this.loginSuccessCallback != null) {
            this.loginSuccessCallback(data);
        }
    };
    AuthHandlerProvider.prototype.handleFailure = function (error) {
        this.userLoginChallengeHandler.cancel();
        if (this.loginFailureCallback != null) {
            this.loginFailureCallback(error);
        }
    };
    AuthHandlerProvider.prototype.login = function (credentials) {
        var _this = this;
        var authHeader = "Basic " + btoa(credentials.username + ":" + credentials.password);
        WL.Client.addGlobalHeader("Authorization", authHeader);
        WLAuthorizationManager.login(this.securityCheckName, credentials).then(function (success) {
            WL.Client.removeGlobalHeader("Authorization");
        }, function (failure) {
            _this.loginFailureCallback(failure);
            _this.logger.debug(failure);
        });
    };
    AuthHandlerProvider.prototype.logout = function () {
        var _this = this;
        WLAuthorizationManager.logout(this.securityCheckName).then(function (success) {
            _this.logger.debug("--> AuthHandler: logout success" + JSON.stringify(success));
        }, function (failure) {
            _this.logger.debug("--> AuthHandler: logout failure: " + JSON.stringify(failure));
        });
        WL.Client.clearCookieSession().then(function (success) {
            _this.logger.debug("clearCookieSession", success);
        }, function (error) {
            _this.logger.debug(error);
        });
        if (this.platform.is("ios")) {
            WL.Client.deleteCookie("LtpaToken2").then(function (success) {
                _this.logger.debug("deleteCookie", success);
            }, function (error) {
                _this.logger.debug(error);
            });
        }
    };
    AuthHandlerProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__logger_logger__["a" /* LoggerProvider */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* Platform */]])
    ], AuthHandlerProvider);
    return AuthHandlerProvider;
}());

//# sourceMappingURL=auth-handler.js.map

/***/ }),

/***/ 114:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 114;

/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/action-history/action-history.module": [
		277,
		2
	],
	"../pages/approval/approval.module": [
		278,
		14
	],
	"../pages/dashboard-summary/dashboard-summary.module": [
		279,
		1
	],
	"../pages/dashboard/dashboard.module": [
		280,
		0
	],
	"../pages/dop/dop.module": [
		281,
		13
	],
	"../pages/files/files.module": [
		282,
		12
	],
	"../pages/forward/forward.module": [
		283,
		11
	],
	"../pages/inbox/inbox.module": [
		284,
		10
	],
	"../pages/ldap-login/ldap-login.module": [
		285,
		9
	],
	"../pages/meta-data/meta-data.module": [
		286,
		8
	],
	"../pages/otp-login/otp-login.module": [
		287,
		7
	],
	"../pages/task-details/task-details.module": [
		288,
		6
	],
	"../pages/terms-and-conditions/terms-and-conditions.module": [
		289,
		5
	],
	"../pages/user-profile/user-profile.module": [
		290,
		4
	],
	"../pages/user-search-filter/user-search-filter.module": [
		291,
		3
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 155;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorMessagesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ErrorMessagesProvider = /** @class */ (function () {
    function ErrorMessagesProvider() {
        this.errorMessages = {
            101: "Unable to send OTP. Please try again later",
            108: "Failed to fetch user details. Please try again later",
            109: "Error fetching user details. Please try again later",
            110: "User details are not available. Please contact administrator",
            "-1": "Unable to process your request. Please try again later",
            500: "Unable to process your request. Please try again later",
            401: "Invalid Credentials, Please try again",
            404: "Unable to process your request. Please try again later",
            700: "Username and Password are required",
            701: "Please enter username",
            702: "Please enter password",
            703: "Please enter OTP",
            704: "Please enter notesheet comments",
            705: "You are offline. Please connect to internet to continue",
            706: "Unable to process your request. Please try again later",
            707: "Invalid OTP, Please try again",
            708: "Notesheet not found",
            709: "Please enter at least 3 characters",
            710: "Unable to open specified file.",
            711: "Please select filters to apply",
            712: "No employee matched selected filters. Please try again",
            713: "Please select an employee",
            714: "Data is not available",
            715: "Unable to fetch document content",
            716: "Unable to load annexures",
            717: "OTP has been resent successfully",
            718: "Unable to resend OTP",
            719: "Please enter a valid OTP",
            720: "No users match the keyword",
            721: "No internet connection. Please ensure network connectivity to work with PRADIP app.",
            722: "Please enter valid username",
            723: "Please enter valid password",
            724: "username must be of 6 characters",
            725: "Unable to fetch meta data of the task",
            726: "No actions have been performed on this task",
            727: "Session expired. Please login again.",
            728: "Please select employee to add",
            729: "You cannot enter same user twice sequentially",
            730: "Dashboard is data aggregation of Predefined - Office Note, Payment, Tendering and PR Approval processes for last 90 days",
            799: "Login failed, Please try again later"
        };
    }
    ErrorMessagesProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], ErrorMessagesProvider);
    return ErrorMessagesProvider;
}());

//# sourceMappingURL=error-messages.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdapterCallsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alert_alert__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logger_logger__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// declare var WLResourceRequest;
var AdapterCallsProvider = /** @class */ (function () {
    function AdapterCallsProvider(alert, logger) {
        this.alert = alert;
        this.logger = logger;
    }
    AdapterCallsProvider.prototype.processPostRequest = function (endpoint, payload) {
        var _this = this;
        this.logger.debug(payload);
        var options = {
            timeout: 45000,
            scope: "PradipScope"
        };
        var dataRequest = new WLResourceRequest(endpoint, WLResourceRequest.POST, options);
        return new Promise(function (resolve, reject) {
            dataRequest.sendFormParameters(payload).then(function (response) {
                _this.logger.debug(response);
                resolve(response.responseJSON);
            }, function (error) {
                _this.showErrorMessage(error);
                reject(error);
            });
        });
    };
    AdapterCallsProvider.prototype.processGetRequest = function (endpoint, queryParams, returnHeaders) {
        var _this = this;
        this.logger.debug("endpoint", endpoint);
        var options = {
            timeout: 45000,
            scope: "PradipScope"
        };
        var dataRequest = new WLResourceRequest(endpoint, WLResourceRequest.GET, options);
        queryParams.forEach(function (element) {
            _this.logger.debug("queryParams", decodeURIComponent(element.queryParamValue));
            dataRequest.setQueryParameter(element.queryParamName, element.queryParamValue);
        });
        return new Promise(function (resolve, reject) {
            dataRequest.send().then(function (response) {
                _this.logger.debug(response);
                returnHeaders ? resolve(response) : resolve(response.responseJSON);
            }, function (error) {
                _this.showErrorMessage(error);
                reject(error);
            });
        });
    };
    AdapterCallsProvider.prototype.callUnprotectedAdapterResource = function (endpoint) {
        var _this = this;
        var options = {
            timeout: 45000
        };
        var dataRequest = new WLResourceRequest(endpoint, WLResourceRequest.GET, options);
        return new Promise(function (resolve, reject) {
            dataRequest.send().then(function (response) {
                _this.logger.debug(response);
                resolve(response);
            }, function (error) {
                _this.showErrorMessage(error);
                reject(error);
            });
        });
    };
    AdapterCallsProvider.prototype.showErrorMessage = function (error) {
        if (error.errorCode) {
            if (error.errorCode == 199) {
                this.alert.showErrorMessage(error.errorCode, error.errorMsg);
            }
            this.alert.showErrorMessage(error.errorCode);
        }
        else {
            this.alert.showErrorMessage(706);
        }
    };
    AdapterCallsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__alert_alert__["a" /* AlertProvider */], __WEBPACK_IMPORTED_MODULE_2__logger_logger__["a" /* LoggerProvider */]])
    ], AdapterCallsProvider);
    return AdapterCallsProvider;
}());

//# sourceMappingURL=adapter-calls.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);



Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_14" /* enableProdMode */])();
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_opener__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_auth_handler_auth_handler__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_adapter_calls_adapter_calls__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_loader_loader__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_logger_logger__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_alert_alert__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_error_messages_error_messages__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_otp_handler_otp_handler__ = __webpack_require__(276);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */]],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */], { scrollAssist: true, autoFocusAssist: true }, {
                    links: [
                        { loadChildren: '../pages/action-history/action-history.module#ActionHistoryPageModule', name: 'ActionHistoryPage', segment: 'action-history', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/approval/approval.module#ApprovalPageModule', name: 'ApprovalPage', segment: 'approval', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/dashboard-summary/dashboard-summary.module#DashboardSummaryPageModule', name: 'DashboardSummaryPage', segment: 'dashboard-summary', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/dashboard/dashboard.module#DashboardPageModule', name: 'DashboardPage', segment: 'dashboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/dop/dop.module#DopPageModule', name: 'DopPage', segment: 'dop', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/files/files.module#FilesPageModule', name: 'FilesPage', segment: 'files', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/forward/forward.module#ForwardPageModule', name: 'ForwardPage', segment: 'forward', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/inbox/inbox.module#InboxPageModule', name: 'InboxPage', segment: 'inbox', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/ldap-login/ldap-login.module#LdapLoginPageModule', name: 'LdapLoginPage', segment: 'ldap-login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/meta-data/meta-data.module#MetaDataPageModule', name: 'MetaDataPage', segment: 'meta-data', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/otp-login/otp-login.module#OtpLoginPageModule', name: 'OtpLoginPage', segment: 'otp-login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/task-details/task-details.module#TaskDetailsPageModule', name: 'TaskDetailsPage', segment: 'task-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/terms-and-conditions/terms-and-conditions.module#TermsAndConditionsPageModule', name: 'TermsAndConditionsPage', segment: 'terms-and-conditions', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/user-profile/user-profile.module#UserProfilePageModule', name: 'UserProfilePage', segment: 'user-profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/user-search-filter/user-search-filter.module#UserSearchFilterPageModule', name: 'UserSearchFilterPage', segment: 'user-search-filter', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */]],
            providers: [
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_9__providers_auth_handler_auth_handler__["a" /* AuthHandlerProvider */],
                __WEBPACK_IMPORTED_MODULE_10__providers_adapter_calls_adapter_calls__["a" /* AdapterCallsProvider */],
                __WEBPACK_IMPORTED_MODULE_11__providers_loader_loader__["a" /* LoaderProvider */],
                __WEBPACK_IMPORTED_MODULE_12__providers_logger_logger__["a" /* LoggerProvider */],
                __WEBPACK_IMPORTED_MODULE_13__providers_alert_alert__["a" /* AlertProvider */],
                __WEBPACK_IMPORTED_MODULE_14__providers_error_messages_error_messages__["a" /* ErrorMessagesProvider */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_opener__["a" /* FileOpener */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_15__providers_otp_handler_otp_handler__["a" /* OtpHandlerProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_network__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_handler_auth_handler__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_logger_logger__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_loader_loader__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_alert_alert__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__ = __webpack_require__(198);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MyApp = /** @class */ (function () {
    function MyApp(platform, renderer, splashScreen, statusBar, authHandler, logger, app, loader, alert, network) {
        var _this = this;
        this.authHandler = authHandler;
        this.logger = logger;
        this.app = app;
        this.loader = loader;
        this.alert = alert;
        this.network = network;
        this.rootPage = "LdapLoginPage";
        var disconnectSubscription = this.network.onDisconnect().subscribe(function () {
            _this.alert.showErrorMessage(721);
        });
        renderer.listenGlobal("document", "mfpjsloaded", function () {
            logger.debug("--> MyApp mfpjsloaded");
            _this.authHandler.init();
        });
        platform.ready().then(function () {
            //statusBar.styleLightContent();
            splashScreen.hide();
        });
        platform.registerBackButtonAction(function () {
            if (_this.loader.isActive()) {
                // Do nothing
            }
            else {
                _this.app.goBack();
            }
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/workspaces/PRADIP-MOBILE-IONIC/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n\n\n\n\n'/*ion-inline-end:"/workspaces/PRADIP-MOBILE-IONIC/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1__angular_core__["V" /* Renderer */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_handler_auth_handler__["a" /* AuthHandlerProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_logger_logger__["a" /* LoggerProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_6__providers_loader_loader__["a" /* LoaderProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_alert_alert__["a" /* AlertProvider */],
            __WEBPACK_IMPORTED_MODULE_0__ionic_native_network__["a" /* Network */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OtpHandlerProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var OtpHandlerProvider = /** @class */ (function () {
    function OtpHandlerProvider() {
        console.log("Hello OtpHandlerProvider Provider");
    }
    OtpHandlerProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], OtpHandlerProvider);
    return OtpHandlerProvider;
}());

//# sourceMappingURL=otp-handler.js.map

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoggerProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LoggerProvider = /** @class */ (function () {
    function LoggerProvider() {
        this.isProd = false;
    }
    LoggerProvider.prototype.debug = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        console.log.apply(console, message);
    };
    LoggerProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], LoggerProvider);
    return LoggerProvider;
}());

//# sourceMappingURL=logger.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__error_messages_error_messages__ = __webpack_require__(156);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AlertProvider = /** @class */ (function () {
    function AlertProvider(alertCtrl, errorMessages) {
        this.alertCtrl = alertCtrl;
        this.errorMessages = errorMessages;
        this.isActive = false;
    }
    AlertProvider.prototype.showErrorMessage = function (errorCode, errorMsg) {
        var _this = this;
        var errorMessage = this.errorMessages.errorMessages["706"];
        if (errorMsg) {
            errorMessage = errorMsg;
        }
        else if (this.errorMessages.errorMessages.hasOwnProperty(errorCode)) {
            errorMessage = this.errorMessages.errorMessages[errorCode];
        }
        if (!this.isActive) {
            var alert_1 = this.alertCtrl.create({
                message: errorMessage,
                enableBackdropDismiss: false,
                buttons: [
                    {
                        text: "OK",
                        handler: function () {
                            alert_1.dismiss();
                            _this.isActive = false;
                            return false;
                        }
                    }
                ]
            });
            alert_1.present();
            this.isActive = true;
        }
    };
    AlertProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__error_messages_error_messages__["a" /* ErrorMessagesProvider */]])
    ], AlertProvider);
    return AlertProvider;
}());

//# sourceMappingURL=alert.js.map

/***/ })

},[203]);
//# sourceMappingURL=main.js.map