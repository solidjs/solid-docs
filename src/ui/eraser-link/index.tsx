import { ParentProps, Show, createSignal } from "solid-js";
import "./eraser-link.css";

const ERASER_TRACKING_PARAMS = "";

type EraserLinkData = {
	workspaceId: string;
	elementsId?: string;
};

const getEraserLinkData = (href: string): EraserLinkData | null => {
	const matches = /app.eraser.io\/workspace\/(\w+)(.*elements=(\w+))?/.exec(
		href
	);

	if (!matches) {
		return null;
	}

	if (matches[3]) {
		return {
			workspaceId: matches[1],
			elementsId: matches[3],
		};
	}
	return {
		workspaceId: matches[1],
	};
};

const EraserLink = (
	props: ParentProps<{
		linkData: EraserLinkData;
	}>
) => {
	const workspaceUrl = `https://app.eraser.io/workspace/${props.linkData.workspaceId}`;
	const elementParams = props.linkData.elementsId
		? `elements=${props.linkData.elementsId}`
		: "";

	const linkUrl = elementParams
		? `${workspaceUrl}?${elementParams}&${ERASER_TRACKING_PARAMS}`
		: `${workspaceUrl}?${ERASER_TRACKING_PARAMS}`;

	const [isLoaded, setIsLoaded] = createSignal(false);

	// if there are no children or this was a right click-copy as markdown embed.
	return (
		<Show
			when={
				props.children === undefined ||
				(Array.isArray(props.children) &&
					props.children[0] === "View on Eraser")
			}
			fallback={
				<a
					href={linkUrl}
					class="dark:text-solid-darklink text-solid-lightlink break-normal font-semibold leading-normal transition duration-100 ease-in hover:underline"
					rel="noopener noreferrer"
				>
					{props.children}
				</a>
			}
		>
			<a
				href={linkUrl}
				class="relative inline-block"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img
					src={
						elementParams
							? `${workspaceUrl}/preview?${elementParams}&type=embed`
							: `${workspaceUrl}/preview`
					}
					alt={""}
					onLoad={() => setIsLoaded(true)}
				/>
				{isLoaded() ? (
					<div class="eraserLinkContainer">
						<img
							src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&token=968381c8-a7e7-472a-8ed6-4a6626da5501"
							class="m-0 max-w-none"
							alt="Open in Eraser"
						/>
					</div>
				) : null}
			</a>
		</Show>
	);
};

export default function EraserOrAnchor(props: ParentProps<{ href: string }>) {
	const eraserLinkData = getEraserLinkData(props.href);

	return (
		<Show
			when={eraserLinkData}
			fallback={
				<a
					{...props}
					class="dark:text-solid-darklink text-solid-lightlink break-normal font-semibold leading-normal transition duration-100 ease-in hover:underline"
					rel="noopener noreferrer"
				>
					{props.children}
				</a>
			}
		>
			{(eraserLinkData) => (
				<EraserLink linkData={eraserLinkData()}>{props.children}</EraserLink>
			)}
		</Show>
	);
}
