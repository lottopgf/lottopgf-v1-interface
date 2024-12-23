/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as DeployImport } from './routes/deploy'
import { Route as IndexImport } from './routes/index'
import { Route as TicketsChainIdAddressImport } from './routes/tickets.$chainId.$address'
import { Route as LotteryChainIdAddressImport } from './routes/lottery.$chainId.$address'
import { Route as AdminChainIdAddressImport } from './routes/admin.$chainId.$address'

// Create/Update Routes

const DeployRoute = DeployImport.update({
  id: '/deploy',
  path: '/deploy',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const TicketsChainIdAddressRoute = TicketsChainIdAddressImport.update({
  id: '/tickets/$chainId/$address',
  path: '/tickets/$chainId/$address',
  getParentRoute: () => rootRoute,
} as any)

const LotteryChainIdAddressRoute = LotteryChainIdAddressImport.update({
  id: '/lottery/$chainId/$address',
  path: '/lottery/$chainId/$address',
  getParentRoute: () => rootRoute,
} as any)

const AdminChainIdAddressRoute = AdminChainIdAddressImport.update({
  id: '/admin/$chainId/$address',
  path: '/admin/$chainId/$address',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/deploy': {
      id: '/deploy'
      path: '/deploy'
      fullPath: '/deploy'
      preLoaderRoute: typeof DeployImport
      parentRoute: typeof rootRoute
    }
    '/admin/$chainId/$address': {
      id: '/admin/$chainId/$address'
      path: '/admin/$chainId/$address'
      fullPath: '/admin/$chainId/$address'
      preLoaderRoute: typeof AdminChainIdAddressImport
      parentRoute: typeof rootRoute
    }
    '/lottery/$chainId/$address': {
      id: '/lottery/$chainId/$address'
      path: '/lottery/$chainId/$address'
      fullPath: '/lottery/$chainId/$address'
      preLoaderRoute: typeof LotteryChainIdAddressImport
      parentRoute: typeof rootRoute
    }
    '/tickets/$chainId/$address': {
      id: '/tickets/$chainId/$address'
      path: '/tickets/$chainId/$address'
      fullPath: '/tickets/$chainId/$address'
      preLoaderRoute: typeof TicketsChainIdAddressImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/deploy': typeof DeployRoute
  '/admin/$chainId/$address': typeof AdminChainIdAddressRoute
  '/lottery/$chainId/$address': typeof LotteryChainIdAddressRoute
  '/tickets/$chainId/$address': typeof TicketsChainIdAddressRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/deploy': typeof DeployRoute
  '/admin/$chainId/$address': typeof AdminChainIdAddressRoute
  '/lottery/$chainId/$address': typeof LotteryChainIdAddressRoute
  '/tickets/$chainId/$address': typeof TicketsChainIdAddressRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/deploy': typeof DeployRoute
  '/admin/$chainId/$address': typeof AdminChainIdAddressRoute
  '/lottery/$chainId/$address': typeof LotteryChainIdAddressRoute
  '/tickets/$chainId/$address': typeof TicketsChainIdAddressRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/deploy'
    | '/admin/$chainId/$address'
    | '/lottery/$chainId/$address'
    | '/tickets/$chainId/$address'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/deploy'
    | '/admin/$chainId/$address'
    | '/lottery/$chainId/$address'
    | '/tickets/$chainId/$address'
  id:
    | '__root__'
    | '/'
    | '/deploy'
    | '/admin/$chainId/$address'
    | '/lottery/$chainId/$address'
    | '/tickets/$chainId/$address'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  DeployRoute: typeof DeployRoute
  AdminChainIdAddressRoute: typeof AdminChainIdAddressRoute
  LotteryChainIdAddressRoute: typeof LotteryChainIdAddressRoute
  TicketsChainIdAddressRoute: typeof TicketsChainIdAddressRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  DeployRoute: DeployRoute,
  AdminChainIdAddressRoute: AdminChainIdAddressRoute,
  LotteryChainIdAddressRoute: LotteryChainIdAddressRoute,
  TicketsChainIdAddressRoute: TicketsChainIdAddressRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/deploy",
        "/admin/$chainId/$address",
        "/lottery/$chainId/$address",
        "/tickets/$chainId/$address"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/deploy": {
      "filePath": "deploy.tsx"
    },
    "/admin/$chainId/$address": {
      "filePath": "admin.$chainId.$address.tsx"
    },
    "/lottery/$chainId/$address": {
      "filePath": "lottery.$chainId.$address.tsx"
    },
    "/tickets/$chainId/$address": {
      "filePath": "tickets.$chainId.$address.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
