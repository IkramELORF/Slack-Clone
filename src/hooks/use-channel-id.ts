// Hook personnalisé pour extraire l'ID du canal à partir de l'URL
import { useParams } from "next/navigation";

// Import du type Id depuis le modèle de données généré par Convex
import { Id } from "../../convex/_generated/dataModel";

// Hook personnalisé pour récupérer l'identifiant du canal depuis l'URL
export const useChannelId = () => {
    const params = useParams(); // Récupère tous les paramètres dynamiques de l'URL
    return params.channelId as Id<"channels">; // Convertit et retourne l'ID du canal avec le bon type
}