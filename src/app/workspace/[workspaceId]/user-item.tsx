import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Id } from "../../../../convex/_generated/dataModel";
import { cva, type VariantProps } from "class-variance-authority";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Définition des variantes de style avec class-variance-authority
const userItemVariants = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 px-4 text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-[#f9edffcc]", // Style par défaut
        active: "text-[#481349] bg-white/99 hover:bg-white/90", // Style quand actif/sélectionné
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Interface des props attendues par UserItem
interface UserItemProps {
  id: Id<"members">; // ID du membre (utilisé dans l'URL)
  label?: string; // Nom de l’utilisateur à afficher
  image?: string; // URL de l’image de profil
  variant?: VariantProps<typeof userItemVariants>["variant"]; // Variante de style (active ou default)
}

export const UserItem = ({ id, label, image, variant }: UserItemProps) => {
  const workspaceId = useWorkspaceId();
  const avatarFallback = label?.charAt(0).toUpperCase(); // Lettre à afficher si image absente
  return (
    // Utilisation du composant Button comme wrapper cliquable, stylé dynamiquement
    <Button
      variant="transparent"
      size="sm"
      className={cn(userItemVariants({ variant }), "justify-start")}
      asChild
    >
      <Link href={`/workspace/${workspaceId}/member/${id}`}>
        {/* Affichage de l'avatar du membre */}
        <Avatar className="size-6 rounded-md mr-1">
          <AvatarImage className="rounded-md" src={image} />
          <AvatarFallback className="rounded-md bg-sky-500 text-white text-xs">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        {/* Nom de l’utilisateur, tronqué si trop long */}
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  );
};
