import { Outlet, createRootRouteWithContext, HeadContent } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "leaflet/dist/leaflet.css"
import { Toaster } from "@/components/ui/sonner";
import { SocketGameHandler } from "@/components/SocketGameHandler";

export interface RouterAppContext {}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Spot the Spot",
      },
    ],
  }),

  component: RootDocument,
});

function RootDocument() {
  return (
    <>
      <HeadContent />
      <div className="grid h-svh grid-rows-[auto_1fr]">
        <Outlet />
      </div>
      <SocketGameHandler />
      <Toaster richColors />
      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
}
