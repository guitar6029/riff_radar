"use client";

import Logout from "./Logout";

export default function Account({ avatarUrl }: { avatarUrl: string | null }) {
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-4xl w-25 h-25 border-2">
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt="user profile avatar"
            className="rounded-4xl"
          />
        )}
      </div>
      <Logout />
    </div>
  );
}
