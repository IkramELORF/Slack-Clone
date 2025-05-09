import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-modal";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { WorkspaceHeader } from "./workspace-header";
import { SidebarItem } from "./sidebar-item";
import { WorkspaceSection } from "./workspace-section";
import { UserItem } from "./user-item";
import {
  AlertTriangle,
  HashIcon,
  Loader,
  MessageSquareText,
  SendHorizonal,
} from "lucide-react";
import { useChannelId } from "@/hooks/use-channel-id";
import { useMemberId } from "@/hooks/use-member-id";
import Link from "next/link";
// Composant principal : barre latérale d'un espace de travail
export const WorkspaceSidebar = () => {
  const memberId = useMemberId();
  const channelId = useChannelId();
  const workspaceId = useWorkspaceId();
  const [_open, setOpen] = useCreateChannelModal();

  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });
  const { data: members, isLoading: membersLoading } = useGetMembers({
    workspaceId,
  });
  // Affichage d'un spinner de chargement tant que les données importantes ne sont pas prêtes
  if (memberLoading || workspaceLoading) {
    return (
      <div className="flex flex-col bg-[#5E2C5F] h-full items-center justify-center ">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    );
  }
  // Affichage d'un message d'erreur si le workspace ou le membre est introuvable
  if (!workspace || !member) {
    return (
      <div className="flex flex-col gap-y-2 bg-[#5E2C5F] h-full items-center justify-center ">
        <AlertTriangle className="size-5 text-white" />
        <p className="text-white text-sm">Workspace not found</p>
      </div>
    );
  }
  // Rendu principal de la sidebar
  return (
    <div className="flex flex-col bg-[#5E2C5F] h-full w-full ">
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={member.role === "admin"}
      />
      <div className="flex flex-col px-2 mt-3">
        <Link href={`/workspace/${workspaceId}/thread`}>
          <button className="flex items-center gap-2 px-2 py-1 text-sm text-gray-300 hover:text-white transition">
            <MessageSquareText size={15} />
            <span className="text-sm truncate">Discussion threads</span>
          </button>
        </Link>
        <Link href={`/workspace/${workspaceId}/draft`}>
          <button className="flex items-center gap-2 px-2 py-1 text-sm text-gray-300 hover:text-white transition">
            <SendHorizonal size={15} />
            <span className="text-sm truncate">Drafts & Sent</span>
          </button>
        </Link>
      </div>

      <WorkspaceSection
        label="Channels"
        hint="New channel"
        onNew={member.role === "admin" ? () => setOpen(true) : undefined}
      >
        {channels?.map((item) => (
          <SidebarItem
            key={item._id}
            icon={HashIcon}
            label={item.name}
            id={item._id}
            variant={channelId === item._id ? "active" : "default"}
          />
        ))}
      </WorkspaceSection>
      <WorkspaceSection
        label="Direct messages"
        hint="New direct message"
        onNew={() => {}}
      >
        {members?.map((item) => (
          <UserItem
            key={item._id}
            id={item._id}
            label={item.user.name}
            image={item.user.image}
            variant={item._id === memberId ? "active" : "default"}
          />
        ))}
      </WorkspaceSection>
    </div>
  );
};
