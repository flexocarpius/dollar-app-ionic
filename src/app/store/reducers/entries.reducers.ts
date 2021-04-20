import { createReducer, on } from "@ngrx/store";
import { EntryModel } from "src/app/models/entry.model";
import { TodaySummaryModel } from "src/app/models/weekly-comparison.model";
import { loadAllEntries, loadAllEntriesFail, loadAllEntriesSuccess, loadTodaySummary, loadTodaySummaryFail, loadTodaySummarySuccess, resetTodaySummary } from "../actions/entries.actions";

export interface EntriesState {
    loading: boolean;
    entries: EntryModel[];
    summary: TodaySummaryModel;
}

export const initialState: EntriesState = {
    loading: false,
    entries: null,
    summary: null
};
 
const _entriesReducer = createReducer(
  initialState,
  on(loadAllEntries, (state) => ({ ...state, loading: true })),
  on(loadAllEntriesSuccess, (state, { entries }) => ({ ...state, loading: false, entries })),
  on(loadAllEntriesFail, (state) => ({ ...state, loading: false })),
  on(loadTodaySummary, (state) => ({ ...state, loading: true })),
  on(loadTodaySummarySuccess, (state, { summary }) => ({ ...state, loading: false, summary })),
  on(loadTodaySummaryFail, (state) => ({ ...state, loading: false })),
  on(resetTodaySummary, (state) => ({ ...state, loading: false, summary: null }))
);
 
export function entriesReducer(state, action) {
  return _entriesReducer(state, action);
}