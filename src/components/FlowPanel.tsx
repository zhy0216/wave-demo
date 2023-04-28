import { Graph } from "@antv/x6";
import { useEffect, useRef } from "react";
import { inputNode, testNode } from "../mockData/data";
import { Dnd } from "@antv/x6-plugin-dnd";
import { saveJson } from "@/utils";
import useEventListener from "../utils/useEventListner";
import { GraphEvent, NodeType } from "@/utils/graphEvent";
import { Stencil } from "@antv/x6-plugin-stencil";

import styled from "@emotion/styled";

const FlowNode = styled.div`
  width: 100px;
  height: 40px;
  margin: 16px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #8f8f8f;
  border-radius: 6px;
  cursor: move;
`;
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

  useEventListener(GraphEvent.START_DRAG, (e) => {
    if (!graphRef.current) return;
    const { evt, nodeType } = e.detail;
    const node =
      nodeType === NodeType.TEXT_INPUT
        ? graphRef.current.createNode(inputNode)
        : graphRef.current.createNode(testNode);
    node.addTools([
      {
        name: "button-remove",
        args: { x: 10, y: 10 },
      },
    ]);
    // dnd.current.start(node, evt.nativeEvent as any);
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
      >
        {/*<FlowNode*/}
        {/*  onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {*/}
        {/*    window.dispatchEvent(*/}
        {/*      new CustomEvent(GraphEvent.START_DRAG, {*/}
        {/*        detail: { evt: e, nodeType: NodeType.TARGET },*/}
        {/*      })*/}
        {/*    );*/}
        {/*  }}*/}
        {/*>*/}
        {/*  Target Node*/}
        {/*</FlowNode>*/}
        {/*<FlowNode*/}
        {/*  onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {*/}
        {/*    window.dispatchEvent(*/}
        {/*      new CustomEvent(GraphEvent.START_DRAG, {*/}
        {/*        detail: { evt: e, nodeType: NodeType.TEXT_INPUT },*/}
        {/*      })*/}
        {/*    );*/}
        {/*  }}*/}
        {/*>*/}
        {/*  Input Node*/}
        {/*</FlowNode>*/}
      </div>
    </div>
  );
};
