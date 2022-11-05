import { Env } from "../env";

const ProxyRssRequest = async (request: Request, env: Env) => {
  const url = new URL(request.url);
  const params = url.searchParams;

  const rssUrl = params.get("url");
  if (!rssUrl) {
    return new Response("Bad request", {
      status: 400,
    });
  }

  const newHeaders = new Headers();
  newHeaders.set("User-Agent", request.headers.get("User-Agent")!);

  return proxyRequest(rssUrl, newHeaders);
};

export default ProxyRssRequest;

export async function proxyRequest(url: string, headers?: Headers) {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers,
    });

    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: {
        ...res.headers,
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error(error as string);
  }
}
