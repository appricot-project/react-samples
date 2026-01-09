/**
 * Public routes - доступны без авторизации
 */
export const PUBLIC_PATHS = {
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
} as const;

/**
 * Protected routes - требуют авторизации
 */
export const PROTECTED_PATHS = {
  HOME: "/",
  GENERATE: "/generate",
  SETTINGS: "/settings",
  HISTORY: "/history",
} as const;

/**
 * Все пути приложения
 */
export const PATHS = {
  ...PUBLIC_PATHS,
  ...PROTECTED_PATHS,
} as const;

/**
 * Проверка является ли путь публичным
 */
export const isPublicPath = (path: string): boolean => {
  return Object.values(PUBLIC_PATHS).includes(path as typeof PUBLIC_PATHS[keyof typeof PUBLIC_PATHS]);
};
