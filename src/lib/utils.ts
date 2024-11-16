import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomId(length = 16) {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

export const isValidUrl = (url: string): boolean => {
  const urlRegex = /^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)([\/\w\-?=&%.]*)?$/i;
  return urlRegex.test(url);
};
