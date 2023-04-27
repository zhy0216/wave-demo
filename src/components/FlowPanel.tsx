import { Graph } from "@antv/x6";
import { useEffect, useRef } from "react";
import { inputNode, testNode } from "../mockData/data";
import { Dnd } from "@antv/x6-plugin-dnd";

export const FlowPanel: React.FC = ({}) => {
  const graph = useRef<Graph>();
  const dnd = useRef<Dnd>();

  const addEditNode = useRef<() => void>();

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

      addEditNode.current = () => {
        graph.current?.addNode(inputNode);
      };
    }
  });

  useEffect(() => {
    if (document && addEditNode.current) {
      document.addEventListener("add-edit-node", addEditNode.current);
      document.addEventListener("start-drag", (e) => {
        if (!graph.current || !dnd.current) return;
        const evt = (e as any).detail;
        const node = graph.current.createNode(inputNode);
        dnd.current.start(node, evt.nativeEvent as any);
      });

      return () =>
        addEditNode.current &&
        document.removeEventListener("add-edit-node", addEditNode.current);
    }
  });

  return <></>;
};
