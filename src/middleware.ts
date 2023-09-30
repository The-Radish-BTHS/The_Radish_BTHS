// import { get } from "@vercel/edge-config";
// import { next } from "@vercel/edge";

// import { type NextRequest, NextResponse, NextFetchEvent } from "next/server";

// export async function middleware(
//   request: NextRequest,
//   context: NextFetchEvent
// ) {
//   const url = new URL(request.url);
//   const links = (await get("links")) as Record<string, string> | undefined;

//   if (!links) {
//     console.error("No links found. Is the edge config connected correctly?");
//     return next();
//   }

//   console.log("\n\n\n\n\n Fuck \n\n\\n\n\n");

//   if (url.pathname in links) {
//     try {
//       return NextResponse.redirect(links[url.pathname], 302);
//     } catch (e) {
//       console.error("Unable to redirect. Is the link a valid URL?");
//       console.error(e);
//       return next();
//     }
//   }

//   // not a link, continue to the normal page
//   return next();
// }

// export const config = {
//   // matches anything that doesnt start with public, static, api, _next, ..
//   matcher: "/((?!public|static|api|_next|robots.txt|favicon.ico).*)",
// };

import { NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

export const config = { matcher: "/welcome" };

export async function middleware() {
  const greeting = await get("greeting");
  // NextResponse.json requires at least Next v13.1 or
  // enabling experimental.allowMiddlewareResponseBody in next.config.js
  return NextResponse.json(greeting);
}
