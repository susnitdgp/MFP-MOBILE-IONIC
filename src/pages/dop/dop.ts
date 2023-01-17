import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-dop",
  templateUrl: "dop.html"
})
export class DopPage {
  dopContent;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dopContent = navParams.data.dopContent;
  }

  ionViewDidLoad() {}
}
