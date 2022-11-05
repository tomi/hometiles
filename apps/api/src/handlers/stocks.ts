import { Env } from "../env";

const GetStockSymbols = async (request: Request, env: Env) => {
  const url = new URL(request.url);
  const params = url.searchParams;

  const symbols = params.get("symbols");
  if (!symbols) {
    return new Response("Bad request", {
      status: 400,
    });
  }

  const authToken = env.FINNHUB_AUTH_TOKEN;
  const quotes = await Promise.all(symbols.split(",").map((s) => getStockTickerInfo(authToken, s)));

  return new Response(JSON.stringify(quotes), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
};

export default GetStockSymbols;

export type FinnhubStockResponse = {
  c: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
  dp: number;
  d: number;
  ticker: string;
};

export type StockTickers = [FinnhubStockResponse?];

export async function getStockTickerInfo(
  authToken: string,
  symbol: string
): Promise<FinnhubStockResponse> {
  try {
    const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol.toUpperCase()}`, {
      method: "GET",
      headers: {
        "X-Finnhub-Token": `${authToken}`,
      },
    });

    const data = (await res.json()) as FinnhubStockResponse;

    data.ticker = symbol;

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error as string);
  }
}
