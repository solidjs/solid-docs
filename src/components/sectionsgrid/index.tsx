import { Link } from "@solidjs/router";
import { For } from "solid-js";
import GridCard from "./GridCard";

const SectionsGrid = (props: { subSections: [] }) => {
  return (
    <div class="grid grid-cols-2 gap-2 md:grid-cols-3">
      <For each={props.subSections}>
        {(item) => (
          <Link href={item["link"]}>
            <GridCard label={item["name"]} />
          </Link>
        )}
      </For>
    </div>
  );
};

export default SectionsGrid;
