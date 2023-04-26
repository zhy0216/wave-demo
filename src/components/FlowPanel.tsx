import { Graph } from "@antv/x6";
import { useEffect, useRef } from "react";

const LINE_HEIGHT = 24;
const NODE_WIDTH = 150;

Graph.registerNode(
  "flow-node",
  {
    inherit: "rect",
    markup: [
      {
        tagName: "rect",
        selector: "body",
      },
      {
        tagName: "text",
        selector: "label",
      },
    ],
    attrs: {
      rect: {
        strokeWidth: 1,
        stroke: "#5F95FF",
        fill: "#5F95FF",
      },
      label: {
        fontWeight: "bold",
        fill: "#ffffff",
        fontSize: 12,
      },
    },
    ports: {
      groups: {
        list: {
          markup: [
            {
              tagName: "rect",
              selector: "portBody",
            },
            {
              tagName: "text",
              selector: "portNameLabel",
            },
            {
              tagName: "text",
              selector: "portTypeLabel",
            },
          ],
          attrs: {
            portBody: {
              width: NODE_WIDTH,
              height: LINE_HEIGHT,
              strokeWidth: 1,
              stroke: "#5F95FF",
              fill: "#EFF4FF",
              magnet: true,
            },
            portNameLabel: {
              ref: "portBody",
              refX: 6,
              refY: 6,
              fontSize: 10,
            },
            portTypeLabel: {
              ref: "portBody",
              refX: 95,
              refY: 6,
              fontSize: 10,
            },
          },
          position: "portPosition",
        },
      },
    },
  },
  true
);

Graph.registerPortLayout(
  "portPosition",
  (portsPositionArgs) => {
    return portsPositionArgs.map((_, index) => {
      return {
        position: {
          x: 0,
          y: (index + 1) * LINE_HEIGHT,
        },
        angle: 0,
      };
    });
  },
  true
);

const testNode = {
  id: "1",
  shape: "flow-node",
  label: "学生",
  width: 150,
  height: 24,
  position: {
    x: 24,
    y: 150,
  },
  ports: [
    {
      id: "1-1",
      group: "list",
      attrs: {
        portNameLabel: {
          text: "ID",
        },
        portTypeLabel: {
          text: "STRING",
        },
      },
    },
    {
      id: "1-2",
      group: "list",
      attrs: {
        portNameLabel: {
          text: "Name",
        },
        portTypeLabel: {
          text: "STRING",
        },
      },
    },
    {
      id: "1-3",
      group: "list",
      attrs: {
        portNameLabel: {
          text: "Class",
        },
        portTypeLabel: {
          text: "NUMBER",
        },
      },
    },
    {
      id: "1-4",
      group: "list",
      attrs: {
        portNameLabel: {
          text: "Gender",
        },
        portTypeLabel: {
          text: "BOOLEAN",
        },
      },
    },
  ],
};

export const FlowPanel: React.FC = ({}) => {
  const graph = useRef<Graph>();

  useEffect(() => {
    const element = document.getElementById("container");
    if (element && !graph.current) {
      graph.current = new Graph({
        container: element,
        autoResize: true,
        background: {
          color: "#F2F7FA",
        },
      });

      graph.current?.addNode(testNode);
    }
  });

  return <></>;
};
