import { NgModule } from "@angular/core";
import { WeeklyTableComponent } from "./weekly-table.component";
import { IonicModule } from "@ionic/angular";
import { LoadingComponentModule } from "../loading/loading.module";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [WeeklyTableComponent],
    exports: [WeeklyTableComponent],
    imports: [CommonModule, IonicModule.forRoot(), LoadingComponentModule]
})
export class WeeklyTableComponentModule {}