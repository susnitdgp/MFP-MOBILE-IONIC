import { Injectable } from "@angular/core";

@Injectable()
export class LoggerProvider {
  isProd = false;

  constructor() {
  }

  debug(...message) {
    console.log(...message);
  }
}
