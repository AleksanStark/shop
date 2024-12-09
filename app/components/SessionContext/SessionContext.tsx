"use client";

import { ContextProviderProps, SessionContextType } from "@/types/types";
import { createContext, useState } from "react";

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined
);

export function SessionProvider({ children }: ContextProviderProps) {
  const [sessionId, setSessionId] = useState("");

  const handleChangeSessionId = (sessionId: string) => {
    setSessionId(sessionId);
  };

  return (
    <SessionContext.Provider value={{ sessionId, handleChangeSessionId }}>
      {children}
    </SessionContext.Provider>
  );
}
