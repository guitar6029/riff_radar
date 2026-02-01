"use client";

import { checkUsername } from "@/utils/actions/CheckUsername";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

type FormInputs = {
  email: string;
  password: string;
  username: string;
  usernameConfirmed: boolean;
};

export default function ClientSignupForm({
  serverError,
}: {
  serverError: string | null;
}) {
  const {
    register,
    watch,
    setError,
    setValue,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm<FormInputs>({
    mode: "onChange",
    defaultValues: { usernameConfirmed: false },
  });

  const username = watch("username");
  const usernameConfirmed = watch("usernameConfirmed");

  const [isCheckingUsernameAvailability, setIsChecking] = useState(false);

  // If the user edits the username after a "taken" result, clear that stale manual error.
  useEffect(() => {
    setValue("usernameConfirmed", false);

    if (errors.username?.type === "manual") {
      clearErrors("username");
    }
  }, [username, errors.username?.type, clearErrors, setValue]);

  async function checkUsernameAvailability() {
    setIsChecking(true);

    try {
      // Don't call the server if username fails basic validation (e.g., required).
      const ok = await trigger("username");
      if (!ok) return;

      const isAvailable = await checkUsername(username);

      if (!isAvailable) {
        setValue("usernameConfirmed", false);
        setError("username", { type: "manual", message: "Username is taken" });
      } else {
        clearErrors("username");
        setValue("usernameConfirmed", true);
      }
    } finally {
      setIsChecking(false);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="label capitalize">
          email
        </label>
        <input
          id="email"
          type="email"
          className="input"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email?.message && <span>{errors.email.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="label capitalize">
          password
        </label>
        <input
          id="password"
          type="password"
          className="input"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password?.message && <span>{errors.password.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="username" className="label capitalize">
          username
        </label>
        <input
          id="username"
          type="text"
          className="input"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username?.message && <span>{errors.username.message}</span>}

        {usernameConfirmed ? (
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={48}
              height={48}
              viewBox="0 0 48 48"
            >
              <circle cx={24} cy={24} r={21} fill="#4caf50"></circle>
              <path
                fill="#ccff90"
                d="M34.6 14.6L21 28.2l-5.6-5.6l-2.8 2.8l8.4 8.4l16.4-16.4z"
              ></path>
            </svg>
          </span>
        ) : (
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <g fill="none">
                <path
                  fill="currentColor"
                  fillOpacity={0.16}
                  d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit={10}
                  strokeWidth={1.5}
                  d="M19.187 5.047L4.957 19.098M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10s10-4.477 10-10"
                ></path>
              </g>
            </svg>
          </span>
        )}

        <button
          type="button"
          className="btn"
          disabled={isCheckingUsernameAvailability || !username}
          onClick={checkUsernameAvailability}
        >
          {isCheckingUsernameAvailability
            ? "Checking..."
            : "Check availability"}
        </button>
      </div>

      {serverError && <div className="alert alert-error">{serverError}</div>}

      <button
        type="submit"
        className="btn"
        disabled={!usernameConfirmed || isCheckingUsernameAvailability}
      >
        signup
      </button>
    </>
  );
}
