export enum GraphEvent {
  SAVE = "SAVE",
  RESET = "RESET",
  LOAD = "LOAD",
}

export type GraphHandlerMap = {
  [GraphEvent.SAVE]: () => void;
  [GraphEvent.RESET]: () => void;
  [GraphEvent.LOAD]: (e: CustomEvent<{ json: any }>) => void;
};
