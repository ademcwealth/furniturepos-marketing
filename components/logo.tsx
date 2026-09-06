import Link from "next/link";

export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect width="64" height="64" rx="16" fill="#363B40" />
      <path
        d="M20 16h26v7H28v9h15v7H28v13h-8V16z"
        fill="#F1ECDA"
      />
      <circle cx="46" cy="47" r="4" fill="#C1602A" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 text-base font-semibold tracking-tight ${className}`}
      aria-label="Furniture OS home"
    >
      <LogoMark />
      <span>Furniture OS</span>
    </Link>
  );
}
