import { useEffect, useMemo, useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

const POSTIMG_ORIGIN = "https://i.postimg.cc/";
const POSTIMG_PROXY_PREFIX = "/media/postimg/";

function resolveImageSource(src: string) {
  return src.startsWith(POSTIMG_ORIGIN)
    ? `${POSTIMG_PROXY_PREFIX}${src.slice(POSTIMG_ORIGIN.length)}`
    : src;
}

type ThemeAwareLogoProps = {
  src?: string;
  alt: string;
  label: string;
  className?: string;
};

export function ThemeAwareLogo({
  src,
  alt,
  label,
  className,
}: ThemeAwareLogoProps) {
  const { theme } = useTheme();
  const resolvedSrc = useMemo(() => (src ? resolveImageSource(src) : ""), [src]);
  const [darkSrc, setDarkSrc] = useState<string>("");

  const initials = label
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  useEffect(() => {
    if (theme !== "dark" || !resolvedSrc) {
      setDarkSrc("");
      return;
    }

    let cancelled = false;
    const image = new Image();
    image.decoding = "async";

    image.onload = () => {
      if (cancelled) return;

      try {
        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth || 96;
        canvas.height = image.naturalHeight || 96;

        const context = canvas.getContext("2d", { willReadFrequently: true });
        if (!context) return;

        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        for (let i = 0; i < pixels.length; i += 4) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const neutral = max - min < 18;

          // Strip the opaque white/off-white canvas many school logos ship with.
          if (neutral && min > 232) {
            pixels[i + 3] = 0;
            continue;
          }

          // Convert near-black neutral lettering to a light neutral so it stays
          // visible on the dark theme while keeping coloured artwork intact.
          if (neutral && max < 95 && pixels[i + 3] > 0) {
            const lifted = 232 - Math.round(max * 0.2);
            pixels[i] = lifted;
            pixels[i + 1] = lifted;
            pixels[i + 2] = lifted;
          }
        }

        context.putImageData(imageData, 0, 0);
        setDarkSrc(canvas.toDataURL("image/png"));
      } catch {
        setDarkSrc("");
      }
    };

    image.onerror = () => {
      if (!cancelled) setDarkSrc("");
    };

    image.src = resolvedSrc;

    return () => {
      cancelled = true;
    };
  }, [resolvedSrc, theme]);

  if (!src) {
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center rounded-md border border-border bg-muted text-xs font-semibold tracking-wide text-primary",
          className,
        )}
        aria-label={alt}
      >
        {initials || "AG"}
      </div>
    );
  }

  return (
    <div className={cn("relative h-full w-full", className)}>
      <img
        src={theme === "dark" && darkSrc ? darkSrc : resolvedSrc}
        alt={alt}
        className="h-full w-full object-contain"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
