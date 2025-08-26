---
title: "Handle pending and error states"
---

The `createAsync` primitive is designed to work with Solid's native components for managing asynchronous states.
It reports its pending state to the nearest [`<Suspense>` boundary](/reference/components/suspense) to display loading fallbacks, and propagate errors to an [`<ErrorBoundary>`](/reference/components/error-boundary) for handling and displaying error messages.

```tsx
import { Suspense, ErrorBoundary, For } from "solid-js";
import { query, createAsync } from "@solidjs/router";

const getNewsQuery = query(async () => {
	// ... Fetches the latest news from an API.
}, "news");

function NewsFeed() {
	const news = createAsync(() => getNewsQuery());

	return (
		<ErrorBoundary fallback={<p>Could not fetch news.</p>}>
			<Suspense fallback={<p>Loading news...</p>}>
				<ul>
					<For each={news()}>{(item) => <li>{item.headline}</li>}</For>
				</ul>
			</Suspense>
		</ErrorBoundary>
	);
}
```
