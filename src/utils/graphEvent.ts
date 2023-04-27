export enum GraphEvent {
  SAVE = "SAVE",
  RESET = "RESET",
  START_DRAG = "START_DRAG",
  LOAD = "LOAD",
}

export enum NodeType {
  TEXT_INPUT = "TEXT_INPUT",
  TARGET = "TARGET",
}

export type GraphHandlerMap = {
  [GraphEvent.SAVE]: () => void;
  [GraphEvent.RESET]: () => void;
  [GraphEvent.START_DRAG]: (
    event: CustomEvent<{
      evt: React.MouseEvent<HTMLDivElement, MouseEvent>;
      nodeType: NodeType;
    }>
  ) => void;
  [GraphEvent.LOAD]: (e: CustomEvent<{ json: any }>) => void;
};
