import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";
import { useToggle } from "react-use";
import { cn } from "@/lib/utils";

// Props attendues par le composant WorkspaceSection
interface WorkspaceSectionProps {
  children: React.ReactNode; // Éléments JSX enfants (ex: liste de canaux ou utilisateurs)
  label: string; // Nom de la section
  hint: string; // Texte de l'infobulle pour le bouton "+"
  onNew?: () => void; // Callback appelé lors du clic sur "+" (facultatif)
}
// Définition du composant
export const WorkspaceSection = ({
  children,
  label,
  hint,
  onNew,
}: WorkspaceSectionProps) => {
  // État local pour afficher ou masquer la section
  const [on, toggle] = useToggle(true);

  return (
    <div className="flex flex-col mt-3 px-2">
      <div className="flex items-center px-3.5 group">
        {/* Bouton pour replier/déplier la section */}
        <Button
          variant="transparent"
          className="p-0.5 text-sm size-6 shrink-0 text-[#f9edffcc]"
          onClick={toggle}
        >
          {/* Icône flèche qui pivote selon l'état "on" */}
          <FaCaretDown
            className={cn("size-4 transition-transform", on && "rotate-90")}
          />
        </Button>
        {/* Label de la section (ex: "Channels") */}
        <Button
          variant="transparent"
          size="sm"
          className="group px-1.5 text-sm text-[#f9edffcc] h-[28px] justify-start overflow-hidden items-center"
        >
          <span className="truncate">{label}</span>
        </Button>
        {/* Bouton "+" pour ajouter un élément si "onNew" est défini */}
        {onNew && (
          <Hint label={hint} side="top" align="center">
            <Button
              onClick={onNew}
              variant="transparent"
              size="iconSm"
              className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto p-0.5 text-sm text-[#f9edffcc] size-6 shrink-0"
            >
              <PlusIcon className="size-5" />
            </Button>
          </Hint>
        )}
      </div>
      {/* Contenu de la section : enfants affichés seulement si "on" est true */}
      {on && children}
    </div>
  );
};
