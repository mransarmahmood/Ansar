import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Compose class names with clsx + tailwind-merge.
 * Used by shadcn-style component variants.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
