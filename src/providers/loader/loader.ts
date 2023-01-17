import { Injectable } from "@angular/core";
import { LoadingController, Loading } from "ionic-angular";

@Injectable()
export class LoaderProvider {
  loader: Loading;
  isShowing: boolean = false;
  constructor(private loading: LoadingController) {}

  showLoading() {
    if (this.isShowing) {
      this.loader.dismiss();
    }
    this.loader = this.loading.create({
      spinner: "bubbles",
      content: "Loading..."
    });
    this.loader.present();
    this.isShowing = true;
  }

  dismissLoading() {
    try {
      if (this.isShowing) {
        this.loader.dismiss().catch(error => {
          console.log("Error dismissing the loader");
        });
        this.isShowing = false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  isActive(): boolean {
    return this.isShowing;
  }
}
