import { APP_NAME } from "@/lib/constants";
import Profile from "../Profile/Profile";
import { getCurrentUserProfileAvatar } from "@/lib/auth/getCurrentUserProfile";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { getProfileUsernameById } from "@/lib/auth/getProfileUsernameById";

export default async function NavBar() {
  const supabase = await createClient();
  const { data: userData, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Navbar getUser error : ", error);
  }

  const id = userData?.user?.id ?? null;

  //if !user dont fetch the avatar
  if (!id) {
    return (
      <nav className="flex items-center justify-between gap-2 bg-primary p-4">
        <h1 className="font-bold">{APP_NAME}</h1>
        <Link href={"/login"}>Login</Link>
      </nav>
    );
  }

  let avatarUrl = await getCurrentUserProfileAvatar();
  let username = id ? await getProfileUsernameById(id) : null;
  let email = userData?.user?.email ?? null;

  const profile = {
    avatarUrl,
    username,
    email,
  };

  return (
    <nav className="flex items-center justify-between gap-2 bg-primary p-4">
      <h1 className="font-bold">{APP_NAME}</h1>
      <Profile profile={profile} />
    </nav>
  );
}
