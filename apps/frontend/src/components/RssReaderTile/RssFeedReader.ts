import * as htmlparser2 from "htmlparser2";
import { apiBaseUrl } from "../../config/config";

export interface Feed {
  title: string | undefined;
  items: FeedItem[];
}

export type Iso8601Timestamp = string;

export interface FeedItem {
  id?: string;
  title?: string;
  link?: string;
  description?: string;
  pubDate?: Iso8601Timestamp;
}

export async function fetchAndParseRss(rssUrl: string): Promise<Feed> {
  const url = `${apiBaseUrl}/rss?url=${encodeURIComponent(rssUrl)}`;
  const response = await fetch(url, {});
  const body = await response.text();
  const feed = await htmlparser2.parseFeed(body);

  return {
    title: feed?.title,
    items: feed?.items?.map(mapFeedItem) ?? [],
  };
}

function mapFeedItem(item: htmlparser2.DomUtils.FeedItem): FeedItem {
  return {
    id: item.id,
    title: item.title,
    link: item.link,
    description: item.description,
    pubDate: item.pubDate?.toISOString(),
  };
}
