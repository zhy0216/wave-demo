export const testNode = {
  id: "1",
  shape: "flow-node",
  label: "学生",
  width: 150,
  height: 24,
  position: {
    x: 150,
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

export const inputNode = {
  shape: "edit-node",
  x: 40,
  y: 140,
  label: "hello",
  ports: {
    items: [
      {
        id: "port_1",
        group: "right",
      },
    ],
  },
};
