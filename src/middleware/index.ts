import { createMiddleware } from "@solidjs/start/middleware";

// Legacy URL handling for the 1.x site lives at the edge (and on the v1
// deployment), not in this app.
export default createMiddleware({
	onRequest: [],
});
