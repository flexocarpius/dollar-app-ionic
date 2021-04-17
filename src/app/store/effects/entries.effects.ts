import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { iif, of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { TodaySummaryModel } from "src/app/models/weekly-comparison.model";
import { EntryModel } from "../../models/entry.model";
import { ApiService } from "../../services/api.service";
import { loadAllEntries, loadAllEntriesFail, loadAllEntriesSuccess, loadTodaySummary, loadTodaySummaryFail, loadTodaySummarySuccess } from "../actions/entries.actions";
import { AppState } from "../app.state";

@Injectable()
export class EntriesEffects {

    constructor(private actions$: Actions, private store: Store<AppState>, private api: ApiService, private toastController: ToastController) {}

    loadAllEntries$ = createEffect(() => this.actions$.pipe(
        ofType(loadAllEntries),
        mergeMap(() => this.store.select(state => state.entries.entries).pipe(
            mergeMap(entries => iif(
                () => entries && entries.length > 0,
                of(loadAllEntriesSuccess({ entries })),
                this.api.getAllData().pipe(
                    map((data: EntryModel[]) => {
                        return loadAllEntriesSuccess({ entries: data });
                    }),
                    catchError(() => {
                        this.presentToastMessage('Error while loading.');
                        return of(loadAllEntriesFail())
                    })
                )
            ))
        ))
    ));

    loadTodaySummary$ = createEffect(() => this.actions$.pipe(
        ofType(loadTodaySummary),
        mergeMap(() => this.store.select(state => state.entries.summary).pipe(
            mergeMap(summary => iif(
                () => summary && Object.keys(summary).length > 0,
                of(loadTodaySummarySuccess({ summary })),
                this.api.getWeeklyData().pipe(
                    map((data: TodaySummaryModel) => {
                        return loadTodaySummarySuccess({ summary: data });
                    }),
                    catchError(() => {
                        this.presentToastMessage('Error while loading.');
                        return of(loadAllEntriesFail())
                    })
                )
            ))
        ))
    ));

    presentToastMessage(msg: string) {
        this.toastController.create({
            header: msg,
            position: 'bottom',
            buttons: [{
                text: 'Dismiss',
                role: 'cancel',
            }]
        }).then(toast => toast.present());
    }
}