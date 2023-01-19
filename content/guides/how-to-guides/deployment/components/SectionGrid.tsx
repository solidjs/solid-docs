import { GUIDES_SECTIONS } from "~/NAV_SECTIONS";
import SectionsGrid from '~/components/sectionsgrid/'

const subSections = GUIDES_SECTIONS['how-to-guides'].pages.filter(v => v.name === "Deployment")[0]['pages'].filter(v => v.name !== "Introduction")

const Grid = () => {
  return (
    <SectionsGrid subSections={subSections}/>
  );
}

export default Grid;