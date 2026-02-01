import { createClient } from "@/lib/supabase/server";
import { SignupSchema } from "@/lib/zod/Signup";
import { redirect } from "next/navigation";

export async function handleSignup(formData: FormData) {
  // first parse the email and password, if not valid do not continue
  const validatedFields = SignupSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    username: formData.get("username"),
  });

  if (!validatedFields.success) {
    // throw an error
    console.error(validatedFields.error);
    redirect("/signup?error=Invalid+credentials");
  }
  //if fields are valid, continue
  const { email, password, username } = validatedFields.data;
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username },
    },
  });

  // if no error, then redirect to home
  if (error) {
    console.error(
      `Error(s)----------\n Code : ${error.code}\nMessage: ${error.message}\n`,
    );
    // redirect with param error message
    redirect("/signup?error=Invalid+credentials");
  }

  redirect("/");
}
