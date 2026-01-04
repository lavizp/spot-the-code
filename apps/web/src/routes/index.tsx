import WorldMap from "@/components/world-map";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <WorldMap/>
   
  );
}
