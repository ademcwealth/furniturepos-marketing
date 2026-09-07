import { VISITOR_KEY, type VisitorKind } from "./site";

const BAR_SEEN_KEY = "fos:login-bar-seen";

export function readVisitor(): VisitorKind | null {
  try {
    const value = window.localStorage.getItem(VISITOR_KEY);
    return value === "user" || value === "prospect" ? value : null;
  } catch {
    return null;
  }
}

export function writeVisitor(kind: VisitorKind) {
  try {
    window.localStorage.setItem(VISITOR_KEY, kind);
  } catch {
    // Storage unavailable (private mode, blocked). The page still works.
  }
}

export function loginBarSeen(): boolean {
  try {
    return window.localStorage.getItem(BAR_SEEN_KEY) === "1";
  } catch {
    return true;
  }
}

export function markLoginBarSeen() {
  try {
    window.localStorage.setItem(BAR_SEEN_KEY, "1");
  } catch {
    // ignore
  }
}
