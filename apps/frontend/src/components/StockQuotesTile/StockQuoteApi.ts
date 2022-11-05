import { apiBaseUrl } from "../../config/config";
import { AsyncEither } from "../../lib/Either";
import { StockTickerData } from "./StockQuotesTile.types";

export async function fetchTickerData(tickers: string[]): AsyncEither<Error, StockTickerData[]> {
  const response = await fetch(`${apiBaseUrl}/stockSymbols?symbols=${tickers.join(",")}`);

  if (!response.ok) return [new Error(`Invalid response ${response.status}`), null];

  const body = await response.json();

  return [null, body.map(jsonToObject)];
}

function jsonToObject(data: Record<string, any>): StockTickerData {
  return {
    change: data.d,
    currentPrice: data.c,
    percentChange: data.dp,
    highPrice: data.h,
    lowPrice: data.l,
    openPrice: data.o,
    prevClosePrice: data.pc,
    ticker: data.ticker,
  };
}
