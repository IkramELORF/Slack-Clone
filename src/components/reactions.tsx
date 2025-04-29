import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Doc, Id } from "../../convex/_generated/dataModel";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { cn } from "@/lib/utils";
import { Hint } from "./hint";
import { EmojiPopover } from "./emoji-popover";
import { MdOutlineAddReaction } from "react-icons/md";

interface ReactionsProps {
  data: Array<
    Omit<Doc<"reactions">, "memberId"> & {
      count: number;
      memberIds: Id<"members">[];
    }
  >;
  onChange: (value: string) => void;
}
export const Reactions = ({ data, onChange }: ReactionsProps) => {
  const workspaceId = useWorkspaceId();
  const { data: currentMember } = useCurrentMember({ workspaceId });
  const currentMemberId = currentMember?._id;
  if (data.length === 0 || !currentMemberId) {
    return null;
  }
  return (
    <div className="flex items-center gap-1 mt-1 mb-1">
      {data.map((Reactions) => (
        <Hint
          key={Reactions._id}
          label={`${Reactions.count} ${Reactions.count === 1 ? "person" : "people"} reacted with ${Reactions.value}`}
        >
          <button
            onClick={() => onChange(Reactions.value)}
            className={cn(
              "h-6 px-2 rounded-full bg-slate-200/70 border border-transparent text-slate-800 flex items-center gap-x-1",
              Reactions.memberIds.includes(currentMemberId) &&
                "bg-blue-100/70 border-blue-500 text-white"
            )}
          >
            {Reactions.value}
            <span
              className={cn(
                "text-xs font-semibold text-muted-foreground",
                Reactions.memberIds.includes(currentMemberId) && "text-blue-500"
              )}
            >
              {Reactions.count}
            </span>
          </button>
        </Hint>
      ))}
      <EmojiPopover
        hint="Add reaction"
        onEmojiSelect={(emoji) => onChange(emoji)}
      >
        <button className="h-7 px-3 rounded-full bg-slate-200/70 border border-transparent hover:border-slate-500 text-slate-800 flex items-center gap-x-1">
          <MdOutlineAddReaction className="size-4" />
        </button>
      </EmojiPopover>
    </div>
  );
};
