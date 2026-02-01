"use client";

export default function Account({ avatarUrl }: { avatarUrl: string | null }) {
  return (
    <div>
      <div className="rounded-4xl w-25 h-25 border-2">
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt="user profile avatar"
            className="rounded-4xl"
          />
        )}
      </div>
    </div>
  );
}
