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
          padding: "2rem",
          gap: "2rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={searchParams.get("img") ?? ""}
          alt={searchParams.get("name") ?? ""}
          width={300}
          height={500}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "48px", fontWeight: 900 }}>
            {searchParams.get("name")?.substring(0, 32) +
              (searchParams.get("name")!.length > 32 ? "..." : "")}
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: 700,
              wordBreak: "break-all",
            }}
          >
            {searchParams.get("description")?.substring(0, 70) +
              (searchParams.get("description")!.length > 70 ? "..." : "")}
          </p>
          <hr style={{ borderColor: "black", width: "100%" }} />
          {(JSON.parse(searchParams.get("excerpts") ?? "[]") as string[]).map(
            (e, i) => (
              <p style={{ margin: 0, fontSize: "16px" }} key={i}>
                {`${i}. ` +
                  e?.substring(0, 100) +
                  (e.length > 100 ? "..." : "")}
              </p>
            )
          )}
          <p style={{ fontSize: 32, fontWeight: 500 }}>...and more!</p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}
