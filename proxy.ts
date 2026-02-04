import type { NextRequest } from "next/server";
import {
  initSupabaseMiddlewareContext,
  isUserSignedin,
} from "./lib/supabase/helpers/middlewareClient";
import { redirectTo } from "./lib/supabase/helpers/redirectTo";
import { decideRoute } from "./lib/supabase/helpers/routeDecision";

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/";

  const { supabase, response } = initSupabaseMiddlewareContext(request);
  const isSignedIn = await isUserSignedin(supabase);
  const pathname = request.nextUrl.pathname;
  const decision = decideRoute(pathname, isSignedIn);

  if (decision.action === "redirect") {
    return redirectTo(request, decision.to);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
