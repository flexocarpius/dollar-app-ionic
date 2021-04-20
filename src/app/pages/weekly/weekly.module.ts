import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeeklyPage } from './weekly.page';
import { ChartsModule } from 'ng2-charts';
import { WeeklyPageRoutingModule } from './weekly-routing.module';
import { WeeklyTableComponentModule } from '../../components/weekly-table/weekly-table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeeklyPageRoutingModule,
    ChartsModule,
    WeeklyTableComponentModule
  ],
  declarations: [WeeklyPage]
})
export class WeeklyPageModule {}
