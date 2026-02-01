import ClientSignupForm from "@/ui/Form/ClientSignupForm";
import { AuthIssue } from "../types";
import { handleSignup } from "./actions";

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
      </form>
    </div>
  );
}
