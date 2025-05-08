import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback, useMemo, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

type RequestType = { name: string, workspaceId: Id<"workspaces"> };
type ResponseType = Id<"workspaces"> | null;

// Options personnalisables passées à mutate
type Options = {
    onSuccess?: (data: Id<"channels">) => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
    throwError?: boolean;
};
export const useCreateChannel = () => {
    // États locaux pour le statut et les données
    const [data, setData] = useState<ResponseType>(null);
    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<"success" | "error" | "pending" | "settled" | null>(null);
    // États dérivés pour usage dans l'UI
    const isPending = useMemo(() => status === "pending", [status]);
    const isSuccess = useMemo(() => status === "success", [status]);
    const isError = useMemo(() => status === "error", [status]);
    const isSettled = useMemo(() => status === "settled", [status]);
    // Hook Convex pour exécuter la mutation
    const mutation = useMutation(api.channels.create);
    // Fonction mutate personnalisée avec gestion d'état
    const mutate = useCallback(async (values: RequestType, options?: Options) => {
        try {
            setData(null);
            setError(null);
            setStatus("pending");
            const response = await mutation(values);// Appel à Convex
            options?.onSuccess?.(response); // Callback de succès
            return response;
        } catch (error) {
            setStatus("error");
            options?.onError?.(error as Error); // Callback d'erreur
            if (options?.throwError) {
                throw error;
            }
        } finally {
            options?.onSettled?.();// Callback toujours exécuté
            setStatus("settled");
        }
    }, [mutation]);
    // Retourne les états et la fonction mutate
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