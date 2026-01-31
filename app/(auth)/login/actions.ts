"use server";

import { createClient } from "@/lib/supabase/server";
import { LoginSchema } from "@/lib/zod/Login";
import { redirect } from "next/navigation";

export async function handleSignin(formData: FormData) {
  // first parse the email and password, if not valid do not continue
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    // throw an error
    console.error(validatedFields.error);
    redirect("/login?error=Invalid+credentials");
  }
  //if fields are valid, continue
  const { email, password } = validatedFields.data;
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // if no error, then redirect to home
  if (error) {
    console.error(
      `Error(s)----------\n Code : ${error.code}\nMessage: ${error.message}\n`,
    );
    // redirect with param error message
    redirect("/login?error=Invalid+credentials");
  }
  redirect("/");
}
