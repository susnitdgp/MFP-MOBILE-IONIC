import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
} from "ionic-angular";
import { AuthHandlerProvider } from "../../providers/auth-handler/auth-handler";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LoaderProvider } from "../../providers/loader/loader";
import { AlertProvider } from "../../providers/alert/alert";
import { LoggerProvider } from "../../providers/logger/logger";
import { DomSanitizer } from "@angular/platform-browser";

@IonicPage()
@Component({
  selector: "page-ldap-login",
  templateUrl: "ldap-login.html",
})
export class LdapLoginPage {
  passwordInputType = "password";
  form: FormGroup;
  formErrorMessages = {
    username: [
      {
        type: "required",
        code: 701,
      },
      { type: "pattern", code: 722 },
      {
        type: "minlength",
        code: 724,
      },
      {
        type: "maxlength",
        code: 724,
      },
    ],
    password: [
      {
        type: "required",
        code: 702,
      },
      { type: "pattern", code: 723 },
      {
        type: "minlength",
        code: 723,
      },
      {
        type: "maxlength",
        code: 723,
      },
    ],
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authHandler: AuthHandlerProvider,
    private loader: LoaderProvider,
    private alert: AlertProvider,
    private logger: LoggerProvider,
    private alertCtrl: AlertController,
    private sanitizer: DomSanitizer
  ) {
    this.authHandler.setLoginSuccessCallback((user) => {
      this.logger.debug(user);
      if (user.user && user.user.id) {
        if (this.navCtrl.getActive().name == "LdapLoginPage") {
          this.loader.dismissLoading();
          // if (this.navCtrl.canGoBack()) {
          //   this.navCtrl.pop();
          // }
          // else {
          this.navCtrl.setRoot("OtpLoginPage", user.user);
          // }
        } else {
          this.logger.debug("Login state");
        }
      } else {
        this.alert.showErrorMessage(706);
      }
    });

    this.authHandler.setHandleChallengeCallback((challenge) => {
      this.loader.dismissLoading();
      if (challenge.errorCode) {
        this.alert.showErrorMessage(challenge.errorCode);
      } else {
        this.alert.showErrorMessage(799);
      }
      if (this.navCtrl.getActive().name != "LdapLoginPage") {
        this.navCtrl.push(LdapLoginPage);
      }
    });

    this.authHandler.setLoginFailureCallback((error) => {
      logger.debug(error);
      this.loader.dismissLoading();
      if (error.status) {
        this.alert.showErrorMessage(error.status);
      } else if (error.errorCode) {
        this.alert.showErrorMessage(error.errorCode);
      } else {
        this.alert.showErrorMessage(799);
      }
      if (this.navCtrl.getActive().name != "LdapLoginPage") {
        this.navCtrl.setRoot(LdapLoginPage);
      }
    });

    this.form = new FormGroup({
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.pattern("[a-zA-Z0-9.]*"),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30),
        Validators.pattern("[a-zA-Z0-9!@#$%^&*]*"),
      ]),
    });
  }

  processForm() {
    let username = this.form.value.username;
    let password = this.form.value.password;
    if (username == "" && password == "") {
      this.alert.showErrorMessage(700);
      return;
    }
    if (this.form.valid) {
      let credentials = {
        username: username,
        password: password,
      };
      this.loader.showLoading();
      this.authHandler.login(credentials);
    } else {
      this.formErrorMessages.username.forEach((validation) => {
        if (this.form.get("username").hasError(validation.type)) {
          this.alert.showErrorMessage(validation.code);
        }
      });
      this.formErrorMessages.password.forEach((validation) => {
        if (this.form.get("password").hasError(validation.type)) {
          this.alert.showErrorMessage(validation.code);
        }
      });
    }
  }

  togglePasswordInputType(input) {
    this.passwordInputType =
      this.passwordInputType == "password" ? "text" : "password";

    input.setFocus();
  }

  showContactUsPopup() {
    let contactUsPopup = this.alertCtrl.create({
      subTitle: "For any issue may please contact",
      message: <any>this.getContactUsContent(),
      buttons: [
        {
          text: "OK",
          handler: () => {
            contactUsPopup.dismiss();
            return false;
          },
        },
      ],
    });
    contactUsPopup.present();
  }

  getContactUsContent() {
    return this.sanitizer.bypassSecurityTrustHtml(
      "<ion-row><ion-icon name='phone'></ion-icon>  Mobile: <a href='tel:1800-102-5970'>1800-102-5970</a></ion-row> <br /><br /><ion-row><ion-icon name='mail'></ion-icon> Email: <a href='mailto:ecm@ntpc.co.in'>ecm@ntpc.co.in</a></ion-row>"
    );
  }
}
