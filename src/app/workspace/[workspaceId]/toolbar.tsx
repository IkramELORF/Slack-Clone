import { Button } from "@/components/ui/button";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Info, Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useState } from "react";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useRouter } from "next/navigation";
import { Hint } from "@/components/hint";
import { useCreateAideModal } from "@/features/aide/store/use-create-channel-modal";

export const Toolbar = () => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const { data } = useGetWorkspace({ id: workspaceId });
  const { data: channels } = useGetChannels({ workspaceId });
  const { data: members } = useGetMembers({ workspaceId });
  const [open, setOpen] = useState(false);
  const [_openAide, setIsAideOpen] = useCreateAideModal();
  // Navigue vers un channel sélectionné et ferme la boîte de dialogue
  const onChannelClick = (channelId: string) => {
    setOpen(false);
    router.push(`/workspace/${workspaceId}/channel/${channelId}`);
  };
  // Navigue vers un membre sélectionné et ferme la boîte de dialogue
  const onMemberClick = (memberId: string) => {
    setOpen(false);
    router.push(`/workspace/${workspaceId}/member/${memberId}`);
  };

  return (
    <nav className="bg-[#481349] flex items-center justify-between h-10 p-1.5">
      <div className="flex-1" />
      <div className="min-w-[280px] max-[642px] grow-[2] shrink">
        <Button
          onClick={() => setOpen(true)}
          size="sm"
          className="bg-accent/25 hover:bg-accent-25 w-full justify-start h-7 px-2"
        >
          <Search className="size-4 text-white mr-2" />
          <span className="text-xs text-white">Search {data?.name}</span>
        </Button>

        {/* Composant de dialogue de commande, s'affiche quand "open" est true */}
        <CommandDialog open={open} onOpenChange={setOpen}>
          {/* Champ de saisie de commande */}
          <CommandInput placeholder="Type a command or search..." />
          {/* Liste des résultats */}
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {/* Groupe des channels */}
            <CommandGroup heading="Channels">
              {channels?.map((channel) => (
                <CommandItem
                  onSelect={() => onChannelClick(channel._id)}
                  key={channel._id}
                >
                  {channel.name}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            {/* Groupe des membres */}
            <CommandGroup heading="Members">
              {members?.map((member) => (
                <CommandItem
                  onSelect={() => onMemberClick(member._id)}
                  key={member._id}
                >
                  {member.user.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
      <div className=" ml-auto flex-1 flex items-center justify-end">
        <Hint label="Aide" side="bottom">
          <Button
            onClick={() => setIsAideOpen(true)}
            variant="transparent"
            size="iconSm"
          >
            <Info className="size-5 text-white" />
          </Button>
        </Hint>
      </div>
    </nav>
  );
};
