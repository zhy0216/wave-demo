import { Graph } from "@antv/x6";
import { useEffect, useRef } from "react";
import { inputNode, testNode } from "../mockData/data";
import { Dnd } from "@antv/x6-plugin-dnd";
import { saveJson } from "@/utils";
import useEventListener from "@/utils/hooks";
import { GraphEvent } from "@/utils/graphEvent";

export const FlowPanel: React.FC = ({}) => {
  const graph = useRef<Graph>();
  const dnd = useRef<Dnd>();

  useEffect(() => {
    const element = document.getElementById("container");
    if (element && !graph.current) {
      graph.current = new Graph({
        container: element,
        autoResize: true,
        background: {
          color: "#F2F7FA",
        },
        connecting: {
          allowEdge: false,
          allowMulti: true,
          allowPort: true,
          allowBlank: false,
          allowLoop: false,
          allowNode: false,
        },
      });
      dnd.current = new Dnd({
        target: graph.current,
      });
    }
  });

  useEventListener(GraphEvent.SAVE, () => {
    if (!graph.current) return;

    const data = graph.current.toJSON();
    saveJson(JSON.stringify(data), "test.json");
  });

  useEventListener(GraphEvent.RESET, () => {
    graph.current?.resetCells([]);
  });

  useEffect(() => {
    if (document) {
      document.addEventListener("start-drag", (e) => {
        if (!graph.current || !dnd.current) return;

        const { evt, nodeType } = (e as any).detail;
        const node =
          nodeType === "input"
            ? graph.current.createNode(inputNode)
            : graph.current.createNode(testNode);
        dnd.current.start(node, evt.nativeEvent as any);
      });

      document.addEventListener("load", (e) => {
        if (!graph.current) return;

        const { json } = (e as any).detail;
        graph.current?.fromJSON(json);
      });
    }
  });

  return <></>;
};
