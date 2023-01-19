webpackJsonp([12],{

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilesPageModule", function() { return FilesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__files__ = __webpack_require__(431);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var FilesPageModule = /** @class */ (function () {
    function FilesPageModule() {
    }
    FilesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__files__["a" /* FilesPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__files__["a" /* FilesPage */]),
            ],
        })
    ], FilesPageModule);
    return FilesPageModule;
}());

//# sourceMappingURL=files.module.js.map

/***/ }),

/***/ 431:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_loader_loader__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_adapter_calls_adapter_calls__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_alert_alert__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_opener__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_logger_logger__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var FilesPage = /** @class */ (function () {
    function FilesPage(navCtrl, navParams, app, adapter, loader, alert, platform, opener, file, logger) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.app = app;
        this.adapter = adapter;
        this.loader = loader;
        this.alert = alert;
        this.platform = platform;
        this.opener = opener;
        this.file = file;
        this.logger = logger;
        this.annexures = [];
        var navData = navParams.data;
        if (navData.data.variables.metaData) {
            var fileNumber = navData.data.variables.metaData.fileNumber;
            this.getListOfAnnexures(fileNumber);
        }
        else {
        }
        this.noteSheetId = navData.data.variables.noteSheetPDFID;
    }
    FilesPage.prototype.ionViewDidLoad = function () { };
    FilesPage.prototype.goToInbox = function () {
        var root = this.app.getRootNav();
        root.popToRoot();
    };
    FilesPage.prototype.getListOfAnnexures = function (fileNumber) {
        var _this = this;
        this.loader.showLoading();
        var params = {
            fileNumber: fileNumber
        };
        var payload = [
            {
                queryParamName: "params",
                queryParamValue: encodeURIComponent(JSON.stringify(params))
            }
        ];
        this.adapter
            .processGetRequest("/adapters/BPM/resource/getAnnexures", payload)
            .then(function (response) {
            _this.loader.dismissLoading();
            _this.annexures = response.data.data.annexures.items;
        }, function (error) {
            _this.loader.dismissLoading();
            _this.logger.debug(error);
        })
            .catch(function (error) {
            _this.logger.debug(error);
            _this.alert.showErrorMessage(716);
        });
    };
    FilesPage.prototype.getDocumentContent = function (documentId, documentName, mimeType) {
        var _this = this;
        if (documentId) {
            this.loader.showLoading();
            var params = {
                documentId: documentId
            };
            var payload = [
                {
                    queryParamName: "params",
                    queryParamValue: encodeURIComponent(JSON.stringify(params))
                }
            ];
            this.adapter
                .processGetRequest("/adapters/BPM/resource/getDocumentContent", payload)
                .then(function (response) {
                _this.loader.dismissLoading();
                var documentContent = response.data.data.documentContent;
                _this.openDocument(documentContent, documentName, mimeType);
            }, function (error) {
                _this.logger.debug(error);
                _this.loader.dismissLoading();
            })
                .catch(function (error) {
                _this.logger.debug(error);
                _this.alert.showErrorMessage(715);
            });
        }
        else {
            this.alert.showErrorMessage(708);
        }
    };
    FilesPage.prototype.openDocument = function (fileContent, filename, mimeType) {
        var _this = this;
        var writeDirectory = this.platform.is("ios")
            ? this.file.dataDirectory
            : this.file.externalDataDirectory;
        this.file
            .writeFile(writeDirectory, filename, this.convertBase64ToBlob(fileContent, "data:" + mimeType), { replace: true })
            .then(function () {
            _this.opener.open(writeDirectory + filename, mimeType).catch(function () {
                _this.alert.showErrorMessage(710);
            });
        })
            .catch(function () {
            _this.alert.showErrorMessage(710);
        });
    };
    FilesPage.prototype.convertBase64ToBlob = function (b64Data, contentType) {
        contentType = contentType || "";
        var sliceSize = 512;
        b64Data = b64Data.replace(/^[^,]+,/, "");
        b64Data = b64Data.replace(/\s/g, "");
        var byteCharacters = atob(b64Data);
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, { type: contentType });
    };
    FilesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-files",template:/*ion-inline-start:"/workspaces/PRADIP-MOBILE-IONIC/src/pages/files/files.html"*/'<ion-header>\n\n  <ion-navbar mode="ios" hideBackButton>\n\n    <button\n\n      ion-button\n\n      icon-only\n\n      clear\n\n      text-capitalize="false"\n\n      (click)="goToInbox()"\n\n    >\n\n      <ion-icon name="arrow-back"></ion-icon> <ion-label>Inbox</ion-label>\n\n    </button>\n\n    <ion-title mode="ios">Files</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div class="contentcls">\n\n    <ul class="listcls ">\n\n      <li class="mar-top">\n\n        Note sheet\n\n        <button\n\n          class="viewsheet"\n\n          (click)="getDocumentContent(noteSheetId, \'notesheet\', \'application/pdf\')"\n\n        >\n\n          View note sheet\n\n        </button>\n\n      </li>\n\n    </ul>\n\n    <ul class="listcls ">\n\n      <li class="mar-top tex-center">Annexure(s) List</li>\n\n    </ul>\n\n    <ul class="list2">\n\n      <li *ngIf="!annexures.length">\n\n        <span class="no-annexures">No annexures attached</span>\n\n      </li>\n\n      <li *ngFor="let annexure of annexures">\n\n        <span>{{annexure.name}}</span>\n\n        <button\n\n          (click)="getDocumentContent(annexure.id, annexure.name, annexure.mimeType)"\n\n        >\n\n          View\n\n        </button>\n\n      </li>\n\n    </ul>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"/workspaces/PRADIP-MOBILE-IONIC/src/pages/files/files.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_3__providers_adapter_calls_adapter_calls__["a" /* AdapterCallsProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_loader_loader__["a" /* LoaderProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_alert_alert__["a" /* AlertProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_opener__["a" /* FileOpener */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_7__providers_logger_logger__["a" /* LoggerProvider */]])
    ], FilesPage);
    return FilesPage;
}());

//# sourceMappingURL=files.js.map

/***/ })

});
//# sourceMappingURL=12.js.map