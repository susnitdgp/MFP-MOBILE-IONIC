webpackJsonp([1],{

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardSummaryPageModule", function() { return DashboardSummaryPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_summary__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(293);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var DashboardSummaryPageModule = /** @class */ (function () {
    function DashboardSummaryPageModule() {
    }
    DashboardSummaryPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_2__dashboard_summary__["a" /* DashboardSummaryPage */]],
            imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__dashboard_summary__["a" /* DashboardSummaryPage */]), __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */]]
        })
    ], DashboardSummaryPageModule);
    return DashboardSummaryPageModule;
}());

//# sourceMappingURL=dashboard-summary.module.js.map

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

/***/ 424:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardSummaryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_adapter_calls_adapter_calls__ = __webpack_require__(200);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DashboardSummaryPage = /** @class */ (function () {
    function DashboardSummaryPage(navCtrl, navParams, adapter) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.adapter = adapter;
        this.pageTitle = "Dashboard Details";
        var data = navParams.data;
        this.pageTitle = data.pageTitle;
        this.files = data.data;
        this.params = data.params;
        this.dashboardType = data.dashboardType;
        this.endpoint = data.endpoint;
    }
    DashboardSummaryPage.prototype.loadMore = function (infiniteScroll) {
        var _this = this;
        this.params.pageOffset = this.files.length;
        var payload = [
            {
                queryParamName: "params",
                queryParamValue: encodeURIComponent(JSON.stringify(this.params))
            }
        ];
        this.adapter.processGetRequest(this.endpoint, payload).then(function (response) {
            var responseData = response.data.data;
            if (responseData.errorMessage) {
            }
            else {
                (_a = _this.files).push.apply(_a, responseData.results.items);
            }
            infiniteScroll.complete();
            var _a;
        }, function (error) {
            infiniteScroll.complete();
        });
    };
    DashboardSummaryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-dashboard-summary",template:/*ion-inline-start:"/workspaces/PRADIP-MOBILE-IONIC/src/pages/dashboard-summary/dashboard-summary.html"*/'<ion-header>\n\n  <ion-navbar mode="ios">\n\n    <ion-title mode="ios">{{pageTitle}}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list>\n\n    <accordion *ngFor="let file of files" [data]="file.fileSubject">\n\n      <ion-row>\n\n        <ion-col col-4>\n\n          <ion-label class="tblhed" text-wrap>File Subject:</ion-label>\n\n        </ion-col>\n\n        <ion-col col-8>\n\n          <ion-label text-wrap>{{file.fileSubject}}</ion-label>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col col-4>\n\n          <ion-label class="tblhed" text-wrap>File Number:</ion-label>\n\n        </ion-col>\n\n        <ion-col col-8>\n\n          <ion-label text-wrap>{{file.fileNumber}}</ion-label>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row *ngIf="dashboardType == \'task\'">\n\n        <ion-col col-4>\n\n          <ion-label class="tblhed" text-wrap>Process Name:</ion-label>\n\n        </ion-col>\n\n        <ion-col col-8>\n\n          <ion-label text-wrap>{{file.fileInstanceName}}</ion-label>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row *ngIf="dashboardType == \'task\'">\n\n        <ion-col col-4>\n\n          <ion-label class="tblhed" text-wrap>Initiated Date:</ion-label>\n\n        </ion-col>\n\n        <ion-col col-8>\n\n          <ion-label text-wrap\n\n            >{{file.fileCreatedOn | date: "dd/MM/yyyy HH:mm"}}</ion-label\n\n          >\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row *ngIf="dashboardType == \'task\'">\n\n        <ion-col col-4>\n\n          <ion-label class="tblhed" text-wrap>\n\n            {{params.fileStatus == "Cleared" ? "Cleared On:" : "Received On:"}}\n\n          </ion-label>\n\n        </ion-col>\n\n        <ion-col col-8>\n\n          <ion-label text-wrap\n\n            >{{file.fileActionOn | date: "dd/MM/yyyy HH:mm"}}</ion-label\n\n          >\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row\n\n        *ngIf="dashboardType == \'task\' && params.fileStatus == \'Cleared\'"\n\n      >\n\n        <ion-col col-4>\n\n          <ion-label class="tblhed" text-wrap>\n\n            Sent To:\n\n          </ion-label>\n\n        </ion-col>\n\n        <ion-col col-8>\n\n          <ion-label text-wrap>{{file.sentTo}}</ion-label>\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n      <ion-row\n\n        *ngIf="dashboardType == \'task\' && params.fileStatus != \'Cleared\'"\n\n      >\n\n        <ion-col col-4>\n\n          <ion-label class="tblhed" text-wrap>\n\n            Sent By:\n\n          </ion-label>\n\n        </ion-col>\n\n        <ion-col col-8>\n\n          <ion-label text-wrap>{{file.sentBy}}</ion-label>\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n      <ion-row *ngIf="dashboardType != \'task\'">\n\n        <ion-col col-4>\n\n          <ion-label class="tblhed" text-wrap>Status:</ion-label>\n\n        </ion-col>\n\n        <ion-col col-8>\n\n          <ion-label text-wrap>{{file.fileStatus}}</ion-label>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row *ngIf="dashboardType != \'task\'">\n\n        <ion-col col-4>\n\n          <ion-label class="tblhed" text-wrap>Initiated By:</ion-label>\n\n        </ion-col>\n\n        <ion-col col-8>\n\n          <ion-label text-wrap>{{file.initiatedBy}}</ion-label>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row *ngIf="dashboardType != \'task\'">\n\n        <ion-col col-4>\n\n          <ion-label class="tblhed" text-wrap>Initiated Date:</ion-label>\n\n        </ion-col>\n\n        <ion-col col-8>\n\n          <ion-label text-wrap\n\n            >{{file.initiatedDate | date: "dd/MM/yyyy HH:mm"}}</ion-label\n\n          >\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row *ngIf="dashboardType != \'task\'">\n\n        <ion-col col-4>\n\n          <ion-label class="tblhed" text-wrap>Last Action Taken:</ion-label>\n\n        </ion-col>\n\n        <ion-col col-8>\n\n          <ion-label text-wrap>{{file.lastActionTaken}}</ion-label>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row *ngIf="dashboardType != \'task\'">\n\n        <ion-col col-4>\n\n          <ion-label class="tblhed" text-wrap>Current Owner:</ion-label>\n\n        </ion-col>\n\n        <ion-col col-8>\n\n          <ion-label text-wrap>{{file.currentOwner}}</ion-label>\n\n        </ion-col>\n\n      </ion-row>\n\n    </accordion>\n\n  </ion-list>\n\n  <ion-infinite-scroll (ionInfinite)="loadMore($event)">\n\n    <ion-infinite-scroll-content\n\n      loadingSpinner="bubbles"\n\n      loadingText="Loading more..."\n\n    ></ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n</ion-content>\n\n'/*ion-inline-end:"/workspaces/PRADIP-MOBILE-IONIC/src/pages/dashboard-summary/dashboard-summary.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_adapter_calls_adapter_calls__["a" /* AdapterCallsProvider */]])
    ], DashboardSummaryPage);
    return DashboardSummaryPage;
}());

//# sourceMappingURL=dashboard-summary.js.map

/***/ })

});
//# sourceMappingURL=1.js.map