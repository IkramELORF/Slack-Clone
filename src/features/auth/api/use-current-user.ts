import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

// Hook personnalisé pour interroger l'utilisateur courant depuis le backend Convex.
// `useQuery` retourne `undefined` tant que les données sont en cours de chargement.
export const useCurrentUser = () => {
    const data = useQuery(api.users.current);
    const isLoading = data === undefined;
    return { data, isLoading };

}       