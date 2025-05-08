import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Doc } from "../../../../convex/_generated/dataModel";
import { ChevronDown, ListFilter, SquarePen } from "lucide-react";
import { Hint } from "@/components/hint";
import { PreferencesModal } from "./preferences-modal";
import { useState } from "react";
import { InviteModal } from "./invite-modal";

// Props attendues par WorkspaceHeader
interface WorkspaceHeaderProps {
  workspace: Doc<"workspaces">; // Données du workspace courant
  isAdmin: boolean; // Détermine si l’utilisateur est admin
}
export const WorkspaceHeader = ({
  workspace,
  isAdmin,
}: WorkspaceHeaderProps) => {
  // États pour l'ouverture/fermeture des modales
  const [preferencesopen, setPreferencesOpen] = useState(false);
  const [inviteopen, setInviteOpen] = useState(false);
  return (
    <>
      {/* Modal d'invitation des membres */}
      <InviteModal
        open={inviteopen}
        setOpen={setInviteOpen}
        name={workspace.name}
        joinCode={workspace.joinCode}
      />
      {/* Modal de configuration des préférences du workspace */}
      <PreferencesModal
        open={preferencesopen}
        setOpen={setPreferencesOpen}
        initialValue={workspace.name}
      />
      {/* Header principal du workspace */}
      <div className="flex items-center justify-between px-4 h-[60px] gap-0.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="transparent"
              size="sm"
              className="font-semibold text-lg w-auto p-1.5 overflow-hidden"
            >
              <span className="truncate">{workspace.name}</span>
              <ChevronDown className="size-4 ml-1 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          {/* Contenu du menu déroulant */}
          <DropdownMenuContent side="bottom" align="start" className="w-64">
            <DropdownMenuItem className="cursor-pointer capitalize">
              <div className="size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2 ">
                {workspace.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex flex-col items-start"></div>
                <p className="font-bold">{workspace.name}</p>
                <p className="text-xs text-muted-foreground">
                  Active workspace
                </p>
              </div>
            </DropdownMenuItem>
            {/* Actions réservées à l'admin */}
            {isAdmin && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => {
                    setTimeout(() => {
                      setInviteOpen(true);
                    }, 0);
                  }}
                  className="cursor-pointer py-2"
                >
                  Invite people to {workspace.name}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => {
                    setTimeout(() => {
                      setPreferencesOpen(true);
                    }, 0);
                  }}
                  className="cursor-pointer py-2"
                >
                  Preference
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Boutons à droite du header : filtre + nouveau message */}
        <div className="flex items-center gap-0.5 shrink-0">
          <Hint label="Filter conversations" side="bottom">
            <Button variant="transparent" size="iconSm">
              <ListFilter className="size-4" />
            </Button>
          </Hint>
          <Hint label="New message" side="bottom">
            <Button variant="transparent" size="sm">
              <SquarePen className="size-4" />
            </Button>
          </Hint>
        </div>
      </div>
    </>
  );
};
