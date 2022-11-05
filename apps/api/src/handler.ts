/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { Router } from "itty-router";
import { Env } from "./env";
import { handleOptions } from "./handlers/optionsHandler";
import ProxyRssRequest from "./handlers/rssProxy";
import GetStockSymbols from "./handlers/stocks";

const router = Router();

router
  .get("/stockSymbols", GetStockSymbols)
  .get("/rss", ProxyRssRequest)
  .get("*", () => new Response("Not found", { status: 404 }));

export const handleRequest = (request: Request, env: Env) => {
  if (request.method === "OPTIONS") {
    return handleOptions(request);
  }

  return router.handle(request, env);
};
