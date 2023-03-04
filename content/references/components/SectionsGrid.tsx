import {
  REFERENCE_SECTIONS,
  SECTION_PAGE,
} from "~/NAV_SECTIONS";
import MainSectionsGrid from "~/components/sectionsgrid/";

const conceptsSubsections = REFERENCE_SECTIONS["concepts"].pages;
const apiSubsections = REFERENCE_SECTIONS["api"].pages;

const SectionsGrid = () => {
  return (
    <MainSectionsGrid
      subSections={[
        ...conceptsSubsections.map((value: SECTION_PAGE) => ({
          name: value.name,
          link: value.pages[0].link,
        })),
        ...apiSubsections.map((value: SECTION_PAGE) => ({
          name: value.name,
          link: value.pages[0].link,
        })),
      ]}
    />
  );
};

export default SectionsGrid;
