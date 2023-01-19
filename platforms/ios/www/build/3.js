webpackJsonp([3],{

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserSearchFilterPageModule", function() { return UserSearchFilterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_search_filter__ = __webpack_require__(440);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var UserSearchFilterPageModule = /** @class */ (function () {
    function UserSearchFilterPageModule() {
    }
    UserSearchFilterPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__user_search_filter__["a" /* UserSearchFilterPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__user_search_filter__["a" /* UserSearchFilterPage */]),
            ],
        })
    ], UserSearchFilterPageModule);
    return UserSearchFilterPageModule;
}());

//# sourceMappingURL=user-search-filter.module.js.map

/***/ }),

/***/ 440:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserSearchFilterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_alert_alert__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserSearchFilterPage = /** @class */ (function () {
    function UserSearchFilterPage(navCtrl, navParams, viewCtrl, alert, zone) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alert = alert;
        this.zone = zone;
        this.selectedFilter = "plantCode";
        this.filters = {
            selectedPlant: "",
            selectedDepartment: "",
            selectedDesignation: ""
        };
        this.plants = [];
        this.departments = [];
        this.designations = [];
        this.userSearchResults = this.navParams.data;
        this.plants = Array.from(new Set(this.userSearchResults.map(function (user) {
            if (user.empPSA)
                return user.empPSA;
        }))).slice();
        this.departments = Array.from(new Set(this.userSearchResults.map(function (user) {
            if (user.empDepartmentName)
                return user.empDepartmentName;
        }))).slice();
        this.designations = Array.from(new Set(this.userSearchResults.map(function (user) {
            if (user.empDesignation)
                return user.empDesignation;
        }))).slice();
    }
    UserSearchFilterPage.prototype.ionViewDidLoad = function () { };
    UserSearchFilterPage.prototype.clearFilter = function () {
        this.viewCtrl.dismiss();
    };
    UserSearchFilterPage.prototype.applyFilter = function () {
        if (this.filters.selectedDepartment ||
            this.filters.selectedDesignation ||
            this.filters.selectedPlant) {
            this.viewCtrl.dismiss(this.filters);
        }
        else {
            this.alert.showErrorMessage(711);
        }
    };
    UserSearchFilterPage.prototype.onSegmentChange = function () {
        this.zone.run(function () { });
    };
    UserSearchFilterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-user-search-filter",template:/*ion-inline-start:"/workspaces/PRADIP-MOBILE-IONIC/src/pages/user-search-filter/user-search-filter.html"*/'<ion-header>\n\n  <ion-toolbar>\n\n    <ion-segment\n\n      [(ngModel)]="selectedFilter"\n\n      color="primary"\n\n      (ionChange)="onSegmentChange()"\n\n    >\n\n      <ion-segment-button value="plantCode">\n\n        PLANT CODE\n\n      </ion-segment-button>\n\n      <ion-segment-button value="department">\n\n        DEPARTMENT\n\n      </ion-segment-button>\n\n      <ion-segment-button value="designation">\n\n        DESIGNATION\n\n      </ion-segment-button>\n\n    </ion-segment>\n\n  </ion-toolbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ng-container *ngIf="selectedFilter == \'plantCode\'">\n\n    <ion-list radio-group no-lines [(ngModel)]="filters.selectedPlant">\n\n      <ion-item *ngFor="let plant of plants">\n\n        <ion-radio mode="md" item-left [value]="plant"></ion-radio>\n\n        <ion-label>{{plant}}</ion-label>\n\n      </ion-item>\n\n    </ion-list>\n\n  </ng-container>\n\n  <ng-container *ngIf="selectedFilter == \'department\'">\n\n    <ion-list radio-group no-lines [(ngModel)]="filters.selectedDepartment">\n\n      <ion-item *ngFor="let department of departments">\n\n        <ion-radio mode="md" item-left [value]="department"></ion-radio>\n\n        <ion-label>{{department}}</ion-label>\n\n      </ion-item>\n\n    </ion-list>\n\n  </ng-container>\n\n  <ng-container *ngIf="selectedFilter == \'designation\'">\n\n    <ion-list radio-group no-lines [(ngModel)]="filters.selectedDesignation">\n\n      <ion-item *ngFor="let designation of designations">\n\n        <ion-radio mode="md" item-left [value]="designation"></ion-radio>\n\n        <ion-label>{{designation}}</ion-label>\n\n      </ion-item>\n\n    </ion-list>\n\n  </ng-container>\n\n</ion-content>\n\n<ion-footer color="light" ion-row justify-content-end>\n\n  <button ion-button round color="danger" (click)="clearFilter()">\n\n    Clear\n\n  </button>\n\n  <button ion-button round color="primary" (click)="applyFilter()">\n\n    Apply\n\n  </button>\n\n</ion-footer>\n\n'/*ion-inline-end:"/workspaces/PRADIP-MOBILE-IONIC/src/pages/user-search-filter/user-search-filter.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_alert_alert__["a" /* AlertProvider */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]])
    ], UserSearchFilterPage);
    return UserSearchFilterPage;
}());

//# sourceMappingURL=user-search-filter.js.map

/***/ })

});
//# sourceMappingURL=3.js.map