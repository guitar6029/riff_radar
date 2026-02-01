import { createClient } from "../supabase/server";

export async function getProfileUsernameById(
  id: string,
): Promise<string | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(`getProfileUsernameById Error : ${error}`);
    return null;
  }

  return data?.username ?? null;
}
