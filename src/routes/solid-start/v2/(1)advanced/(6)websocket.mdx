---
title: WebSocket endpoint
use_cases: >-
  real-time updates, chat applications, live notifications, multiplayer games,
  collaborative editing, streaming data
tags:
  - websocket
  - real-time
  - streaming
  - server
  - events
version: "2.0"
description: >-
  Add a Nitro v3 WebSocket endpoint to a SolidStart application.
---

SolidStart v2 uses Nitro v3's cross-platform WebSocket support. Enable the feature in Nitro's Vite configuration and define the endpoint as a Nitro server route.

## Enable WebSockets

```tsx title="vite.config.ts"
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { solidStart } from "@solidjs/start/config";

export default defineConfig({
	plugins: [solidStart(), nitro()],
	nitro: {
		serverDir: "./server",
		features: {
			websocket: true,
		},
	},
});
```

## Create an endpoint

Files in `server/routes` use Nitro's file-based server routing. This example handles connections at `/ws`.

```ts title="server/routes/ws.ts"
import { defineWebSocketHandler } from "nitro";

export default defineWebSocketHandler({
	open(peer) {
		console.log("open", peer.id);
		peer.send("Connected");
	},
	message(peer, message) {
		console.log("message", peer.id, message.text());
		peer.send(message.text());
	},
	close(peer, details) {
		console.log("close", peer.id, details.code, details.reason);
	},
	error(peer, error) {
		console.error("websocket error", peer.id, error);
	},
});
```

Connect with the browser WebSocket API:

```ts
const protocol = location.protocol === "https:" ? "wss:" : "ws:";
const socket = new WebSocket(`${protocol}//${location.host}/ws`);

socket.addEventListener("open", () => socket.send("Hello"));
socket.addEventListener("message", (event) => console.log(event.data));
```

Nitro also supports upgrade hooks, peer context, topics, namespaces, and pub/sub. See the [Nitro WebSocket guide](https://nitro.build/docs/websocket).
