import { NextRequest } from "next/server";

export function getPathname(request: NextRequest): string {
  return request.nextUrl.pathname;
}
