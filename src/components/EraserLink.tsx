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
		return <Link href={linkUrl}>{children}</Link>
	}

	const imageUrl = elementParams
		? `${workspaceUrl}/preview?${elementParams}&type=embed`
		: `${workspaceUrl}/preview`

	return (
		<div class="relative">
			<Link href={linkUrl}>
				<img src={imageUrl} alt={""} />
			</Link>
			<div class="absolute top-1 right-2">Eraser</div>
		</div>
	)
}

export default EraserLink
