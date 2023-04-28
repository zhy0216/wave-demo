export enum GraphEvent {
  SAVE = "SAVE",
  RESET = "RESET",
  LOAD = "LOAD",
  UNDO = "UNDO",
  REDO = "REDO",
}

export type GraphHandlerMap = {
  [GraphEvent.SAVE]: () => void;
  [GraphEvent.RESET]: () => void;
  [GraphEvent.UNDO]: () => void;
  [GraphEvent.REDO]: () => void;
  [GraphEvent.LOAD]: (e: CustomEvent<{ json: any }>) => void;
};
