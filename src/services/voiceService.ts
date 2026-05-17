/**
 * Wrapper around the browser SpeechSynthesis API.
 * Safe to import on the server (no-ops if window is unavailable).
 */

let lastMessage = "";
let enabled = true;

function isAvailable(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function setVoiceEnabled(v: boolean) {
  enabled = v;
  if (!v) stopSpeaking();
}

export function isVoiceEnabled(): boolean {
  return enabled;
}

export function speak(message: string, opts?: { rate?: number; pitch?: number; force?: boolean }) {
  if (!isAvailable()) return;
  if (!enabled && !opts?.force) return;
  lastMessage = message;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(message);
    u.rate = opts?.rate ?? 1;
    u.pitch = opts?.pitch ?? 1;
    u.lang = "en-US";
    window.speechSynthesis.speak(u);
  } catch {
    /* ignore */
  }
}

export function speakResult(text: string) {
  speak(`Result ready. ${text}`, { force: true });
}

export function stopSpeaking() {
  if (!isAvailable()) return;
  try {
    window.speechSynthesis.cancel();
  } catch {
    /* ignore */
  }
}

export function repeatLastMessage() {
  if (lastMessage) speak(lastMessage, { force: true });
}

export function getLastMessage(): string {
  return lastMessage;
}
