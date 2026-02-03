"use client";

import { emailPrefix } from "@/utils/emailPrefix";
import Logout from "./Logout";
import { useState } from "react";

export type ProfileProps = {
  profile: {
    email: string | null;
    username: string | null;
    avatarUrl: string | null;
  };
};

export default function Profile({ profile }: ProfileProps) {
  const [isDropdownVisible, setDropdownVisibility] = useState(false);

  function toggleDropdown() {
    setDropdownVisibility((prev) => !prev);
  }

  return (
    <div className="flex items-center gap-2 relative">
      {profile.username && <span>{profile.username}</span>}
      <div onClick={toggleDropdown} className="rounded-4xl w-16 h-16 border-2">
        {profile.avatarUrl && (
          <img
            src={profile.avatarUrl}
            alt="user profile avatar"
            className="rounded-4xl"
          />
        )}
      </div>
      {isDropdownVisible && (
        <div className="absolute top-20 right-1  w-50 rounded-2xl border-2 flex flex-col items-start gap-2 p-4">
          {profile.username && <span>{profile.username}</span>}
          {profile.email && <span>@{emailPrefix(profile.email)}</span>}
          <div className="w-full h-1 border-b"></div>
          <Logout />
        </div>
      )}
    </div>
  );
}
