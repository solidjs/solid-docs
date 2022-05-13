import IconDiscord from "~icons/ic/baseline-discord";

export const HelpButton = () => {
  return (
    <footer class="flex justify-center pb-8 border-t-1 border-dotted pt-10">
      <a
        class="flex gap-2 hover:underline"
        href="https://discord.com/invite/solidjs"
      >
        <IconDiscord /> Need help? Don't hesitate to ask us on Discord!
      </a>
    </footer>
  );
};
