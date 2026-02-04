// for now / (home) , /login and /signup are public
const GUEST_ONLY = new Set(["/login", "/signup"]);
const PUBLIC = new Set(["/"]);

export function isGuestOnlyRoute(pathName: string): boolean {
  return GUEST_ONLY.has(pathName);
}

export function isPublicRoute(pathName: string): boolean {
  return PUBLIC.has(pathName);
}
