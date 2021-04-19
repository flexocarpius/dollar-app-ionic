import { createAction, props } from "@ngrx/store";
import { EntryModel } from "src/app/models/entry.model";
import { TodaySummaryModel } from "src/app/models/weekly-comparison.model";

export const loadAllEntries = createAction(
    '[ENTRIES] Load all entries'
);

export const loadAllEntriesSuccess = createAction(
    '[ENTRIES] Load all entries success',
    props<{ entries: EntryModel[]; }>()
);

export const loadAllEntriesFail = createAction(
    '[ENTRIES] Load all entries fail'
);

export const loadTodaySummary = createAction(
    '[ENTRIES] Load today summary'
);

export const loadTodaySummarySuccess = createAction(
    '[ENTRIES] Load today summary success',
    props<{ summary: TodaySummaryModel; }>()
);

export const loadTodaySummaryFail = createAction(
    '[ENTRIES] Load today summary fail'
);

export const resetTodaySummary = createAction(
    '[ENTRIES] Reset Today Summary'
);