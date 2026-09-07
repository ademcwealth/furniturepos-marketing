export const SITE_URL = "https://furniturepos.com";
export const APP_LOGIN_URL = "https://app.furniturepos.com/login";
export const SITE_NAME = "Furniture OS";

/** localStorage key that remembers whether a visitor is an existing user or a prospect. */
export const VISITOR_KEY = "fos:visitor";
export type VisitorKind = "user" | "prospect";

export const NAV_LINKS = [
  { href: "/#product", label: "Product" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#security", label: "Security" },
  { href: "/#faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
] as const;
