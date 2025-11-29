import { clsx } from 'clsx';

/**
 * Utility function for combining Tailwind CSS classes with clsx
 * @param {...string} inputs - Class names to combine
 * @returns {string} - Combined class names
 */
export const cn = (...inputs) => {
  return clsx(inputs);
};