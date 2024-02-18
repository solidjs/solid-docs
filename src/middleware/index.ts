import { createMiddleware } from "@solidjs/start/middleware";
import { handleLegacyRoutes } from "./legacy-redirects/middleware";

export default createMiddleware({
	onRequest: [handleLegacyRoutes],
});
