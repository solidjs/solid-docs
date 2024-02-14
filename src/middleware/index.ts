import { createMiddleware } from "@solidjs/start/middleware";
import { handleLegacyRoutes } from "./legacy-routes-redirect";

export default createMiddleware({
	onRequest: [handleLegacyRoutes],
});
