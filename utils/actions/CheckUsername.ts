"use server";

import { createClient } from "@/lib/supabase/server";

const TABLE_PROFILE = "profiles";

export async function checkUsername(username: string): Promise<boolean> {
  const supabase = await createClient();
  // check if profiles return anything
  const { data, error } = await supabase
    .from(TABLE_PROFILE)
    .select("username")
    .eq("username", username)
    .limit(1);

  if (error) {
    console.error("ERROR : ", error);
    return false;
  }

  const isAvailable = data.length === 0;

  return isAvailable;
}
