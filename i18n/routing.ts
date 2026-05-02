export const routing = {
  locales: ['zh-CN', 'en'],
  defaultLocale: 'zh-CN',
  localePrefix: 'always',
} as const;

export type Routing = typeof routing;
