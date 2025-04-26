import { useSearchParams, useRouter } from "next/navigation";

export const useParentMessageId = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const parentMessageId = searchParams.get("parentMessageId");

  const setParentMessageId = (id: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (id) {
      params.set("parentMessageId", id);
    } else {
      params.delete("parentMessageId");
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return [parentMessageId, setParentMessageId] as const;
};
