webpackJsonp([2],{

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionHistoryPageModule", function() { return ActionHistoryPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__action_history__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(293);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ActionHistoryPageModule = /** @class */ (function () {
    function ActionHistoryPageModule() {
    }
    ActionHistoryPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_2__action_history__["a" /* ActionHistoryPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__action_history__["a" /* ActionHistoryPage */]), __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */]]
        })
    ], ActionHistoryPageModule);
    return ActionHistoryPageModule;
}());

//# sourceMappingURL=action-history.module.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__accordion_accordion__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__accordion_accordion__["a" /* AccordionComponent */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_1__accordion_accordion__["a" /* AccordionComponent */]]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccordionComponent; });
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


var AccordionComponent = /** @class */ (function () {
    function AccordionComponent(renderer) {
        this.renderer = renderer;
        this.accordionExpanded = false;
        this.icon = "ios-arrow-down";
    }
    AccordionComponent.prototype.ngOnInit = function () {
        this.renderer.setElementStyle(this.accordionContent.nativeElement, "webkitTransition", "max-height 500ms, padding: 500ms");
    };
    AccordionComponent.prototype.toggleAccordion = function () {
        if (this.accordionExpanded) {
            this.renderer.setElementStyle(this.accordionContent.nativeElement, "max-height", "0px");
            this.renderer.setElementStyle(this.accordionContent.nativeElement, "padding", "0px 16px");
        }
        else {
            this.renderer.setElementStyle(this.accordionContent.nativeElement, "max-height", "500px");
            this.renderer.setElementStyle(this.accordionContent.nativeElement, "padding", "13px 16px");
        }
        this.accordionExpanded = !this.accordionExpanded;
        this.icon =
            this.icon === "ios-arrow-down" ? "ios-arrow-up" : "ios-arrow-down";
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])("cardContent"),
        __metadata("design:type", Object)
    ], AccordionComponent.prototype, "accordionContent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])("data"),
        __metadata("design:type", Object)
    ], AccordionComponent.prototype, "header", void 0);
    AccordionComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "accordion",template:/*ion-inline-start:"/workspaces/PRADIP-MOBILE-IONIC/src/components/accordion/accordion.html"*/'<ion-card>\n\n  <ion-card-header color="primary" (click)="toggleAccordion()">\n\n    <ion-item color="light">\n\n      {{header}}\n\n      <button clear small ion-button icon-only item-right>\n\n        <ion-icon [name]="icon" color="primary"></ion-icon>\n\n      </button>\n\n    </ion-item>\n\n  </ion-card-header>\n\n  <ion-card-content #cardContent>\n\n    <ng-content></ng-content>\n\n  </ion-card-content>\n\n</ion-card>\n\n'/*ion-inline-end:"/workspaces/PRADIP-MOBILE-IONIC/src/components/accordion/accordion.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]])
    ], AccordionComponent);
    return AccordionComponent;
}());

//# sourceMappingURL=accordion.js.map

/***/ }),

/***/ 422:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionHistoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_adapter_calls_adapter_calls__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loader_loader__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_logger_logger__ = __webpack_require__(41);
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






var ActionHistoryPage = /** @class */ (function () {
    function ActionHistoryPage(navCtrl, navParams, app, adapter, loader, logger, alert) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.app = app;
        this.adapter = adapter;
        this.loader = loader;
        this.logger = logger;
        this.alert = alert;
        this.actionHistory = [];
        this.processInstanceId = navParams.data.piid;
        logger.debug(this.processInstanceId);
        this.loadActionHistory();
    }
    ActionHistoryPage.prototype.loadActionHistory = function () {
        var _this = this;
        this.loader.showLoading();
        var params = {
            processInstanceId: this.processInstanceId
        };
        var payload = [
            {
                queryParamName: "params",
                queryParamValue: encodeURIComponent(JSON.stringify(params))
            }
        ];
        this.adapter
            .processGetRequest("/adapters/BPM/resource/getActionHistory", payload)
            .then(function (response) {
            _this.loader.dismissLoading();
            _this.actionHistory = response.data.data.bpmActions.items;
            if (!_this.actionHistory.length) {
                _this.alert.showErrorMessage(726);
            }
        }, function (error) {
            _this.logger.debug(error);
            _this.loader.dismissLoading();
        });
    };
    ActionHistoryPage.prototype.goToInbox = function () {
        var root = this.app.getRootNav();
        root.popToRoot();
    };
    ActionHistoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-action-history",template:/*ion-inline-start:"/workspaces/PRADIP-MOBILE-IONIC/src/pages/action-history/action-history.html"*/'<ion-header>\n\n  <ion-navbar mode="ios" hideBackButton>\n\n    <button\n\n      ion-button\n\n      icon-only\n\n      clear\n\n      text-capitalize="false"\n\n      (click)="goToInbox()"\n\n    >\n\n      <ion-icon name="arrow-back"></ion-icon> <ion-label>Inbox</ion-label>\n\n    </button>\n\n    <ion-title mode="ios">Action History</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <accordion *ngFor="let action of actionHistory" [data]="action.actionBy">\n\n    <!-- <ion-row>\n\n      <ion-col col-4>\n\n        <ion-label class="tblhed" text-wrap>Task Name:</ion-label>\n\n      </ion-col>\n\n      <ion-col col-8>\n\n        <ion-label text-wrap>{{action.taskName}}</ion-label>\n\n      </ion-col>\n\n    </ion-row> -->\n\n    <ion-row>\n\n      <ion-col col-4>\n\n        <ion-label class="tblhed" text-wrap>Sent To:</ion-label>\n\n      </ion-col>\n\n      <ion-col col-8>\n\n        <ion-label text-wrap>{{action.actionTo}}</ion-label>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row>\n\n      <ion-col col-4>\n\n        <ion-label class="tblhed" text-wrap>Sent On:</ion-label>\n\n      </ion-col>\n\n      <ion-col col-8>\n\n        <ion-label text-wrap>\n\n          {{action.actionOn | date: "dd/MM/yyyy HH:mm"}}\n\n        </ion-label>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row>\n\n      <ion-col col-4>\n\n        <ion-label class="tblhed" text-wrap>Action Taken:</ion-label>\n\n      </ion-col>\n\n\n\n      <ion-col col-8>\n\n        <ion-label text-wrap>{{action.action}}</ion-label>\n\n      </ion-col>\n\n    </ion-row>\n\n    <!-- <ion-row>\n\n      <ion-col col-4>\n\n        <ion-label class="tblhed" text-wrap>Action Comments:</ion-label>\n\n      </ion-col>\n\n      <ion-col col-8>\n\n        <ion-label text-wrap>{{action.actionComments}}</ion-label>\n\n      </ion-col>\n\n    </ion-row> -->\n\n  </accordion>\n\n</ion-content>\n\n'/*ion-inline-end:"/workspaces/PRADIP-MOBILE-IONIC/src/pages/action-history/action-history.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_2__providers_adapter_calls_adapter_calls__["a" /* AdapterCallsProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_loader_loader__["a" /* LoaderProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_logger_logger__["a" /* LoggerProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_alert_alert__["a" /* AlertProvider */]])
    ], ActionHistoryPage);
    return ActionHistoryPage;
}());

//# sourceMappingURL=action-history.js.map

/***/ })

});
//# sourceMappingURL=2.js.map