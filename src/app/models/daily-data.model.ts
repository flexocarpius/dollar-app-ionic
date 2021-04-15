import { EntryModel } from "./entry.model";

export interface DailyDataModel {
    entry: EntryModel;
    yesterday_entry: EntryModel;
    buy_percent: number;
    sell_percent: number;
}