import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ComparisonCardComponent } from '../../components/comparison-card/comparison-card.component';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { WeeklyTableComponent } from 'src/app/components/weekly-table/weekly-table.component';
import { EntryRowComponent } from 'src/app/components/entry-row/entry-row.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, ComparisonCardComponent, LoadingComponent, WeeklyTableComponent, EntryRowComponent]
})
export class HomePageModule {}
