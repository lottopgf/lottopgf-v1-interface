import { DynamicFavicon } from '@/components/DynamicFavicon'
import { Footer } from '@/components/Footer'
import { JuiceboxCampaignBanner } from '@/components/JuiceboxCampaignBanner'
import { Navbar } from '@/components/Navbar'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import React, { Suspense } from 'react'

export const Route = createRootRoute({
    component: () => {
        const TanStackRouterDevtools = import.meta.env.PROD
            ? () => null // Render nothing in production
            : React.lazy(() =>
                  // Lazy load in development
                  import('@tanstack/router-devtools').then((res) => ({
                      default: res.TanStackRouterDevtools,
                  })),
              )
        return (
            <>
                <JuiceboxCampaignBanner />
                <DynamicFavicon />
                <Navbar />
                <div className="flex flex-col space-y-8 w-full max-w-2xl mx-auto">
                    <div className="w-full">
                        <Outlet />
                    </div>
                </div>
                <Footer />
                <Suspense>
                    <TanStackRouterDevtools />
                </Suspense>
            </>
        )
    },
})
