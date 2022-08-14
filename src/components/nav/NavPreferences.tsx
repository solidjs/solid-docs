import { Preferences } from "../Preferences";
import IconGear from "~icons/heroicons-solid/cog";
import IconChevron from "~icons/heroicons-outline/chevron-right";

export function NavPreferences() {
  return (
    <details class="border border-solid-darkitem rounded-lg">
      <summary class="flex items-center justify-between p-4 w-full">
        <div class="flex items-center gap-2 font-semibold">
          <div class="bg-solid-darkitem rounded-lg p-1">
            <IconGear class="w-4 h-4" />
          </div>
          Preferences
        </div>
        <IconChevron class="w-6 h-6 text-solid-lightaction dark:text-solid-darkaction" />
      </summary>
      <div class="p-4">
        <Preferences questionClass="font-bold" />
      </div>
    </details>
  );
}
