import { Injectable } from "@angular/core";
import { AlertProvider } from "../alert/alert";
import { LoggerProvider } from "../logger/logger";
// declare var WLResourceRequest;

@Injectable()
export class AdapterCallsProvider {
  constructor(private alert: AlertProvider, private logger: LoggerProvider) {}

  processPostRequest(endpoint, payload): Promise<any> {
    this.logger.debug(payload);
    let options: any = {
      timeout: 45000,
      scope: "PradipScope"
    };
    let dataRequest = new WLResourceRequest(
      endpoint,
      WLResourceRequest.POST,
      options
    );
    return new Promise((resolve, reject) => {
      dataRequest.sendFormParameters(payload).then(
        response => {
          this.logger.debug(response);
          resolve(response.responseJSON);
        },
        error => {
          this.showErrorMessage(error);
          reject(error);
        }
      );
    });
  }

  processGetRequest(
    endpoint: string,
    queryParams: Array<{ queryParamName: string; queryParamValue: string }>,
    returnHeaders?: Boolean
  ): Promise<any> {
    this.logger.debug("endpoint", endpoint);

    let options: any = {
      timeout: 45000,
      scope: "PradipScope"
    };
    let dataRequest = new WLResourceRequest(
      endpoint,
      WLResourceRequest.GET,
      options
    );
    queryParams.forEach(element => {
      this.logger.debug(
        "queryParams",
        decodeURIComponent(element.queryParamValue)
      );
      dataRequest.setQueryParameter(
        element.queryParamName,
        element.queryParamValue
      );
    });
    return new Promise((resolve, reject) => {
      dataRequest.send().then(
        response => {
          this.logger.debug(response);
          returnHeaders ? resolve(response) : resolve(response.responseJSON);
        },
        error => {
          this.showErrorMessage(error);
          reject(error);
        }
      );
    });
  }

  callUnprotectedAdapterResource(endpoint): Promise<any> {
    let options: any = {
      timeout: 45000
    };
    let dataRequest = new WLResourceRequest(
      endpoint,
      WLResourceRequest.GET,
      options
    );
    return new Promise((resolve, reject) => {
      dataRequest.send().then(
        response => {
          this.logger.debug(response);
          resolve(response);
        },
        error => {
          this.showErrorMessage(error);
          reject(error);
        }
      );
    });
  }

  showErrorMessage(error) {
    if (error.errorCode) {
      if (error.errorCode == 199) {
        this.alert.showErrorMessage(error.errorCode, error.errorMsg);
      }
      this.alert.showErrorMessage(error.errorCode);
    } else {
      this.alert.showErrorMessage(706);
    }
  }
}
