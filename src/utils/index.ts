export function saveJson(content: string, fileName: string) {
  const a = document.createElement("a");
  const file = new Blob([content], { type: "application/json" });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

export { GraphEvent, NodeType, type GraphHandlerMap } from "./graphEvent";
export * from "./useEventListner";
