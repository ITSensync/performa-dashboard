// actions.ts
import { Action } from 'redux';

export const CACHE_DATA = 'CACHE_DATA';

export interface CardData {
  id: string;
  title: string;
  average_percent: string;
}

export interface CacheDataAction extends Action<typeof CACHE_DATA> {
  payload: {
    allData: CardData | null;
    bandungData: CardData | null;
    nonBandungData: CardData | null;
    pwkData: CardData | null;
  };
}

export const cacheData = (data: {
  allData: CardData | null;
  bandungData: CardData | null;
  nonBandungData: CardData | null;
  pwkData: CardData | null;
}): CacheDataAction => ({
  type: CACHE_DATA,
  payload: data
});
