import { Navbar } from '@/components/Navbar'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
    component: () => (
        <>
            <Navbar />
            <div className="flex flex-col space-y-8 w-full max-w-2xl mx-auto">
                <div className="w-full">
                    <Outlet />
                </div>
            </div>
            <TanStackRouterDevtools />
        </>
    ),
})
