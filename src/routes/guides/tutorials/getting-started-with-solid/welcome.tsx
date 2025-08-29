import { onMount } from "solid-js";

/**
 * Server redirect. Immediate HTTP redirect for requests handled on the server.
 * 301 for permanent. 301s may be cached by browsers/CDNs.
 */
export function GET() {
  return new Response(null, {
    status: 302,
    headers: { Location: "/quick-start" },
  });
}
/**
 * Client fallback: for environments where GET isn't invoked the client will
 * execute this and replace the location. Keeps UX smooth when navigating client-side.
 */
export default function WelcomeRedirect() {
  onMount(() => {
    // use replace so the redirect doesn't add an extra history entry
    try {
      window.location.replace("https://docs.solidjs.com/quick-start");
    } catch (e) {
      // fallback: set href
      window.location.href = "https://docs.solidjs.com/quick-start";
    }
  });

  return (
    <main style={{ "font-family": "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif", padding: "2rem" }}>
      <h1>Redirecting…</h1>
      <p>
        You are being redirected to the Quick Start page. If the redirect does not happen automatically,{" "}
        <a href="https://docs.solidjs.com/quick-start">click here to continue</a>.
      </p>
    </main>
  );
}
