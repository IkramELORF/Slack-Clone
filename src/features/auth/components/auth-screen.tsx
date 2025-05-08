"use client"; // Directive Next.js App Router pour activer le rendu côté client

import { useState } from "react";
import { SignInFlow } from "../types";
import { SignInCard } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";
// Ce composant est le point d'entrée de l'écran d'authentification.
// Il affiche dynamiquement soit le formulaire de connexion, soit celui d'inscription, en fonction de l'état "state".
export const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("signIn");
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#5C3858]">
      <div className="w-full max-w-[420px]">
        {state === "signIn" ? (
          <SignInCard setState={setState} />
        ) : (
          <SignUpCard setState={setState} />
        )}
      </div>
    </div>
  );
};
