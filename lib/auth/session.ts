// Session management utilities
export interface UserSession {
  nis: string;
  nama: string;
  email: string;
  kelas: string;
  [key: string]: any;
}

const SESSION_KEY = 'user_session';

/**
 * Get the current user session from localStorage
 */
export const getSession = (): UserSession | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  } catch {
    return null;
  }
};

/**
 * Set the user session in localStorage
 */
export const setSession = (user: UserSession): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
};

/**
 * Clear the user session from localStorage
 */
export const clearSession = (): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(SESSION_KEY);
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return getSession() !== null;
};
