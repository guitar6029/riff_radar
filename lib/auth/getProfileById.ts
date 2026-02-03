import { createClient } from "../supabase/server";

export type Profile = {
  avatarUrl: string | null;
  username: string | null;
};

export async function getProfileById(id: string): Promise<Profile | null> {
  const supabase = await createClient();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("avatar_url, username")
    .eq("id", id)
    .maybeSingle();

  if (!profile) {
    console.error("getProfileById error :, error");
    return null;
  }

  if (!profile) {
    console.warn("No profile found for id:", id);
    return null;
  }

  const profileData = {
    avatarUrl: profile?.avatar_url ?? null,
    username: profile?.username ?? null,
  };

  return profileData;
}
