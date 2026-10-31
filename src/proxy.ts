import { NextRequest, NextResponse } from "next/server";

// Cloudflare Access guards crm.neviai.ai, but the app has no login of its own, so every
// request must come through the neviai-proxy Worker or the Email app (both send this
// header). Without it the run.app address would skip Access.
export function proxy(request: NextRequest) {
  const expected = process.env.PROXY_SECRET;
  if (!expected || request.headers.get("x-neviai-proxy") !== expected) {
    return new NextResponse("Forbidden", { status: 403 });
  }
  return NextResponse.next();
}
