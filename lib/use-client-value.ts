"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/**
 * Read a browser-only primitive (localStorage, matchMedia) without a setState-in-effect.
 * Renders `serverValue` on the server and during hydration, then the real value.
 * `read` must be cheap and return a primitive so the snapshot is stable.
 */
export function useClientValue<T extends string | number | boolean | null>(
  read: () => T,
  serverValue: T,
): T {
  return useSyncExternalStore(noop, read, () => serverValue);
}
