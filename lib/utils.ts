import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Clamps a number between a minimum and maximum value.
 * @param value The number to clamp.
 * @param min The minimum value.
 * @param max The maximum value.
 * @returns The clamped number.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Validates a number within a given range.
 * @param value The number to validate.
 * @param min The minimum allowed value.
 * @param max The maximum allowed value.
 * @returns An object with the validation result.
 */
export function validateRange(value: number, min: number, max: number) {
  const clampedValue = clamp(value, min, max);
  return {
    isValid: value === clampedValue,
    value: clampedValue,
  };
}
