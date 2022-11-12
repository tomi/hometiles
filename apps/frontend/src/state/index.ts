import { reactive } from "vue";

const TILE_CONFIG_KEY = "TILE_CONFIG";

export enum TileType {
  Rss = "rss",
  Stock = "stock",
}

export type TileTypeData = {
  type: TileType;
  name: string;
};

export const tileTypes: TileTypeData[] = [
  {
    name: "RSS Feed",
    type: TileType.Rss,
  },
  {
    name: "Stocks",
    type: TileType.Stock,
  },
];

export interface Tile {
  id: string;
  type: TileType;
}

export const store = reactive({
  tiles: [] as Tile[],
});

const generateTileId = () => `tile-${Date.now()}-${Math.round(Math.random() * 1000)}`;

export const addTile = (tileOpts: Omit<Tile, "id">) => {
  const id = generateTileId();

  const tile: Tile = {
    id,
    ...tileOpts,
  };

  store.tiles.push(tile);
  persistState();
};

export const removeTile = (tileId: string) => {
  store.tiles = store.tiles.filter((x) => x.id !== tileId);
  persistState();
};

export const loadState = () => {
  const serializedTileConfig = localStorage.getItem(TILE_CONFIG_KEY);

  if (serializedTileConfig) {
    const tileConfig = JSON.parse(serializedTileConfig);
    store.tiles = tileConfig;
  } else {
    // Use possible old state
    ["rss-reader-1", "rss-reader-2", "rss-reader-3"].forEach((id) => {
      if (localStorage.getItem(id)) {
        store.tiles.push({
          id,
          type: TileType.Rss,
        });
      }
    });
    if (localStorage.getItem("STOCK_QUOTE")) {
      store.tiles.push({
        id: "STOCK_QUOTE",
        type: TileType.Stock,
      });
    }
  }
};

export const persistState = () => {
  const serializedTileConfig = JSON.stringify(store.tiles);

  localStorage.setItem(TILE_CONFIG_KEY, serializedTileConfig);
};
