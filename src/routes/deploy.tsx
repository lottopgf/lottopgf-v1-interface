import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/deploy')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/deploy"!</div>
}
