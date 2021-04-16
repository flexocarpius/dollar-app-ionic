import { DailyDataModel } from "./daily-data.model";
import { EntryModel } from "./entry.model";

export interface TodaySummaryModel {
    entry: EntryModel;
    yesterday_entry: EntryModel;
    buy_percent: number;
    sell_percent: number;
    week_entries: DailyDataModel[];
}