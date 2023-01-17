import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform } from "ionic-angular";
import { AdapterCallsProvider } from "../../providers/adapter-calls/adapter-calls";
import { LoggerProvider } from "../../providers/logger/logger";
import { LoaderProvider } from "../../providers/loader/loader";
import { AuthHandlerProvider } from "../../providers/auth-handler/auth-handler";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AlertProvider } from "../../providers/alert/alert";

declare var window;
@IonicPage()
@Component({
  selector: "page-otp-login",
  templateUrl: "otp-login.html",
})
export class OtpLoginPage {
  userId;
  otpForm: FormGroup;
  otp: any = ["", "", "", ""];
  timerText;
  numberOfResendOTPTries = 0;
  authenticatedUser: any;
  disableButtons = true;
  resendOTPButtonText: string = "Resend OTP";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private adapter: AdapterCallsProvider,
    private authHandler: AuthHandlerProvider,
    private logger: LoggerProvider,
    private loader: LoaderProvider,
    private alert: AlertProvider,
    private platform: Platform
  ) {
    if (this.platform.is("android")) {
      this.startListeningSMS();
    }

    this.authenticatedUser = navParams.data;
    this.userId = this.authenticatedUser.id;
    this.otpForm = new FormGroup({
      otp1: new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9]"),
        Validators.minLength(1),
        Validators.maxLength(1),
      ]),
      otp2: new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9]"),
        Validators.minLength(1),
        Validators.maxLength(1),
      ]),
      otp3: new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9]"),
        Validators.minLength(1),
        Validators.maxLength(1),
      ]),
      otp4: new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9]"),
        Validators.minLength(1),
        Validators.maxLength(1),
      ]),
    });
  }

  startListeningSMS() {
    try {
      const smsRetriever: any = window.cordova.plugins.smsRetriever;
      // smsRetriever["getAppHash"](
      //   (res) => {
      //     // this.appHashString = res;
      //     console.log("App Hash", res);
      //   },
      //   (err) => {
      //     console.warn(err);
      //   }
      // );
      // SMSReceive.startWatch(
      //   () => {
      //     document.addEventListener("onSMSArrive", (sms: any) => {
      //       const incomingSMS = sms.data;
      //       this.processSMS(incomingSMS);
      //     });
      //   },
      //   () => {
      //     this.logger.debug("watch start failed");
      //   }
      // );
      // const smsRetriever: any = window.cordova.plugins.smsRetriever;
      smsRetriever["startWatching"](
        (res) => {
          this.processSMS(res);
        },
        (err) => {
          console.warn(err);
        }
      );
    } catch (error) {
      this.logger.debug(error);
    }
  }

  stopListeningSMS() {
    // try {
    //   SMSReceive.stopWatch(
    //     () => {
    //       this.logger.debug("watch stopped");
    //     },
    //     () => {
    //       this.logger.debug("watch stop failed");
    //     }
    //   );
    // } catch (error) {
    //   this.logger.debug(error);
    // }
  }

  processSMS(sms) {
    try {
      const smsBody = sms.Message;
      const otp = smsBody.slice(4, 8);
      if (!isNaN(otp)) {
        const otpArray = otp.split("");
        this.otp = otpArray;
        this.validateOTP(true);
      }
    } catch (error) {
      this.logger.debug("Error detecting OTP");
    }
  }

  ionViewDidLoad() {
    this.startTimer();
    this.startResendOTPTimer();
  }

  validateOTP(preValidated) {
    if (!preValidated && !this.otpForm.valid) {
      this.alert.showErrorMessage(719);
      return;
    }

    let otp = this.otp.join("");
    if (otp && otp.length == 4 && !isNaN(otp)) {
      let params = {
        userId: this.userId,
        otp: otp,
      };
      this.loader.showLoading();
      this.adapter
        .processPostRequest("/adapters/otp/resource/validateOTP", params)
        .then(
          (response) => {
            if (response.isValid) {
              this.stopListeningSMS();
              if (response.userConsent) {
                this.logger.debug(this.navCtrl.getActive().name);
                if (this.navCtrl.getActive().name == "OtpLoginPage") {
                  this.navCtrl.popToRoot();
                  this.navCtrl.setRoot("InboxPage", this.authenticatedUser);
                }
              } else {
                const navData = {
                  termsAndConditions: response.termsAndConditionsData,
                  user: this.authenticatedUser,
                  showButtons: true,
                };
                this.navCtrl.popToRoot();
                this.navCtrl.setRoot("TermsAndConditionsPage", navData);
              }
            } else {
              this.loader.dismissLoading();
              this.alert.showErrorMessage(707);
            }
          },
          (error) => {
            this.loader.dismissLoading();
            this.logger.debug(error);
          }
        );
    } else {
      if (otp.length != 4) {
        this.alert.showErrorMessage(703);
      } else {
        this.alert.showErrorMessage(719);
      }
    }
  }

  otpInputController(event, nextElement, prevElement) {
    // if (event.target.value.length > 1) {
    //   let val = event.target.value.toString().slice(0, -1);
    //   event.target.value = parseInt(val);
    // }
    if (event.target.value.length < 1 && prevElement) {
      prevElement.setFocus();
    } else if (nextElement && event.target.value.length > 0) {
      nextElement.setFocus();
    } else {
      return 0;
    }
  }

  goBack() {
    this.authHandler.logout();
    this.navCtrl.setRoot("LdapLoginPage");
  }

  resendOTP() {
    this.loader.showLoading();
    this.adapter
      .callUnprotectedAdapterResource(
        "/adapters/MobilitySMSAdapter/resource/sendOTP?empnum=" + this.userId
      )
      .then(
        (response) => {
          this.loader.dismissLoading();
          this.numberOfResendOTPTries++;
          this.startResendOTPTimer();
          this.alert.showErrorMessage(717);
        },
        (error) => {
          this.loader.dismissLoading();
          this.alert.showErrorMessage(718);
          this.logger.debug(error);
        }
      );
  }

  startTimer() {
    let timerSeconds = 300;
    let timer = setInterval(() => {
      this.timerText = this.getMinutesAndSeconds(timerSeconds);
      if (timerSeconds < 1) {
        clearInterval(timer);
        if (this.navCtrl.getActive().name == "OtpLoginPage") {
          this.goBack();
        }
      }
      timerSeconds--;
    }, 1000);
  }

  getMinutesAndSeconds(inputSeconds) {
    const secNum = parseInt(inputSeconds.toString(), 10);
    const hours = Math.floor(secNum / 3600);
    const minutes = Math.floor((secNum - hours * 3600) / 60);
    const seconds = secNum - hours * 3600 - minutes * 60;
    let minutesString = "";
    let secondsString = "";
    minutesString = minutes < 10 ? "0" + minutes : minutes.toString();
    secondsString = seconds < 10 ? "0" + seconds : seconds.toString();
    return minutesString + ":" + secondsString;
  }

  startResendOTPTimer() {
    this.disableButtons = true;
    let timerSeconds = 20;
    let timer = setInterval(() => {
      this.resendOTPButtonText = "Resend OTP in " + timerSeconds + " sec";
      if (timerSeconds < 1) {
        clearInterval(timer);
        this.disableButtons = false;
        this.resendOTPButtonText = "Resend OTP";
      }
      timerSeconds--;
    }, 1000);
  }
}
