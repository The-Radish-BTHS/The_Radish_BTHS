/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const BG_COLOR = "#EBEAE5";

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
            {searchParams.get("grad_year")}
          </p>
          <h1 style={{ margin: 0, fontSize: "64px", fontWeight: 900 }}>
            {searchParams.get("name")}
          </h1>
          <p style={{ margin: 0 }}>{searchParams.get("role")}</p>
          <hr style={{ borderColor: "black", width: "100%" }} />
          <p style={{ margin: 0, fontSize: "24px", wordWrap: "unset" }}>
            {searchParams.get("quote")?.substring(0, 70) +
              (searchParams.get("quote")!.length > 70 ? "..." : "")}
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
