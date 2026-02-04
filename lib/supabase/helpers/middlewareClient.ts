import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

type SupabaseContext = {
  supabase: SupabaseClient;
  response: NextResponse;
};

/**
 * helper to initialize the supabase server client
 * @param request
 * @returns supabase
 * @returns response
 */
export function initSupabaseMiddlewareContext(
  request: NextRequest,
): SupabaseContext {
  const response = NextResponse.next();

  // supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesSet) => {
          cookiesSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  return { supabase, response };
}

export async function isUserSignedin(
  supabaseInstance: SupabaseClient,
): Promise<boolean> {
  // user
  const {
    data: { user },
  } = await supabaseInstance.auth.getUser();

  return !!user;
}
