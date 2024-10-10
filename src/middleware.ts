import { next } from "@vercel/edge";
import links from "./short-links.json";

import { type NextRequest, NextResponse, NextFetchEvent } from "next/server";

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);

  if (!links) {
    console.error("No links found. Is the edge config connected correctly?");
    return next();
  }

  if (url.pathname in links) {
    try {
      return NextResponse.redirect(
        links[url.pathname as keyof typeof links],
        302
      );
    } catch (e) {
      console.error("Unable to redirect. Is the link a valid URL?");
      console.error(e);
      return next();
    }
  }

  // not a link, continue to the normal page
  return next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
