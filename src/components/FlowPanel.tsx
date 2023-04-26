import { Graph } from "@antv/x6";
import { useEffect, useRef } from "react";
import { inputNode, testNode } from "../mockData/data";

export const FlowPanel: React.FC = ({}) => {
  const graph = useRef<Graph>();
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

      graph.current?.addNode(testNode);
      addEditNode.current = () => {
        graph.current?.addNode(inputNode);
      };
    }
  });

  useEffect(() => {
    if (document && addEditNode.current) {
      document.addEventListener("add-edit-node", addEditNode.current);

      return () =>
        addEditNode.current &&
        document.removeEventListener("add-edit-node", addEditNode.current);
    }
  });

  return <></>;
};
