import { useMatch } from "@solidjs/router";
import { Match, Switch } from "solid-js";

const SolidLogo = (props: { class?: string }) => (
	<svg
		{...props}
		width="100%"
		height="100%"
		xmlns="http://www.w3.org/2000/svg"
		class="text-link dark:text-link-dark -mt-1 h-9 w-9"
		viewBox="0 0 166 155.3"
	>
		<defs>
			<linearGradient
				id="a"
				gradientUnits="userSpaceOnUse"
				x1="27.5"
				y1="3"
				x2="152"
				y2="63.5"
			>
				<stop offset=".1" stop-color="#76b3e1" />
				<stop offset=".3" stop-color="#dcf2fd" />
				<stop offset="1" stop-color="#76b3e1" />
			</linearGradient>
			<linearGradient
				id="b"
				gradientUnits="userSpaceOnUse"
				x1="95.8"
				y1="32.6"
				x2="74"
				y2="105.2"
			>
				<stop offset="0" stop-color="#76b3e1" />
				<stop offset=".5" stop-color="#4377bb" />
				<stop offset="1" stop-color="#1f3b77" />
			</linearGradient>
			<linearGradient
				id="c"
				gradientUnits="userSpaceOnUse"
				x1="18.4"
				y1="64.2"
				x2="144.3"
				y2="149.8"
			>
				<stop offset="0" stop-color="#315aa9" />
				<stop offset=".5" stop-color="#518ac8" />
				<stop offset="1" stop-color="#315aa9" />
			</linearGradient>
			<linearGradient
				id="d"
				gradientUnits="userSpaceOnUse"
				x1="75.2"
				y1="74.5"
				x2="24.4"
				y2="260.8"
			>
				<stop offset="0" stop-color="#4377bb" />
				<stop offset=".5" stop-color="#1a336b" />
				<stop offset="1" stop-color="#1a336b" />
			</linearGradient>
		</defs>
		<path
			d="M163 35S110-4 69 5l-3 1c-6 2-11 5-14 9l-2 3-15 26 26 5c11 7 25 10 38 7l46 9 18-30z"
			fill="#76b3e1"
		/>
		<path
			d="M163 35S110-4 69 5l-3 1c-6 2-11 5-14 9l-2 3-15 26 26 5c11 7 25 10 38 7l46 9 18-30z"
			opacity=".3"
			fill="url(#a)"
		/>
		<path
			d="m52 35-4 1c-17 5-22 21-13 35 10 13 31 20 48 15l62-21S92 26 52 35z"
			fill="#518ac8"
		/>
		<path
			d="m52 35-4 1c-17 5-22 21-13 35 10 13 31 20 48 15l62-21S92 26 52 35z"
			opacity=".3"
			fill="url(#b)"
		/>
		<path
			d="M134 80a45 45 0 0 0-48-15L24 85 4 120l112 19 20-36c4-7 3-15-2-23z"
			fill="url(#c)"
		/>
		<path
			d="M114 115a45 45 0 0 0-48-15L4 120s53 40 94 30l3-1c17-5 23-21 13-34z"
			fill="url(#d)"
		/>
	</svg>
);

