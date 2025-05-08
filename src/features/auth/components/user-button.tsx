"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "../api/use-current-user";
import { Loader, LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

export const UserButton = () => {
  const { signOut } = useAuthActions();

  // Bouton utilisateur avec menu déroulant et fonction de déconnexion
  const { data, isLoading } = useCurrentUser(); // Hook pour récupérer l'utilisateur courant
  if (isLoading) {
    return <Loader className="size-4 animate-spin" />;
  }
  // Ne rien afficher si aucun utilisateur
  if (!data) {
    return null;
  }
  const { image, name } = data;
  const avatarFallback = name!.charAt(0).toUpperCase(); // Affiche la première lettre si l’image n’est pas disponible.

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="rounded-md size-10 hover:opacity-75 transition">
          <AvatarImage className="rounded-md" alt="{name}" src={image} />
          <AvatarFallback className="rounded-md bg-sky-500 text-white">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="w-60">
        <DropdownMenuItem
          onClick={() => {
            signOut().then(() => {
              window.location.href = "/auth";
            });
          }}
          className="h-10"
        >
          <LogOut className="size-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
