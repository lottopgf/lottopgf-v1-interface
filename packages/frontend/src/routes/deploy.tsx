import { Deploy } from '@/pages/Deploy'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/deploy')({
    component: RouteComponent,
})

function RouteComponent() {
    return <Deploy />
}