const SolidStartLogo = () => (
	<svg
		width="531"
		height="454"
		viewBox="0 0 531 454"
		class="text-link dark:text-link-dark -mt-1 h-9 w-9"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g clip-path="url(#clip0_0_3)">
			<mask
				id="mask0_0_3"
				style={{ "mask-type": "luminance" }}
				maskUnits="userSpaceOnUse"
				x="246"
				y="369"
				width="117"
				height="49"
			>
				<path
					d="M246.285 417.848L321.742 411.963C321.742 411.963 347.548 407.759 362.696 382.817L309.399 369.926L246.285 417.848Z"
					fill="white"
				/>
			</mask>
			<g mask="url(#mask0_0_3)">
				<path
					d="M371.952 371.888L358.208 440.548L236.748 415.886L250.773 347.226L371.952 371.888Z"
					fill="url(#paint0_linear_0_3)"
				/>
			</g>
			<mask
				id="mask1_0_3"
				style={{ "mask-type": "luminance" }}
				maskUnits="userSpaceOnUse"
				x="77"
				y="241"
				width="286"
				height="147"
			>
				<path
					d="M141.937 241.012C119.496 242.133 77.981 246.057 77.981 246.057L258.908 377.493L300.143 387.862L362.696 383.098L180.647 251.381C180.647 251.381 166.06 241.012 145.022 241.012C143.9 241.012 143.059 241.012 141.937 241.012Z"
					fill="white"
				/>
			</mask>
			<g mask="url(#mask1_0_3)">
				<path
					d="M157.645 515.654L11.7812 282.209L282.751 113.22L428.895 346.665L157.645 515.654Z"
					fill="url(#paint1_linear_0_3)"
				/>
			</g>
			<mask
				id="mask2_0_3"
				style={{ "mask-type": "luminance" }}
				maskUnits="userSpaceOnUse"
				x="375"
				y="167"
				width="120"
				height="48"
			>
				<path
					d="M375.319 214.949L453.019 210.185C453.019 210.185 479.667 206.262 494.815 181.6L439.555 167.868L375.319 214.949Z"
					fill="white"
				/>
			</mask>
			<g mask="url(#mask2_0_3)">
				<path
					d="M403.65 265.674L355.122 178.798L466.483 116.863L515.011 203.74L403.65 265.674Z"
					fill="url(#paint2_linear_0_3)"
				/>
			</g>
			<mask
				id="mask3_0_3"
				style={{ "mask-type": "luminance" }}
				maskUnits="userSpaceOnUse"
				x="199"
				y="35"
				width="297"
				height="151"
			>
				<path
					d="M265.36 35.5914C242.078 36.4321 199.441 39.7951 199.441 39.7951L387.941 174.314L430.578 185.243L495.095 181.32L305.472 46.521C305.472 46.521 289.764 35.5914 267.604 35.5914C267.043 35.5914 266.201 35.5914 265.36 35.5914Z"
					fill="white"
				/>
			</mask>
			<g mask="url(#mask3_0_3)">
				<path
					d="M447.689 -72.584L550.074 161.422L246.846 293.699L144.461 59.6926L447.689 -72.584Z"
					fill="url(#paint3_linear_0_3)"
				/>
			</g>
			<mask
				id="mask4_0_3"
				style={{ "mask-type": "luminance" }}
				maskUnits="userSpaceOnUse"
				x="32"
				y="245"
				width="267"
				height="173"
			>
				<path
					d="M33.0998 275.202C32.8193 275.483 32.8193 275.763 32.8193 276.043L82.4691 311.915L131.558 347.506L214.027 407.199C241.797 427.096 279.385 418.689 298.46 387.862L248.249 351.71L198.038 315.558L116.41 256.146C106.312 248.859 95.0919 245.496 83.8716 245.496C64.2361 245.496 44.8811 255.865 33.0998 275.202Z"
					fill="white"
				/>
			</mask>
			<g mask="url(#mask4_0_3)">
				<path
					d="M384.856 307.711L207.295 553.207L-53.5768 364.881L123.704 119.385L384.856 307.711Z"
					fill="url(#paint4_linear_0_3)"
				/>
			</g>
			<mask
				id="mask5_0_3"
				style={{ "mask-type": "luminance" }}
				maskUnits="userSpaceOnUse"
				x="154"
				y="39"
				width="277"
				height="177"
			>
				<path
					d="M155.401 68.6605C155.401 68.9407 155.12 69.221 154.84 69.5012L206.453 106.214L258.067 142.646L343.902 203.74C372.794 224.198 411.504 216.07 430.578 185.523L378.404 148.251L326.23 111.258L240.956 50.4444C230.296 42.8778 218.235 39.2346 206.453 39.2346C186.537 39.5148 167.182 49.6037 155.401 68.6605Z"
					fill="white"
				/>
			</mask>
			<g mask="url(#mask5_0_3)">
				<path
					d="M489.765 60.8136L398.601 312.475L95.653 202.619L187.098 -49.0432L489.765 60.8136Z"
					fill="url(#paint5_linear_0_3)"
				/>
			</g>
			<mask
				id="mask6_0_3"
				style={{ "mask-type": "luminance" }}
				maskUnits="userSpaceOnUse"
				x="118"
				y="106"
				width="283"
				height="231"
			>
				<path
					d="M118.935 110.137L185.415 183.001C188.501 187.205 191.867 191.128 195.794 194.491L325.388 336.857L389.905 332.933C408.979 302.386 401.125 260.91 372.233 240.452L286.398 179.358L235.065 142.926L183.452 106.214L118.935 110.137Z"
					fill="white"
				/>
			</mask>
			<g mask="url(#mask6_0_3)">
				<path
					d="M224.967 476.7L7.57373 190.568L303.228 -33.3494L520.341 252.783L224.967 476.7Z"
					fill="url(#paint6_linear_0_3)"
				/>
			</g>
			<mask
				id="mask7_0_3"
				style={{ "mask-type": "luminance" }}
				maskUnits="userSpaceOnUse"
				x="108"
				y="110"
				width="228"
				height="227"
			>
				<path
					d="M118.374 110.978C99.58 141.244 107.434 182.16 135.765 202.338L220.759 262.872L273.214 299.864L325.388 336.857C344.463 306.31 336.608 264.833 307.716 244.375L222.162 183.562L170.548 146.849L118.935 110.137C118.935 110.417 118.654 110.698 118.374 110.978Z"
					fill="white"
				/>
			</mask>
			<g mask="url(#mask7_0_3)">
				<path
					d="M436.189 156.658L294.532 435.784L8.1347 290.896L149.791 11.4901L436.189 156.658Z"
					fill="url(#paint7_linear_0_3)"
				/>
			</g>
		</g>
		<defs>
			<linearGradient
				id="paint0_linear_0_3"
				x1="379.737"
				y1="23.1837"
				x2="280.4"
				y2="513.227"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#1593F5" />
				<stop offset="1" stop-color="#0084CE" />
			</linearGradient>
			<linearGradient
				id="paint1_linear_0_3"
				x1="370.003"
				y1="553.992"
				x2="-46.4523"
				y2="-113.902"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#1593F5" />
				<stop offset="1" stop-color="#0084CE" />
			</linearGradient>
			<linearGradient
				id="paint2_linear_0_3"
				x1="643.99"
				y1="565.235"
				x2="393.19"
				y2="115.271"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="white" />
				<stop offset="1" stop-color="#15ABFF" />
			</linearGradient>
			<linearGradient
				id="paint3_linear_0_3"
				x1="199.455"
				y1="-227.399"
				x2="412.368"
				y2="260.387"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="white" />
				<stop offset="1" stop-color="#79CFFF" />
			</linearGradient>
			<linearGradient
				id="paint4_linear_0_3"
				x1="438.927"
				y1="-41.8214"
				x2="100.518"
				y2="427.18"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#0057E5" />
				<stop offset="1" stop-color="#0084CE" />
			</linearGradient>
			<linearGradient
				id="paint5_linear_0_3"
				x1="362.245"
				y1="-59.5451"
				x2="255.798"
				y2="234.049"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="white" />
				<stop offset="1" stop-color="#15ABFF" />
			</linearGradient>
			<linearGradient
				id="paint6_linear_0_3"
				x1="495.1"
				y1="526.08"
				x2="-39.7504"
				y2="-179.82"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="white" />
				<stop offset="1" stop-color="#79CFFF" />
			</linearGradient>
			<linearGradient
				id="paint7_linear_0_3"
				x1="401.836"
				y1="-130.821"
				x2="127.393"
				y2="411.47"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="white" />
				<stop offset="1" stop-color="#79CFFF" />
			</linearGradient>
			<clipPath id="clip0_0_3">
				<rect width="531" height="454" fill="white" />
			</clipPath>
		</defs>
	</svg>
);
export function Logo(props: { class?: string }) {
	const isStart = useMatch(() => "/solid-start/*");
	const isRouter = useMatch(() => "/solid-router/*");
	const isMeta = useMatch(() => "/solid-meta/*");

	return (
		<div class="text-primary dark:text-primary-dark inline-flex w-full items-center space-x-1 py-2">
			<Switch
				fallback={
					<>
						<SolidLogo class={props.class} />
						<span class="inactive hidden text-2xl font-normal leading-none md:block dark:text-white">
							<b>Solid</b>
						</span>
					</>
				}
			>
				<Match when={isStart()?.path}>
					<>
						<SolidStartLogo />
						<span class="inactive hidden text-2xl font-normal leading-none md:block dark:text-white">
							<b>Solid</b>Start
						</span>
					</>
				</Match>
				<Match when={isRouter()?.path}>
					<>
						<SolidLogo />
						<span class="inactive hidden text-2xl font-normal leading-none md:block dark:text-white">
							Solid <b>Router</b>
						</span>
					</>
				</Match>
				<Match when={isMeta()?.path}>
					<>
						<SolidLogo />
						<span class="inactive hidden text-2xl font-normal leading-none md:block dark:text-white">
							Solid-<b>Meta</b>
						</span>
					</>
				</Match>
			</Switch>
		</div>
	);
}

export function GitHubIcon(props: { class?: string }) {
	return (
		<svg aria-hidden="true" viewBox="0 0 16 16" class={props.class}>
			<path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" />
		</svg>
	);
}

export function DiscordIcon(props: { class?: string }) {
	return (
		<svg
			aria-hidden="true"
			class={props.class}
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="currentColor"
			viewBox="0 0 16 16"
		>
			<path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
		</svg>
	);
}
