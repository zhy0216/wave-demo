import { Graph } from "@antv/x6";
import { useEffect, useRef } from "react";
import { inputNode, testNode } from "../mockData/data";
import { Dnd } from "@antv/x6-plugin-dnd";
import { saveJson } from "@/utils";
import useEventListener from "../utils/useEventListner";
import { GraphEvent, NodeType } from "@/utils/graphEvent";

export const FlowPanel: React.FC = () => {
  const graph = useRef<Graph>();
  const dnd = useRef<Dnd>();
  const ref = useRef<HTMLInputElement>(null);

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

  useEventListener(GraphEvent.START_DRAG, (e) => {
    if (!graph.current || !dnd.current) return;
    const { evt, nodeType } = e.detail;
    const node =
      nodeType === NodeType.TEXT_INPUT
        ? graph.current.createNode(inputNode)
        : graph.current.createNode(testNode);
    node.addTools([
      {
        name: "button-remove",
        args: { x: 10, y: 10 },
      },
    ]);
    dnd.current.start(node, evt.nativeEvent as any);
  });

  useEventListener(GraphEvent.LOAD, (e) => {
    if (!graph.current) return;

    const { json } = e.detail;
    graph.current?.fromJSON(json);
  });

  return <div id="container" ref={ref} style={{ flex: 1 }}></div>;
};
