"use client";

import { emailPrefix } from "@/utils/emailPrefix";
import Logout from "./Logout";
import { useState } from "react";

export default function Account({
  avatarUrl,
  email,
}: {
  avatarUrl: string | null;
  email: string | null;
}) {
  const [isDropdownVisible, setDropdownVisibility] = useState(false);

  function toggleDropdown() {
    setDropdownVisibility((prev) => !prev);
  }

  return (
    <div className="flex items-center gap-2 relative">
      <div onClick={toggleDropdown} className="rounded-4xl w-16 h-16 border-2">
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt="user profile avatar"
            className="rounded-4xl"
          />
        )}
      </div>
      {isDropdownVisible && (
        <div className="absolute top-20 right-1  w-50 rounded-2xl border-2 flex flex-col gap-2 p-4">
          <span>username</span>
          {email && <span>@{emailPrefix(email)}</span>}
          <hr />
          <Logout />
        </div>
      )}
    </div>
  );
}
