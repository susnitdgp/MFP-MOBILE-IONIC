import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";
import { ErrorMessagesProvider } from "../error-messages/error-messages";

@Injectable()
export class AlertProvider {
  isActive = false;

  constructor(
    private alertCtrl: AlertController,
    private errorMessages: ErrorMessagesProvider
  ) {}

  showErrorMessage(errorCode: number, errorMsg?) {
    let errorMessage = this.errorMessages.errorMessages["706"];

    if (errorMsg) {
      errorMessage = errorMsg;
    } else if (this.errorMessages.errorMessages.hasOwnProperty(errorCode)) {
      errorMessage = this.errorMessages.errorMessages[errorCode];
    }
    if (!this.isActive) {
      let alert = this.alertCtrl.create({
        message: errorMessage,
        enableBackdropDismiss: false,
        buttons: [
          {
            text: "OK",
            handler: () => {
              alert.dismiss();
              this.isActive = false;
              return false;
            }
          }
        ]
      });
      alert.present();
      this.isActive = true;
    }
  }
}
