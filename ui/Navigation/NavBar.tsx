import { APP_NAME } from "@/lib/constants";
import Account from "../Account/Account";
import { getCurrentUserProfileAvatar } from "@/lib/auth/getCurrentUserProfile";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
export default async function NavBar() {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  //if !user dont fetch the avatar
  if (!user) {
    return (
      <nav className="flex items-center justify-between gap-2 bg-primary p-4">
        <h1 className="font-bold">{APP_NAME}</h1>
        <Link href={"/login"}>Login</Link>
      </nav>
    );
  }
  console.log("user : ", user);

  let avatar = await getCurrentUserProfileAvatar();
  let email = user.data.user?.email ?? null;

  return (
    <nav className="flex items-center justify-between gap-2 bg-primary p-4">
      <h1 className="font-bold">{APP_NAME}</h1>
      <Account avatarUrl={avatar} email={email} />
    </nav>
  );
}
