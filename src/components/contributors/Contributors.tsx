import { createResource, ErrorBoundary, For, Show, Suspense } from "solid-js";

type GithubUser = Record<"avatar_url" | "html_url" | "login", string>;

export const Contributors = () => {
  const [contributors] = createResource<GithubUser[]>(async () => {
    const res = await fetch(
      "https://api.github.com/repos/solidjs/solid-docs-next/contributors"
    );
    return shuffle(await res.json());
  });

  return (
    <div class="flex gap-3 mb-10">
      <ErrorBoundary fallback={<>Error loading contributors!</>}>
        <Suspense fallback={<>Loading contributors...</>}>
          <Show when={!!contributors()}>
            <For each={contributors()}>
              {(contributor) => (
                <a
                  href={contributor.html_url}
                  class="hover:opacity-70 ease-in duration-200"
                >
                  <img
                    alt={`GitHub user ${contributor.login}`}
                    src={`${contributor.avatar_url}&s=128`}
                    class="rounded-full w-15"
                  />
                </a>
              )}
            </For>
          </Show>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

function shuffle(array: any[]) {
  const copied = [...array];
  let currentIndex = copied.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [copied[currentIndex], copied[randomIndex]] = [
      copied[randomIndex],
      copied[currentIndex],
    ];
  }
  return copied;
}
