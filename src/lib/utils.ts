
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPointsAsCurrency(points: number): string {
  return `~Rp${points.toLocaleString('id-ID')}`;
}
