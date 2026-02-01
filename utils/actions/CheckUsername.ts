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
    console.log("ERROR : ", error);
    return false;
  }

  return data.length > 0;
}
