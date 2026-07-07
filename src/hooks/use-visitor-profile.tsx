import { useCallback, useEffect, useState } from "react";

export type VisitorType = "empresa" | "pessoa";
export type VisitorTrack = "mentoria" | "assessoria";

export interface VisitorProfile {
  type: VisitorType;
  track?: VisitorTrack;
  completedAt: string;
}

const KEY = "po2-welcome-v1";

function read(): VisitorProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as VisitorProfile;
  } catch {
    return null;
  }
}

export function useVisitorProfile() {
  const [profile, setProfileState] = useState<VisitorProfile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProfileState(read());
    setReady(true);
  }, []);

  const setProfile = useCallback((p: Omit<VisitorProfile, "completedAt">) => {
    const full: VisitorProfile = { ...p, completedAt: new Date().toISOString() };
    try {
      window.localStorage.setItem(KEY, JSON.stringify(full));
    } catch {
      /* ignore */
    }
    setProfileState(full);
  }, []);

  const markDismissed = useCallback(() => {
    try {
      window.localStorage.setItem(
        KEY,
        JSON.stringify({ type: "pessoa", completedAt: new Date().toISOString(), dismissed: true }),
      );
    } catch {
      /* ignore */
    }
    setProfileState(read());
  }, []);

  const clear = useCallback(() => {
    try {
      window.localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
    setProfileState(null);
  }, []);

  return { profile, ready, setProfile, markDismissed, clear };
}
