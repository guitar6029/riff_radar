import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

export default function Logout() {
  async function signOut() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    redirect("/login");
  }
  return (
    <button onClick={signOut} className="cursor-pointer trns hover:underline">
      Sign out
    </button>
  );
}
