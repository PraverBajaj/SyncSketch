// app/canvas/[roomId]/page.tsx

import ClientCanvasPage from "../../canvaslogic/clientcanvaspage";

type Params = { roomId: string };

// Tell Next.js this route is dynamic at runtime
export const dynamic = "force-dynamic";

export default async function CanvasPage({ params }: { params: Promise<Params> }) {
  const { roomId } = await params;

  return <ClientCanvasPage roomId={roomId} />;
}
