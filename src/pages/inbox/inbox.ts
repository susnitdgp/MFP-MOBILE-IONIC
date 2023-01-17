import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
} from "ionic-angular";
import { AdapterCallsProvider } from "../../providers/adapter-calls/adapter-calls";
import { LoggerProvider } from "../../providers/logger/logger";
import { LoaderProvider } from "../../providers/loader/loader";
import { AuthHandlerProvider } from "../../providers/auth-handler/auth-handler";

@IonicPage()
@Component({
  selector: "page-inbox",
  templateUrl: "inbox.html",
})
export class InboxPage {
  tasksEmptyText = "Pull down to refresh";
  arrowIcons = {
    upEmpty: "../../assets/imgs/up-arrow.png",
    downFilled: "../../assets/imgs/fill-down-arrow.png",
    upFilled: "../../assets/imgs/fill-up-arrow.png",
    downEmpty: "../../assets/imgs/down-arrow.png",
  };
  sortArrows = {
    up: this.arrowIcons.upEmpty,
    down: this.arrowIcons.downFilled,
  };
  tasks = [];
  senders = [];
  filterBySenderValue = "";
  tasksUICopy = [];
  inboxCount = 0;
  authenticatedUser;
  userDashboardVisibility;
  firstTime = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private adapter: AdapterCallsProvider,
    private logger: LoggerProvider,
    private loader: LoaderProvider,
    private authHandler: AuthHandlerProvider,
    private alertController: AlertController
  ) {
    this.authenticatedUser = navParams.data;
    this.getDashboardVisibilities();
  }

  getDashboardVisibilities() {
    this.adapter
      .processGetRequest("/adapters/BPM/resource/getDashboardVisibilities", [])
      .then((response) => {
        this.userDashboardVisibility = response.data.data.dashboardVisibility;
      })
      .catch((error) => {
        this.logger.debug(error);
      });
  }

  ionViewDidEnter() {
    this.tasks = [];
    this.tasksUICopy = [];
    this.loadTasks();
  }

  loadTasks(infiniteScroll?) {
    this.loader.showLoading();

    this.adapter
      .processGetRequest(
        "/adapters/BPM/resource/getInbox/" + this.tasks.length,
        [],
        true
      )
      .then((response) => {
        this.loader.dismissLoading();
        this.logger.debug(response);
        let resHeaders = response.responseHeaders;
        if (this.firstTime && resHeaders.announcement) {
          this.showAnnouncement(resHeaders.announcement);
          this.firstTime = false;
        }
        let resJSON = response.responseJSON;
        this.inboxCount = resJSON.data.totalCount;
        const tasks = resJSON.data.items;
        if (!tasks || tasks.length == 0) {
          this.tasksEmptyText = "Inbox is empty";
        } else {
          this.tasks.push(...tasks);
          this.senders = [
            ...Array.from(new Set(this.tasks.map((task) => task.BD_SENT_BY))),
          ];

          if (this.filterBySenderValue) {
            this.filterBySender();
          } else {
            this.tasksUICopy.push(...tasks);
          }
        }
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      })
      .catch((error) => {
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
        this.logger.debug(error);
        this.loader.dismissLoading();
      });
  }

  showTaskDetails(task) {
    this.logger.debug(task);
    this.loader.showLoading();
    this.adapter
      .processGetRequest(
        "/adapters/BPM/resource/getTaskDetails/" +
          task["TASK.TKIID"],
        [],
        true
      )
      .then(
        (response) => {
          this.logger.debug(response);
          this.loader.dismissLoading();
          const taskSubject = task.TAD_DISPLAY_NAME;
          const isApprovedFile =
            taskSubject.includes("Approved") ||
            taskSubject.includes("Rejected");
          const navData = {
            empNo: this.authenticatedUser.id,
            taskDetails: response.responseJSON.data,
            taskId: task["TASK.TKIID"],
            oldTaskMessage: response.responseHeaders.oldtaskmessage,
            isApprovedFile: isApprovedFile,
          };
          this.navCtrl.push("TaskDetailsPage", navData);
        },
        (error) => {
          this.logger.debug(error);
          this.loader.dismissLoading();
        }
      );
  }

  goToDashBoard() {
    this.navCtrl.push("DashboardPage", this.userDashboardVisibility);
  }

  showUserProfile() {
    this.loader.showLoading();
    this.adapter
      .processGetRequest(
        "/adapters/userDetails/" + this.authenticatedUser.id,
        []
      )
      .then((response) => {
        this.loader.dismissLoading();
        this.navCtrl.push("UserProfilePage", response);
      })
      .catch((error) => {
        this.loader.dismissLoading();
        this.logger.debug(error);
      });
  }

  reverseSort() {
    this.loader.showLoading();
    if (this.sortArrows.up == this.arrowIcons.upEmpty) {
      this.logger.debug("Latest first");
      this.sortArrows.up = this.arrowIcons.upFilled;
      this.sortArrows.down = this.arrowIcons.downEmpty;
    } else {
      this.logger.debug("Latest last");
      this.sortArrows.up = this.arrowIcons.upEmpty;
      this.sortArrows.down = this.arrowIcons.downFilled;
    }
    this.tasksUICopy.reverse();
    this.loader.dismissLoading();
  }

  filterBySender() {
    if (this.filterBySenderValue) {
      this.tasksUICopy = this.tasks.filter(
        (task) => task.BD_SENT_BY === this.filterBySenderValue
      );
      this.logger.debug(this.tasksUICopy);
    }
  }

  clearFilters() {
    this.filterBySenderValue = "";
    this.tasksUICopy = this.tasks;
    this.logger.debug(this.tasksUICopy);
  }

  refreshTasks(event) {
    this.tasks = [];
    this.tasksUICopy = [];
    this.loadTasks(event);
  }

  logout() {
    let logoutCheckAlert = this.alertController.create({
      message: "Are you sure you want to logout?",
      buttons: [
        {
          text: "NO",
          role: "cancel",
          handler: () => {
            logoutCheckAlert.dismiss();
            return false;
          },
        },
        {
          text: "YES",
          handler: () => {
            logoutCheckAlert.dismiss();
            this.authHandler.logout();
            this.navCtrl.setRoot("LdapLoginPage");
            return false;
          },
        },
      ],
    });
    logoutCheckAlert.present();
  }

  showAnnouncement(message) {
    let announcement = message.split("|");
    if (!announcement[0] || !announcement[1]) {
      return;
    }
    let announcementAlert = this.alertController.create({
      title: announcement[0],
      message: announcement[1],
      buttons: [
        {
          text: "OK",
          handler: () => {
            announcementAlert.dismiss();
            return false;
          },
        },
      ],
    });
    announcementAlert.present();
  }
}
