"use client";

import { closeMyAccount } from "@/lib/actions/closeAccount";
import { useState } from "react";

export default function CloseAccount() {
  const [confirmDelete, setConfirmStatus] = useState(false);
  const [isLoading, setLoading] = useState(false);

  async function handleCloseAccount() {
    setLoading(true);
    try {
      const { ok } = await closeMyAccount();
      if (!ok) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error handleCloseAccount : ", error);
    }
  }

  if (!confirmDelete) {
    return (
      <button
        onClick={() => setConfirmStatus(true)}
        className="btn btn-lg btn-warning min-w-100 max-w-100"
      >
        Close Account
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <span>Are you sure ?</span>
      <button
        onClick={() => setConfirmStatus(false)}
        className="btn btn-lg min-w-100"
      >
        Cancel
      </button>
      <button
        disabled={isLoading}
        onClick={handleCloseAccount}
        className="btn btn-lg btn-warning min-w-100"
      >
        {isLoading ? "Closing..." : "Close Account"}
      </button>
    </div>
  );
}
