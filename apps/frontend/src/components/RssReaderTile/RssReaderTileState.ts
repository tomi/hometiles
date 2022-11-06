import { loadTileState, persistTileState } from "../../lib/localStorage";
import { Feed } from "./RssFeedReader";

type RssReaderTileStateV1 = Feed & {
  url: string;
};

export type RssReaderTileStateV2 = {
  v: 2;
  feed?: Feed & {
    url: string;
  };
  nextRefresh?: number;
  title?: string;
};

export type RssReaderTileStateV3 = {
  v: 3;
  title?: string;
  feedUrl?: string;
  feed?: Omit<Feed, "url">;
};

const isV2State = (state: unknown): state is RssReaderTileStateV2 => (state as any).v === 2;
const isV3State = (state: unknown): state is RssReaderTileStateV3 => (state as any).v === 3;

export type LatestRssReaderTileState = RssReaderTileStateV3;

export const rssReaderTileInitialState: LatestRssReaderTileState = {
  v: 3,
};

export function persistState(tileId: string, state: LatestRssReaderTileState) {
  persistTileState(tileId, state);
}

export function loadState(tileId: string): LatestRssReaderTileState {
  const loadedState = loadTileState<any>(tileId);
  if (!loadedState) return rssReaderTileInitialState;

  return migrateStateIfNeeded(loadedState);
}

function migrateStateIfNeeded(state: any): LatestRssReaderTileState {
  if (isV3State(state)) return state;

  if (isV2State(state)) {
    return {
      v: 3,
      feed: state.feed,
      feedUrl: state.feed?.url,
      title: state.title,
    };
  }

  // Assume it's version 1
  const stateV1 = state as RssReaderTileStateV1;
  return {
    v: 3,
    feed: stateV1,
    feedUrl: stateV1.url,
  };
}
