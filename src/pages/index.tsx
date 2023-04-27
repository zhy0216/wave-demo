import Head from "next/head";

import dynamic from "next/dynamic";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useRef } from "react";
import { GraphEvent, NodeType } from "@/utils/graphEvent";

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
  const jsonFileRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Head>
        <title>demo</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ height: "100vh" }}>
        <div style={{ display: "flex", columnGap: 8 }}>
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent(GraphEvent.SAVE));
            }}
          >
            save
          </button>

          <button
            onClick={() => {
              jsonFileRef.current?.click();
            }}
          >
            load
          </button>

          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent(GraphEvent.RESET));
            }}
          >
            reset
          </button>
        </div>
        <div style={{ display: "flex", height: "100%", marginTop: 8 }}>
          <div id="container" style={{ flex: 1 }}></div>
          <div style={{ width: 400 }}>
            <FlowNode
              onMouseDown={(
                e: React.MouseEvent<HTMLDivElement, MouseEvent>
              ) => {
                window.dispatchEvent(
                  new CustomEvent(GraphEvent.START_DRAG, {
                    detail: { evt: e, nodeType: NodeType.TARGET },
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
                window.dispatchEvent(
                  new CustomEvent(GraphEvent.START_DRAG, {
                    detail: { evt: e, nodeType: NodeType.TEXT_INPUT },
                  })
                );
              }}
            >
              Input Node
            </FlowNode>
          </div>
        </div>
        <FlowPanel />
        <input
          type="file"
          style={{ display: "none" }}
          ref={jsonFileRef}
          onChange={(event) => {
            // https://stackoverflow.com/a/29176118
            const input = event.target;

            const reader = new FileReader();
            reader.onload = function () {
              const text = reader.result;
              window.dispatchEvent(
                new CustomEvent(GraphEvent.LOAD, {
                  detail: { json: JSON.parse(text as string) },
                })
              );
            };
            if (input.files?.[0]) {
              reader.readAsText(input.files[0]);
            }
          }}
        />
      </main>
    </>
  );
}
