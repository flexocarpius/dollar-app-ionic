import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ComparisonCardComponent } from '../../components/comparison-card/comparison-card.component';
import { EntryRowComponent } from 'src/app/components/entry-row/entry-row.component';
import { LoadingComponentModule } from 'src/app/components/loading/loading.module';
import { WeeklyTableComponentModule } from 'src/app/components/weekly-table/weekly-table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    LoadingComponentModule,
    WeeklyTableComponentModule,
  ],
  declarations: [HomePage, ComparisonCardComponent, EntryRowComponent],
})
export class HomePageModule {}
