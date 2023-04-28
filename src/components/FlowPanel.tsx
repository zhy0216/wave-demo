import { Graph } from "@antv/x6";
import { useEffect, useRef } from "react";
import { inputNode, testNode } from "../mockData/data";
import { saveJson } from "@/utils";
import useEventListener from "../utils/useEventListner";
import { GraphEvent } from "@/utils/graphEvent";
import { Stencil } from "@antv/x6-plugin-stencil";

export const FlowPanel: React.FC = () => {
  const graphRef = useRef<Graph>();
  const stencilRef = useRef<Stencil>();

  const graphContainerRef = useRef<HTMLDivElement>(null);
  const stencilContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = document.getElementById("container");
    if (element && !graphRef.current) {
      graphRef.current = new Graph({
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
      stencilRef.current = new Stencil({
        title: "Flow Node",
        target: graphRef.current,
        search(cell, keyword) {
          return (cell as any).label.indexOf(keyword) !== -1;
        },
        collapsable: false,
        stencilGraphWidth: 300,
        stencilGraphHeight: 150,
      });

      stencilContainerRef.current?.appendChild(stencilRef.current.container);
      stencilRef.current.load([
        graphRef.current.createNode(testNode),
        graphRef.current.createNode(inputNode),
      ]);
    }
  });

  useEventListener(GraphEvent.SAVE, () => {
    if (!graphRef.current) return;

    const data = graphRef.current.toJSON();
    saveJson(JSON.stringify(data), "test.json");
  });

  useEventListener(GraphEvent.RESET, () => {
    graphRef.current?.resetCells([]);
  });

  useEventListener(GraphEvent.LOAD, (e) => {
    if (!graphRef.current) return;

    const { json } = e.detail;
    graphRef.current?.fromJSON(json);
  });

  return (
    <div style={{ display: "flex", height: "100%", marginTop: 8 }}>
      <div id="container" ref={graphContainerRef} style={{ flex: 1 }}></div>
      <div
        ref={stencilContainerRef}
        style={{ position: "relative", width: 400 }}
      ></div>
    </div>
  );
};
