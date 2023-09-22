import { Link } from "@solidjs/router"
import { ParentProps } from "solid-js"

const ERASER_TRACKING_PARAMS = ""

type EraserLinkData = {
	workspaceId: string
	elementsId?: string
}

export const getEraserLinkData = (href: string): EraserLinkData | void => {
	const matches = /app.eraser.io\/workspace\/(\w+)(.*elements=(\w+))?/.exec(
		href
	)

	if (!matches) {
		return
	}

	if (matches[3]) {
		return {
			workspaceId: matches[1],
			elementsId: matches[3],
		}
	}
	return {
		workspaceId: matches[1],
	}
}

const EraserLink = ({
	linkData,
	children,
}: ParentProps<{
	linkData: EraserLinkData
}>) => {
	const workspaceUrl = `https://app.eraser.io/workspace/${linkData.workspaceId}`
	const elementParams = linkData.elementsId
		? `elements=${linkData.elementsId}`
		: ""

	const linkUrl = elementParams
		? `${workspaceUrl}?${elementParams}&${ERASER_TRACKING_PARAMS}`
		: `${workspaceUrl}?${ERASER_TRACKING_PARAMS}`

	if (children !== undefined) {
		return (
			<Link
				href={linkUrl}
				class="dark:text-solid-darklink break-normal text-solid-lightlink duration-100 ease-in transition font-semibold leading-normal transition hover:underline"
			>
				{children}
			</Link>
		)
	}

	const imageUrl = elementParams
		? `${workspaceUrl}/preview?${elementParams}&type=embed`
		: `${workspaceUrl}/preview`

	return (
		<div class="relative">
			<Link href={linkUrl}>
				<img src={imageUrl} alt={""} />
				<img
					src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&token=968381c8-a7e7-472a-8ed6-4a6626da5501
			"
					class="absolute top-4 right-4"
					alt="Open in Eraser"
				/>
			</Link>
		</div>
	)
}

export default EraserLink
