// reducers.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CardData {
  id: string;
  title: string;
  average_percent: string;
}

interface DataItem {
  week: number;
  interval_date: string;
  data_count: number;
  percent: string;
}

interface CacheState {
  allData: CardData | null;
  bandungData: CardData | null;
  nonBandungData: CardData | null;
  pwkData: CardData | null;
  chartData?: DataItem[] | null; // Make chartData optional
}

const initialState: CacheState = {
  allData: null,
  bandungData: null,
  nonBandungData: null,
  pwkData: null,
  chartData: null,
};

const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    cacheData(state, action: PayloadAction<Partial<CacheState>>) {
      state.allData = action.payload.allData ?? state.allData;
      state.bandungData = action.payload.bandungData ?? state.bandungData;
      state.nonBandungData = action.payload.nonBandungData ?? state.nonBandungData;
      state.pwkData = action.payload.pwkData ?? state.pwkData;
      state.chartData = action.payload.chartData ?? state.chartData;
    },
    cacheChartData(state, action: PayloadAction<DataItem[]>) {
      state.chartData = action.payload;
    },
  },
});

export const { cacheData, cacheChartData } = cacheSlice.actions;
export default cacheSlice.reducer;
