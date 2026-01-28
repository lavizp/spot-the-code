import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/match/round/$roundid/result')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/match/round/$roundid/"!</div>
}
