"use client";

import type { ImageLoaderProps } from "next/image";

// Files are generated at build preparation time, so static hosting needs no
// image service or runtime transformation. Keep the original as a safe fallback.
export default function imageLoader({ src, width }: ImageLoaderProps) {
  if (src.startsWith("/images/photos/") && src.endsWith(".webp")) {
    return src.replace(/\.webp$/, `-${width}.webp`);
  }
  return src;
}
