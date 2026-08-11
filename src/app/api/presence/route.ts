// Real-time presence tracking using Server-Sent Events (SSE).
// Each connected browser tab maintains an active SSE connection.
// Active clients are tracked in memory and real-time count updates are broadcasted.

const clients = new Set<ReadableStreamDefaultController>();

function broadcast() {
  const count = clients.size;
  const payload = `data: ${JSON.stringify({ count })}\n\n`;
  const encoded = new TextEncoder().encode(payload);

  for (const controller of Array.from(clients)) {
    try {
      controller.enqueue(encoded);
    } catch {
      clients.delete(controller);
    }
  }
}

// Keep-alive heartbeat every 15 seconds to prevent connection drops across proxies
setInterval(() => {
  if (clients.size === 0) return;
  const heartbeat = new TextEncoder().encode(": keep-alive\n\n");
  for (const controller of Array.from(clients)) {
    try {
      controller.enqueue(heartbeat);
    } catch {
      clients.delete(controller);
    }
  }
}, 15000);

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  let streamController: ReadableStreamDefaultController | null = null;

  const cleanup = () => {
    if (streamController && clients.has(streamController)) {
      clients.delete(streamController);
      streamController = null;
      broadcast();
    }
  };

  const stream = new ReadableStream({
    start(controller) {
      streamController = controller;
      clients.add(controller);

      // Send initial count immediately to the newly connected client
      const count = clients.size;
      controller.enqueue(
        new TextEncoder().encode(`data: ${JSON.stringify({ count })}\n\n`)
      );

      // Broadcast update to all other connected clients
      broadcast();
    },
    cancel() {
      cleanup();
    },
  });

  // Handle client abort / disconnect explicitly
  request.signal.addEventListener("abort", () => {
    cleanup();
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
