"use client";
import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";

export default function Home() {
  const { signOut } = useAuthActions();

  return (
    <div>
      Logged In!
      <Button
        onClick={async () => {
          await signOut();
          window.location.href = "/auth";
        }}
      >
        Sign Out
      </Button>
    </div>
  );
}
