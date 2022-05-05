export function Main(props) {
  return (
    <div class="flex flex-1 w-full h-full self-stretch">
      <div class="w-full min-w-0">
        <main class="flex flex-1 self-stretch flex-col items-end justify-around">
          <article class="h-full mx-auto relative w-full min-w-0">
            <div class="lg:pt-0 pt-20 pl-0 lg:pl-80 2xl:px-80 ">
              <div class="px-5 sm:px-12 pt-5">
                <div class="max-w-4xl ml-0 2xl:mx-auto">{props.children}</div>
              </div>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}
import { Title as MetaTitle } from "solid-meta";

export function Title(props) {
  return (
    <h1 class="heading mt-0 text-primary dark:text-primary-dark -mx-.5 break-words text-5xl font-bold leading-tight">
      {props.children}
      <MetaTitle>{props.children}</MetaTitle>
      <a
        href="#undefined"
        aria-label="Link for this heading"
        title="Link for this heading"
        class="jsx-1906412371 anchor hidden"
      >
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 13 13"
          xmlns="http://www.w3.org/2000/svg"
          class="jsx-1906412371 text-gray-70 ml-2 h-5 w-5"
        >
          <g fill="currentColor" fill-rule="evenodd" class="jsx-1906412371">
            <path
              d="M7.778 7.975a2.5 2.5 0 0 0 .347-3.837L6.017 2.03a2.498 2.498 0 0 0-3.542-.007 2.5 2.5 0 0 0 .006 3.543l1.153 1.15c.07-.29.154-.563.25-.773.036-.077.084-.16.14-.25L3.18 4.85a1.496 1.496 0 0 1 .002-2.12 1.496 1.496 0 0 1 2.12 0l2.124 2.123a1.496 1.496 0 0 1-.333 2.37c.16.246.42.504.685.752z"
              class="jsx-1906412371"
            ></path>
            <path
              d="M5.657 4.557a2.5 2.5 0 0 0-.347 3.837l2.108 2.108a2.498 2.498 0 0 0 3.542.007 2.5 2.5 0 0 0-.006-3.543L9.802 5.815c-.07.29-.154.565-.25.774-.036.076-.084.16-.14.25l.842.84c.585.587.59 1.532 0 2.122-.587.585-1.532.59-2.12 0L6.008 7.68a1.496 1.496 0 0 1 .332-2.372c-.16-.245-.42-.503-.685-.75z"
              class="jsx-1906412371"
            ></path>
          </g>
        </svg>
      </a>
    </h1>
  );
}

export function DocsSectionLink() {
  return (
    <div class="flex mb-3 mt-0.5 items-center">
      <a
        class="text-link dark:text-link-dark text-sm tracking-wide font-bold uppercase mr-1 hover:underline"
        href="/apis"
      >
        API Reference
      </a>
      <span class="inline-block mr-1 text-link dark:text-link-dark text-lg">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.86612 13.6161C6.37796 14.1043 6.37796 14.8957 6.86612 15.3839C7.35427 15.872 8.14572 15.872 8.63388 15.3839L13.1339 10.8839C13.622 10.3957 13.622 9.60428 13.1339 9.11612L8.63388 4.61612C8.14572 4.12797 7.35427 4.12797 6.86612 4.61612C6.37796 5.10428 6.37796 5.89573 6.86612 6.38388L10.4822 10L6.86612 13.6161Z"
            fill="currentColor"
          ></path>
        </svg>
      </span>
    </div>
  );
}
