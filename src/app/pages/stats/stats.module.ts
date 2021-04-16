import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatsPageRoutingModule } from './stats-routing.module';

import { StatsPage } from './stats.page';
import { ChartsModule } from 'ng2-charts';
import { LoadingComponent } from '../../components/loading/loading.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatsPageRoutingModule,
    ChartsModule
  ],
  declarations: [StatsPage, LoadingComponent]
})
export class StatsPageModule {}
