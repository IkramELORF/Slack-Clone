import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback, useMemo, useState } from "react";
import { Doc, Id } from "../../../../convex/_generated/dataModel";

type RequestType = { body: string, image?: Id<"_storage">, workspaceId: Id<"workspaces">, channelId?: Id<"channels">, parentMessageId?: Id<"messages"> };
type ResponseType = Id<"workspaces"> | null;

type Options = {
    onSuccess?: (data: Id<"messages">) => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
    throwError?: boolean;
};
export const useCreateMessage = () => {
    const [data, setData] = useState<ResponseType>(null);
    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<"success" | "error" | "pending" | "settled" | null>(null);

    const isPending = useMemo(() => status === "pending", [status]);
    const isSuccess = useMemo(() => status === "success", [status]);
    const isError = useMemo(() => status === "error", [status]);
    const isSettled = useMemo(() => status === "settled", [status]);

    const mutation = useMutation(api.messages.create);
    const mutate = useCallback(async (values: RequestType, options?: Options) => {
        try {
            setData(null);
            setError(null);
            setStatus("pending");
            const response = await mutation(values);
            options?.onSuccess?.(response);
            return response;
        } catch (error) {
            setStatus("error");
            options?.onError?.(error as Error);
            if (options?.throwError) {
                throw error;
            }
        } finally {
            options?.onSettled?.();
            setStatus("settled");
        }
    }, [mutation]);
    return {
        mutate,
        data,
        error,
        isSuccess,
        isError,
        isPending,
        isSettled,
    };
};   