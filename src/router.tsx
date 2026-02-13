import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { RootLayout } from './components/layout/RootLayout';
import { LandingPage } from './components/LandingPage';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { License } from './pages/License';
import { Documentation } from './pages/Documentation';
import { FullScreenDemo } from './pages/FullScreenDemo';

// 1. Create a root route
const rootRoute = createRootRoute({
  component: RootLayout,
});

// 2. Create the route tree
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const demoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/demo',
  component: FullScreenDemo,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy',
  component: PrivacyPolicy,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms',
  component: TermsOfService,
});

const licenseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/license',
  component: License,
});

const docsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/docs',
  component: Documentation,
});

// 3. Create the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  demoRoute,
  privacyRoute,
  termsRoute,
  licenseRoute,
  docsRoute,
]);

// 4. Create the router
export const router = createRouter({ routeTree });

// 5. Register the router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
