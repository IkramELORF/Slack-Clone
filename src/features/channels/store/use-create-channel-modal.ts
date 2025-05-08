import { atom, useAtom } from 'jotai';

// Déclare un atom Jotai pour stocker l'état d'ouverture de la modal
const modalState = atom(false);

//useCreateChannelModal() retourne [open, setOpen] pour lire/modifier l’état.
export const useCreateChannelModal = () => {
    return useAtom(modalState);

};