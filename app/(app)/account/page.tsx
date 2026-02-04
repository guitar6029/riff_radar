import { getProfileById } from "@/lib/auth/getProfileById";
import { createClient } from "@/lib/supabase/server";
import CloseAccount from "@/ui/Profile/CloseAccount";
import { redirect } from "next/navigation";

export default async function Account() {
  const supabase = await createClient();
  // get user
  const { data: userData, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Account getUser error :", error);
  }

  const id = userData?.user?.id ?? null;
  if (!id) {
    console.error("Account Page, id is missing");
    redirect("/login");
  }

  //get user's profile
  const profileData = await getProfileById(id);
  if (!profileData) {
    redirect("/login");
  }
  const { username, avatarUrl } = profileData;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="section-title">Account</h1>
      <div className="flex items-center gap-2">
        <span className="font-semibold uppercase">username</span>
        <span>{username}</span>
      </div>
      <div>
        {avatarUrl && (
          <img
            className="w-44 rounded-4xl object-cover"
            src={avatarUrl}
            alt="profile avatar"
          />
        )}
        {!avatarUrl && <span className="w-44">Avatar Not Available</span>}
      </div>
      <CloseAccount />
    </div>
  );
}
