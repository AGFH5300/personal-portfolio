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

function isBackgroundWhite(r: number, g: number, b: number, a: number) {
  if (a === 0) return false;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return max - min < 18 && min > 232;
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
        const width = canvas.width;
        const height = canvas.height;
        const visited = new Uint8Array(width * height);
        const queue: number[] = [];

        const enqueueIfWhite = (x: number, y: number) => {
          if (x < 0 || x >= width || y < 0 || y >= height) return;
          const point = y * width + x;
          if (visited[point]) return;

          const offset = point * 4;
          if (
            isBackgroundWhite(
              pixels[offset],
              pixels[offset + 1],
              pixels[offset + 2],
              pixels[offset + 3],
            )
          ) {
            visited[point] = 1;
            queue.push(point);
          }
        };

        // Only remove near-white pixels connected to an outer edge. This gets
        // rid of white logo canvases without destroying white details inside
        // the artwork itself.
        for (let x = 0; x < width; x += 1) {
          enqueueIfWhite(x, 0);
          enqueueIfWhite(x, height - 1);
        }
        for (let y = 0; y < height; y += 1) {
          enqueueIfWhite(0, y);
          enqueueIfWhite(width - 1, y);
        }

        for (let cursor = 0; cursor < queue.length; cursor += 1) {
          const point = queue[cursor];
          const x = point % width;
          const y = Math.floor(point / width);
          const offset = point * 4;
          pixels[offset + 3] = 0;

          enqueueIfWhite(x + 1, y);
          enqueueIfWhite(x - 1, y);
          enqueueIfWhite(x, y + 1);
          enqueueIfWhite(x, y - 1);
        }

        // Near-black neutral lettering often disappears against the dark card
        // after its white canvas is removed. Lift only those neutral pixels;
        // coloured brand artwork is left untouched.
        for (let i = 0; i < pixels.length; i += 4) {
          if (pixels[i + 3] === 0) continue;

          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const neutral = max - min < 16;

          if (neutral && max < 78) {
            const lifted = 236 - Math.round(max * 0.2);
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
          "flex h-full w-full items-center justify-center rounded-md border border-border bg-muted/60 text-[11px] font-semibold tracking-wide text-primary",
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
