export type StockTicker = string;

export type StocksByTicker = Record<string, StockTickerData | undefined>;

export interface StockTickerData {
  ticker: StockTicker;
  currentPrice: number;
  change: number;
  percentChange: number;
  highPrice: number;
  lowPrice: number;
  openPrice: number;
  prevClosePrice: number;
}
