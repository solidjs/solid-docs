import { Link } from "@solidjs/router"
import { ParentProps, createSignal } from "solid-js"
import "./eraserlink.css"

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

	const [isLoaded, setIsLoaded] = createSignal(false)

	// if there are no children or this was a right click-copy as markdown embed.
	if (
		children === undefined ||
		(Array.isArray(children) && children[0] === "View on Eraser")
	) {
		const imageUrl = elementParams
			? `${workspaceUrl}/preview?${elementParams}&type=embed`
			: `${workspaceUrl}/preview`

		return (
			<Link href={linkUrl} class="relative inline-block">
				<img src={imageUrl} alt={""} onLoad={() => setIsLoaded(true)} />
				{isLoaded() ? (
					<span class="eraserLinkContainer">
						<img
							src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&token=968381c8-a7e7-472a-8ed6-4a6626da5501"
							class="max-w-none"
							alt="Open in Eraser"
						/>
					</span>
				) : null}
			</Link>
		)
	}
	return (
		<Link
			href={linkUrl}
			class="dark:text-solid-darklink break-normal text-solid-lightlink duration-100 ease-in transition font-semibold leading-normal transition hover:underline"
		>
			{children}
		</Link>
	)
}

export default EraserLink
