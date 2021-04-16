import { combineReducers } from "@ngrx/store";
import { entriesReducer } from '../reducers/entries.reducers';

export const reducers = combineReducers({
    entries: entriesReducer
});