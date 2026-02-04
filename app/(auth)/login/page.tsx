import Link from "next/link";
import { AuthIssue } from "../types";
import { handleSignin } from "./actions";

export default async function Login({ searchParams }: AuthIssue) {
  const params = await searchParams;
  const error = params?.error ?? null;

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        action={handleSignin}
        className="flex flex-col gap-2 max-w-4xl card"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="label capitalize">
            email
          </label>
          <input type="email" name="email" className="input" required />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="label capitalize">
            password
          </label>
          <input type="password" name="password" className="input" required />
        </div>

        {/* show error is available */}
        {error && <div className="alert alert-error">Invalid Credentials</div>}
        <button type="submit" className="btn capitalize">
          login
        </button>
        <div className="flex items-center gap-2">
          <span>
            Don't have an account?{" "}
            <Link href="/signup" className="underline">
              Signup
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
