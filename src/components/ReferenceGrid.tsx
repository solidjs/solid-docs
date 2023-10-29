import { REFERENCE_SECTIONS, SECTION_PAGE } from "~/NAV_SECTIONS"
import MainSectionsGrid from "./ComponentGrid"

// const conceptsSubsections = REFERENCE_SECTIONS["concepts"].pages
const apiSubsections = REFERENCE_SECTIONS["api"].pages

const SectionsGrid = () => {
	return (
		<>
			{/* <span class="font-semibold text-lg ">Concepts</span>
			<MainSectionsGrid
				subSections={[
					...conceptsSubsections.map((value: SECTION_PAGE) => ({
						name: value.name,
						link: value.pages[0].link,
					})),
				]}
			/>
			<br /> */}
			<span class="font-semibold text-lg">API References</span>
			<MainSectionsGrid
				subSections={[
					...apiSubsections.map((value: SECTION_PAGE) => ({
						name: value.name,
						link: value.pages[0].link,
					})),
				]}
			/>
		</>
	)
}

export default SectionsGrid