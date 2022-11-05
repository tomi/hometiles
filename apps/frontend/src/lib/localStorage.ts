export const loadTileState = <T>(tileId: string): T | null => {
  const serializedState = localStorage.getItem(tileId);

  return serializedState ? (JSON.parse(serializedState) as T) : null;
};

export const storeTileState = <T>(tileId: string, state: T) => {
  const serializedState = JSON.stringify(state);

  localStorage.setItem(tileId, serializedState);
};
