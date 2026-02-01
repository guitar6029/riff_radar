import { createClient } from "../supabase/server";

export async function getCurrentUserProfileAvatar() {
  const supabase = await createClient();

  //get user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    // look up the profies table with the user id to get the avatar_url
    const { data: profile } = await supabase
      .from("profiles")
      .select("avatar_url")
      .eq("id", user.id)
      .single();

    //avatar_url
    return profile?.avatar_url ?? null;
  }
}
