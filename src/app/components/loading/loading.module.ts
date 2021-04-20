import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { LoadingComponent } from "./loading.component";

@NgModule({
    declarations: [LoadingComponent],
    exports: [LoadingComponent],
    imports: [IonicModule.forRoot()]
})
export class LoadingComponentModule {
}