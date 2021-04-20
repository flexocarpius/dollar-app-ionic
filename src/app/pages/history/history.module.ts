import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryPageRoutingModule } from './history-routing.module';

import { HistoryPage } from './history.page';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { LoadingComponentModule } from '../../components/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryPageRoutingModule,
    NgxDaterangepickerMd.forRoot(),
    LoadingComponentModule
  ],
  declarations: [HistoryPage]
})
export class HistoryPageModule {}
