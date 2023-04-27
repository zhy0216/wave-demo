export enum GraphEvent {
  SAVE = "SAVE",
  RESET = "RESET",
}

export type GraphHandlerMap = {
  [GraphEvent.SAVE]: () => void;
  [GraphEvent.RESET]: () => void;
};
