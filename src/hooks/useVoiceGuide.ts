import { useCallback, useEffect, useState } from "react";
import {
  isVoiceEnabled,
  repeatLastMessage,
  setVoiceEnabled,
  speak,
  speakResult,
  stopSpeaking,
} from "@/services/voiceService";

const STORAGE_KEY = "bv:voice-enabled";

export function useVoiceGuide() {
  const [enabled, setEnabled] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const v = stored === null ? true : stored === "1";
    setEnabled(v);
    setVoiceEnabled(v);
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      setVoiceEnabled(next);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      }
      return next;
    });
  }, []);

  return {
    enabled,
    toggle,
    speak,
    speakResult,
    stop: stopSpeaking,
    repeat: repeatLastMessage,
    isOn: isVoiceEnabled,
  };
}
