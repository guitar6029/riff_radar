import { handleSignin } from "./actions";
import { LoginProps } from "./types";

export default async function Login({ searchParams }: LoginProps) {
  const params = await searchParams;
  const error = params?.error ?? null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
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
        <button type="submit" className="btn">
          login
        </button>
      </form>
    </div>
  );
}
