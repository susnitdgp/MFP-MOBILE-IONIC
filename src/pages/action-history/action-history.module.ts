import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ActionHistoryPage } from "./action-history";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [ActionHistoryPage],
  imports: [IonicPageModule.forChild(ActionHistoryPage), ComponentsModule]
})
export class ActionHistoryPageModule {}
