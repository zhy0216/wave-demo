export const testNode = {
  id: "1",
  shape: "flow-node",
  label: "Target Node",
  width: 150,
  height: 24,
  tools: [
    {
      name: "button-remove",
      args: { x: 10, y: 10 },
    },
  ],

  position: {
    x: 0,
    y: 0,
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

export const inputNode = {
  shape: "edit-node",
  x: 0,
  y: 0,
  label: "hello",
  tools: [
    {
      name: "button-remove",
      args: { x: 10, y: 10 },
    },
  ],
  ports: {
    items: [
      {
        id: "port_1",
        group: "right",
      },
    ],
  },
};
