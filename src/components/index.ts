import { Graph } from "@antv/x6";

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
            {
              tagName: "rect",
              selector: "portRect",
            },
          ],
          attrs: {
            portBody: {
              width: NODE_WIDTH,
              height: LINE_HEIGHT,
              strokeWidth: 1,
              stroke: "#5F95FF",
              fill: "#EFF4FF",
            },
            portNameLabel: {
              ref: "portBody",
              refX: 12,
              refY: 0,
              fontSize: 10,
            },
            portTypeLabel: {
              ref: "portBody",
              refX: 95,
              refY: 0,
              fontSize: 10,
            },
            rect: {
              magnet: true,
              stroke: "black",
              fill: "white",
              strokeWidth: 1,
              ref: "portBody",
              refX: 2,
              refY: 1,
              width: 8,
              height: 6,
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

Graph.registerNode(
  "edit-node",
  {
    inherit: "rect",
    width: 100,
    height: 40,
    attrs: {
      body: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
        fill: "#fff",
        rx: 6,
        ry: 6,
      },
    },
    ports: {
      groups: {
        right: {
          position: "right",
          attrs: {
            circle: {
              magnet: true,
              stroke: "#8f8f8f",
              r: 5,
            },
          },
        },
      },
    },
    tools: [
      {
        name: "node-editor",
        args: {
          attrs: {
            backgroundColor: "#EFF4FF",
          },
        },
      },
    ],
  },
  true
);

export { FlowPanel } from "./FlowPanel";
