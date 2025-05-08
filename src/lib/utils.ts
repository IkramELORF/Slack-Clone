import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// Fonction utilitaire pour fusionner des classes conditionnelles et Tailwind sans conflit.

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
