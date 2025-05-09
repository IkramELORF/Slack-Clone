"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Info,
  Bell,
  Clock,
  Smile,
  Video,
  UserCircle,
  Zap,
  Settings,
  Play,
} from "lucide-react";
import { useCreateAideModal } from "../store/use-create-channel-modal";

export const CreateAideModal = () => {
  const [open, setOpen] = useCreateAideModal();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg flex items-center gap-2">
            <Info className="size-5 text-purple-600" />
            Aide
          </DialogTitle>
          <DialogDescription>Trouver des réponses rapidement</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search bar */}
          <div>
            <Input placeholder="Comment pouvons-nous vous aider ?" />
            <Button
              variant="link"
              className="text-sm text-purple-600 mt-1 pl-0"
            >
              En savoir plus
            </Button>
          </div>

          <div className="bg-accent/10 rounded-lg p-3 space-y-1 border border-accent">
            <div className="text-xs text-muted-foreground">NOUVEAU</div>
            <div className="font-semibold text-sm">Nouveautés de Slack</div>
            <p className="text-sm text-muted-foreground">
              Découvrez les nouvelles fonctionnalités disponibles
            </p>
          </div>

          {/* Help topics with icons */}
          <div className="grid grid-cols-2 gap-3 mt-2 text-sm">
            <HelpItem
              icon={<Bell className="size-4" />}
              label="Configurer les notifications"
            />
            <HelpItem
              icon={<UserCircle className="size-4" />}
              label="Définir votre statut"
            />
            <HelpItem
              icon={<Clock className="size-4" />}
              label="Définir un rappel"
            />
            <HelpItem
              icon={<Smile className="size-4" />}
              label="Utiliser les émoji"
            />
            <HelpItem
              icon={<Video className="size-4" />}
              label="Tutoriels vidéos"
            />
          </div>

          {/* Categories */}
          <div className="mt-4 space-y-1">
            <h3 className="text-sm font-semibold">Catégories d’assistance</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              <div>✅ Premiers pas</div>
              <div>💡 Utiliser Slack</div>
              <div>🧑 Votre profil</div>
              <div>🎥 Tutoriels vidéos</div>
            </div>
          </div>

          {/* Support CTA */}
          <div className="pt-4 text-center">
            <Button variant="outline" size="sm">
              Faire une demande d’aide
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const HelpItem = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer">
    <div className="text-purple-600">{icon}</div>
    {label}
  </div>
);
