// app/canvas/[roomId]/page.tsx (server component)
import ClientCanvasPage from "../../canvaslogic/clientcanvaspage";

type Params = { roomId: string };

export default async function CanvasPage({ params }: { params: Params }) {
 
  const { roomId } = await params;


  return <ClientCanvasPage roomId={roomId} />;
}
