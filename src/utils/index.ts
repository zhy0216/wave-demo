export function saveJsonToFile(content: string, fileName: string) {
  const a = document.createElement("a");
  const file = new Blob([content], { type: "application/json" });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

export async function saveJson(content: any) {
  await fetch("/api/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(content),
  });
}

export { GraphEvent, type GraphHandlerMap } from "./graphEvent";
export * from "./useEventListner";
