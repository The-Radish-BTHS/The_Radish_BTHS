/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const BG_COLOR = "#EBEAE5";
const TOPIC_COLOR = "#C45636";

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
          gap: "2rem",
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
          }}
        >
          <p style={{ margin: 0, fontSize: "24px", fontWeight: 700 }}>
            {searchParams.get("date")}
          </p>
          <h1 style={{ margin: 0, fontSize: "48px", fontWeight: 900 }}>
            {searchParams.get("name")?.substring(0, 32) +
              (searchParams.get("name")!.length > 32 ? "..." : "")}
          </h1>
          <p style={{ margin: 0 }}>{searchParams.get("author")}</p>
          <hr style={{ borderColor: "black", width: "100%" }} />
          <p style={{ margin: 0, fontSize: "16px", wordWrap: "unset" }}>
            {searchParams.get("description")?.substring(0, 100) +
              (searchParams.get("description")!.length > 100 ? "..." : "")}
          </p>
          <p style={{ margin: 0, fontSize: "24px", color: TOPIC_COLOR }}>
            {searchParams.get("topics")}
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
