"use client";

import { useEffect, useState } from "react";
import { TriangleAlert, Loader } from "lucide-react";

const DraftPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1000); // Simulate API loading
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
      <TriangleAlert className="size-6 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">
        Drafts & sent not found
      </span>
    </div>
  );
};

export default DraftPage;
