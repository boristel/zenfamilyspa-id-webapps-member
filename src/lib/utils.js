/**
 * Utility functions for the ZenApps application
 */

/**
 * Format a user's display name
 * @param {Object} user - Firebase user object
 * @returns {string} Formatted display name
 */
export const formatDisplayName = (user) => {
  if (!user) return 'Guest';

  return user.displayName ||
         user.email?.split('@')[0] ||
         'User';
};

/**
 * Format user email with fallback
 * @param {Object} user - Firebase user object
 * @returns {string} Email address or fallback text
 */
export const formatEmail = (user) => {
  return user?.email || 'No email available';
};

/**
 * Generate user initials from display name or email
 * @param {Object} user - Firebase user object
 * @returns {string} User initials (max 2 characters)
 */
export const getUserInitials = (user) => {
  const name = user?.displayName || user?.email || 'User';
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
};

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

/**
 * Generate a safe CSS className string
 * @param {...string} classes - CSS class names to combine
 * @returns {string} Combined class names
 */
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};