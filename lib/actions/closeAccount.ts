"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin"; // you'll make this
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function closeMyAccount() {
  // 1) Identify caller using cookie-based session
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return { ok: false, message: "Not authenticated." };
  }

  const userId = data.user.id;

  // 2) Delete via Admin API (service role)
  const admin = createAdminClient();
  const { error: adminError } = await admin.auth.admin.deleteUser(userId);

  if (adminError) {
    return { ok: false, message: adminError.message };
  }

  // 3) Session is now invalid; redirect away
  revalidatePath("/");
  redirect("/");
}
