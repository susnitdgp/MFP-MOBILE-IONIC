import { Component, NgZone } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { AlertProvider } from "../../providers/alert/alert";

@IonicPage()
@Component({
  selector: "page-user-search-filter",
  templateUrl: "user-search-filter.html"
})
export class UserSearchFilterPage {
  userSearchResults;
  selectedFilter = "plantCode";
  filters = {
    selectedPlant: "",
    selectedDepartment: "",
    selectedDesignation: ""
  };
  plants: any = [];
  departments: any = [];
  designations: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private alert: AlertProvider,
    private zone: NgZone
  ) {
    this.userSearchResults = this.navParams.data;
    this.plants = [
      ...Array.from(
        new Set(
          this.userSearchResults.map(user => {
            if (user.empPSA) return user.empPSA;
          })
        )
      )
    ];
    this.departments = [
      ...Array.from(
        new Set(
          this.userSearchResults.map(user => {
            if (user.empDepartmentName) return user.empDepartmentName;
          })
        )
      )
    ];
    this.designations = [
      ...Array.from(
        new Set(
          this.userSearchResults.map(user => {
            if (user.empDesignation) return user.empDesignation;
          })
        )
      )
    ];
  }

  ionViewDidLoad() {}

  clearFilter() {
    this.viewCtrl.dismiss();
  }

  applyFilter() {
    if (
      this.filters.selectedDepartment ||
      this.filters.selectedDesignation ||
      this.filters.selectedPlant
    ) {
      this.viewCtrl.dismiss(this.filters);
    } else {
      this.alert.showErrorMessage(711);
    }
  }

  onSegmentChange() {
    this.zone.run(() => {});
  }
}
