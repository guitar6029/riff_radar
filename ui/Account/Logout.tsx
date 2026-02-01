import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

export default function Logout() {
  async function signOut() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    redirect("/login");
  }
  return (
    <div className="flex flex-col items-center gap-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M4 12a1 1 0 0 0 1 1h7.59l-2.3 2.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4-4a1 1 0 0 0 .21-.33a1 1 0 0 0 0-.76a1 1 0 0 0-.21-.33l-4-4a1 1 0 1 0-1.42 1.42l2.3 2.29H5a1 1 0 0 0-1 1M17 2H7a3 3 0 0 0-3 3v3a1 1 0 0 0 2 0V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-3a1 1 0 0 0-2 0v3a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3"
        />
      </svg>
      <button onClick={signOut}>logout</button>
    </div>
  );
}
