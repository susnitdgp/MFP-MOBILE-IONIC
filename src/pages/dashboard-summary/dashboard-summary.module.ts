import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { DashboardSummaryPage } from "./dashboard-summary";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [DashboardSummaryPage],
  imports: [IonicPageModule.forChild(DashboardSummaryPage), ComponentsModule]
})
export class DashboardSummaryPageModule {}
