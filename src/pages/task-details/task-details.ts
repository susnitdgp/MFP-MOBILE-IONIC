import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-task-details",
  templateUrl: "task-details.html",
})
export class TaskDetailsPage {
  metaDataRoot = "MetaDataPage";
  filesRoot = "FilesPage";
  actionHistoryRoot = "ActionHistoryPage";
  approvalRoot = "ApprovalPage";
  taskDetails;
  empNo: any;
  taskId: any;
  oldTaskMessage;
  isApprovedFile;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.taskDetails = this.navParams.data.taskDetails;
    this.empNo = this.navParams.data.empNo;
    this.taskId = this.navParams.data.taskId;
    this.oldTaskMessage = this.navParams.data.oldTaskMessage;
    this.isApprovedFile = this.navParams.data.isApprovedFile;
  }
}
