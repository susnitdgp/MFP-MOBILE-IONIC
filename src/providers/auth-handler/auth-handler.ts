import { Platform } from "ionic-angular";
import { Injectable } from "@angular/core";
import { LoggerProvider } from "../logger/logger";
@Injectable()
export class AuthHandlerProvider {
  userLoginChallengeHandler: WL.Client.SecurityCheckChallengeHandler;
  securityCheckName = "LTPA";
  handleChallengeCallback = null;
  loginSuccessCallback = null;
  loginFailureCallback = null;

  initialized = false;
  authHeader: string;

  constructor(private logger: LoggerProvider, private platform: Platform) {}

  init() {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    this.userLoginChallengeHandler = WL.Client.createSecurityCheckChallengeHandler(
      this.securityCheckName
    );
    // https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
    this.userLoginChallengeHandler.handleChallenge = this.handleChallenge.bind(
      this
    );
    this.userLoginChallengeHandler.handleSuccess = this.handleSuccess.bind(
      this
    );
    this.userLoginChallengeHandler.handleFailure = this.handleFailure.bind(
      this
    );
    this.logout();
  }

  handleChallenge(challenge) {
    this.logout();
    this.userLoginChallengeHandler.cancel();
    this.logger.debug("handleChallenge", challenge);
    this.handleChallengeCallback(challenge);
  }

  setHandleChallengeCallback(onHandleChallenge) {
    this.handleChallengeCallback = onHandleChallenge;
  }

  setLoginSuccessCallback(onSuccess) {
    this.loginSuccessCallback = onSuccess;
  }

  setLoginFailureCallback(onFailure) {
    this.loginFailureCallback = onFailure;
  }

  handleSuccess(data) {
    if (this.loginSuccessCallback != null) {
      this.loginSuccessCallback(data);
    }
  }

  handleFailure(error) {
    this.userLoginChallengeHandler.cancel();
    if (this.loginFailureCallback != null) {
      this.loginFailureCallback(error);
    }
  }

  login(credentials) {
    let authHeader =
      "Basic " + btoa(credentials.username + ":" + credentials.password);
    WL.Client.addGlobalHeader("Authorization", authHeader);

    WLAuthorizationManager.login(this.securityCheckName, credentials).then(
      (success) => {
        WL.Client.removeGlobalHeader("Authorization");
      },
      (failure) => {
        this.loginFailureCallback(failure);
        this.logger.debug(failure);
      }
    );
  }

  logout() {
    WLAuthorizationManager.logout(this.securityCheckName).then(
      (success) => {
        this.logger.debug(
          "--> AuthHandler: logout success" + JSON.stringify(success)
        );
      },
      (failure) => {
        this.logger.debug(
          "--> AuthHandler: logout failure: " + JSON.stringify(failure)
        );
      }
    );

    WL.Client.clearCookieSession().then(
      (success) => {
        this.logger.debug("clearCookieSession", success);
      },
      (error) => {
        this.logger.debug(error);
      }
    );

    if (this.platform.is("ios")) {
      WL.Client.deleteCookie("LtpaToken2").then(
        (success) => {
          this.logger.debug("deleteCookie", success);
        },
        (error) => {
          this.logger.debug(error);
        }
      );
    }
  }
}
