import ClientSignupForm from "@/ui/Form/ClientSignupForm";
import { AuthIssue } from "../types";
import { handleSignup } from "./actions";
import Link from "next/link";

export default async function Signup({ searchParams }: AuthIssue) {
  const params = await searchParams;
  const error = params?.error ?? null;

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        action={handleSignup}
        className="flex flex-col gap-2 max-w-4xl card"
      >
        <ClientSignupForm serverError={error} />
        <div className="flex items-center gap-2">
          <span>
            Alredy signed up?{" "}
            <Link className="underline" href="/login">
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
