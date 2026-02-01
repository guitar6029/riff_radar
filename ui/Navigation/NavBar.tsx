import { APP_NAME } from "@/lib/constants";
import Account from "../Account/Account";
import { getCurrentUserProfileAvatar } from "@/lib/auth/getCurrentUserProfile";
export default async function NavBar() {
  let avatar = await getCurrentUserProfileAvatar();

  return (
    <nav className="flex items-center justify-between gap-2 bg-primary p-4">
      <h1 className="font-bold">{APP_NAME}</h1>
      <Account avatarUrl={avatar} />
    </nav>
  );
}
