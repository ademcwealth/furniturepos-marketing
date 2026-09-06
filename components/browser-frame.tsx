import Image from "next/image";

/**
 * A light browser chrome around a product screenshot.
 * Screenshots live in /public/screens and are captured from the Demo tenant.
 */
export function BrowserFrame({
  src,
  alt,
  width,
  height,
  priority = false,
  caption,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_80px_-30px_rgba(36,38,41,0.45)]">
        <div className="flex items-center gap-1.5 border-b border-line bg-surface-muted px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="ml-3 h-5 flex-1 rounded-md bg-background" />
        </div>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes="(min-width: 1024px) 960px, 100vw"
          className="block h-auto w-full"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center text-xs text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
