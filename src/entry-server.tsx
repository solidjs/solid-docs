import {
  createHandler,
  renderAsync,
  StartServer,
  Middleware,
} from "solid-start/entry-server";

const noRobotsMiddleware: Middleware =
  ({ forward }) =>
  (ctx) => {
    ctx.responseHeaders.set("X-Robots-Tag", "noindex; nofollow");
    return forward(ctx);
  };

export default createHandler(
  noRobotsMiddleware,
  renderAsync((context) => <StartServer context={context} />)
);
