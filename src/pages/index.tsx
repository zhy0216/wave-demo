import Head from "next/head";

import dynamic from "next/dynamic";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const FlowPanel = dynamic(
  () => import("../components").then((m) => m.FlowPanel),
  {
    ssr: false,
  }
);

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

export default function Home() {
  return (
    <>
      <Head>
        <title>demo</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ height: "100vh" }}>
        <button
          style={{ marginRight: 15 }}
          onClick={() => {
            document.dispatchEvent(new CustomEvent("save"));
          }}
        >
          save
        </button>

        <button
          onClick={() => {
            document.dispatchEvent(new CustomEvent("load"));
          }}
        >
          load
        </button>
        <div style={{ display: "flex", height: "100%", marginTop: 8 }}>
          <div id="container" style={{ flex: 1 }}></div>
          <div style={{ width: 400 }}>
            <FlowNode
              onMouseDown={(
                e: React.MouseEvent<HTMLDivElement, MouseEvent>
              ) => {
                document.dispatchEvent(
                  new CustomEvent("start-drag", {
                    detail: { evt: e, nodeType: "target" },
                  })
                );
              }}
            >
              Target Node
            </FlowNode>
            <FlowNode
              onMouseDown={(
                e: React.MouseEvent<HTMLDivElement, MouseEvent>
              ) => {
                document.dispatchEvent(
                  new CustomEvent("start-drag", {
                    detail: { evt: e, nodeType: "input" },
                  })
                );
              }}
            >
              Input Node
            </FlowNode>
          </div>
        </div>
        <FlowPanel />
      </main>
    </>
  );
}
