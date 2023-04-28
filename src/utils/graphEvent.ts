export enum GraphEvent {
  SAVE = "SAVE",
  RESET = "RESET",
  LOAD = "LOAD",
}

export enum NodeType {
  TEXT_INPUT = "TEXT_INPUT",
  TARGET = "TARGET",
}

export type GraphHandlerMap = {
  [GraphEvent.SAVE]: () => void;
  [GraphEvent.RESET]: () => void;
  [GraphEvent.LOAD]: (e: CustomEvent<{ json: any }>) => void;
};
