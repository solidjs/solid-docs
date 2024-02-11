import { ParentProps, createSignal } from "solid-js";
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

const EraserLink = ({
	linkData,
	children,
}: ParentProps<{
	linkData: EraserLinkData;
}>) => {
	const workspaceUrl = `https://app.eraser.io/workspace/${linkData.workspaceId}`;
	const elementParams = linkData.elementsId
		? `elements=${linkData.elementsId}`
		: "";

	const linkUrl = elementParams
		? `${workspaceUrl}?${elementParams}&${ERASER_TRACKING_PARAMS}`
		: `${workspaceUrl}?${ERASER_TRACKING_PARAMS}`;

	const [isLoaded, setIsLoaded] = createSignal(false);

	// if there are no children or this was a right click-copy as markdown embed.
	if (
		children === undefined ||
		(Array.isArray(children) && children[0] === "View on Eraser")
	) {
		const imageUrl = elementParams
			? `${workspaceUrl}/preview?${elementParams}&type=embed`
			: `${workspaceUrl}/preview`;

		return (
			<a
				href={linkUrl}
				class="relative inline-block"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img src={imageUrl} alt={""} onLoad={() => setIsLoaded(true)} />
				{isLoaded() ? (
					<div class="eraserLinkContainer">
						<img
							src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&token=968381c8-a7e7-472a-8ed6-4a6626da5501"
							class="max-w-none m-0"
							alt="Open in Eraser"
						/>
					</div>
				) : null}
			</a>
		);
	}
	return (
		<a
			href={linkUrl}
			class="dark:text-solid-darklink break-normal text-solid-lightlink duration-100 ease-in font-semibold leading-normal transition hover:underline"
			rel="noopener noreferrer"
		>
			{children}
		</a>
	);
};

export default function EraserOrAnchor(props: ParentProps<{ href: string }>) {
	const eraserLinkData = getEraserLinkData(props.href);
	if (eraserLinkData) {
		return <EraserLink linkData={eraserLinkData}>{props.children}</EraserLink>;
	}
	return (
		<a
			{...props}
			class="dark:text-solid-darklink break-normal text-solid-lightlink duration-100 ease-in font-semibold leading-normal transition hover:underline"
			rel="noopener noreferrer"
		>
			{props.children}
		</a>
	);
}
