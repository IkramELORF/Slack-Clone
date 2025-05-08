"use client";
import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { WorkspaceSidebar } from "./workspace-sidebar";
import { usePanel } from "@/hooks/use-panel";
import { Loader } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import { Thread } from "@/features/messages/components/thread";
import { Profile } from "@/features/members/components/profile";

interface WorkspaceIdLayoutProps {
  children: React.ReactNode;
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
  const { parentMessageId, profileMemberId, onClose } = usePanel();
  const showPanel = !!parentMessageId || !!profileMemberId;

  return (
    <div className="h-full">
      <Toolbar />
      {/* Layout principal : flex horizontal divisé en plusieurs panneaux */}
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar /> {/* Barre latérale générale */}
        <ResizablePanelGroup
          direction="horizontal"
          autoSaveId="ca-workspace-layout" // Permet de sauvegarder la taille des panneaux dans le localStorage
        >
          <ResizablePanel
            defaultSize={20}
            minSize={11}
            className="bg-[#5E2C5F]"
          >
            <WorkspaceSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />{" "}
          {/* Permet de redimensionner les panneaux */}
          {/* Panel central : contenu principal (par ex. messages, channels, etc.) */}
          <ResizablePanel minSize={20} defaultSize={80}>
            {children}
          </ResizablePanel>
          {/* Panel droit (optionnel) : Thread ou Profile */}
          {showPanel && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel minSize={20} defaultSize={29}>
                {parentMessageId ? (
                  // Si on veut voir un thread (discussion liée à un message)
                  <Thread
                    messageId={parentMessageId as Id<"messages">}
                    onClose={onClose}
                  />
                ) : profileMemberId ? (
                  // Sinon, si c’est un profil utilisateur
                  <Profile
                    memberId={profileMemberId as Id<"members">}
                    onClose={onClose}
                  />
                ) : (
                  // Si aucun des deux (par sécurité), loader
                  <div className="flex h-full items-center justify-center">
                    <Loader className="size-5 animate-spin text-muted-foreground" />
                  </div>
                )}
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default WorkspaceIdLayout;
