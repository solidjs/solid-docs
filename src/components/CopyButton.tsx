import { BiSolidCopy } from "solid-icons/bi";
import { createSignal, Show } from "solid-js";

interface Props {
  parentRef: HTMLPreElement;
}

function CopyButton(props: Props) {
  const [getCopied, setCopied] = createSignal(false);

  function copyToClipboard() {
    navigator.clipboard.writeText(props.parentRef.innerText);
    setCopied(true);
    setInterval(() => setCopied(false), 2000);
  }

  return (
    <button onclick={copyToClipboard} class="absolute top-4 right-4 opacity-70">
      <Show when={getCopied()} fallback={<BiSolidCopy size={24} />}>
        Copied!
      </Show>
    </button>
  );
}

export default CopyButton;
