import { test as base, expect } from '@playwright/test';

type AppFixtures = {
  apiBaseUrl: string;
  frontendUrl: string;
};

/**
 * Extender test con variables de configuración global
 */
export const test = base.extend<AppFixtures>({
  apiBaseUrl: async ({}, use) => {
    const baseUrl = process.env.API_BASE_URL || 'http://localhost:8000';
    await use(baseUrl);
  },

  frontendUrl: async ({}, use) => {
    const url = process.env.FRONTEND_URL || 'http://localhost:3000';
    await use(url);
  },
});

export { expect };
