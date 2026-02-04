import { isGuestOnlyRoute, isPublicRoute } from "./routeHelpers";

type RouteDecision =
  | { action: "allow" }
  | { action: "redirect"; to: "/" | "/login" };

export function decideRoute(
  pathName: string,
  isSignedIn: boolean,
): RouteDecision {
  // case 1 , signed in users cannot access guest only ( /login, /signup)
  if (isSignedIn && isGuestOnlyRoute(pathName)) {
    return { action: "redirect", to: "/" };
  }

  // signed out users cannot access protected routes
  if (!isSignedIn && !isPublicRoute(pathName) && !isGuestOnlyRoute(pathName)) {
    return { action: "redirect", to: "/login" };
  }

  // everything else
  return { action: "allow" };
}
