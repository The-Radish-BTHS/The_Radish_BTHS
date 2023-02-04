/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const BG_COLOR = "#EBEAE5";
const TOPIC_COLOR = "#BF0B0B";

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: BG_COLOR,
          color: "black",
          display: "flex",
          padding: "6rem",
          gap: "4rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="https://theradishbths.com/images/sadish.png"
          alt="Radish Logo"
          width={250}
          height={400}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            padding: "2rem",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "80px",
              fontWeight: 900,
              color: TOPIC_COLOR,
            }}
          >
            {searchParams.get("name")?.substring(0, 16) +
              (searchParams.get("name")!.length > 16 ? "..." : "")}
          </h1>
          <hr style={{ borderColor: "black", width: "100%" }} />
          <p style={{ margin: 0, fontSize: "24px" }}>
            {searchParams.get("description")?.substring(0, 70) +
              (searchParams.get("description")!.length > 70 ? "..." : "")}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}
