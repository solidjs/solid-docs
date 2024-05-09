export function Logo(props: { class?: string }) {
	return (
		<div class="w-full inline-flex space-x-1 items-center text-primary dark:text-primary-dark py-2">
			<svg
				{...props}
				data-hk="0-0-0-0-0-0-0-0-0-1-0-0-0-0-0-0-0-0-1-1-1-0-1-0"
				width="100%"
				height="100%"
				xmlns="http://www.w3.org/2000/svg"
				class="w-9 h-9 -mt-1 text-link dark:text-link-dark"
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
			<span class="dark:text-white text-2xl leading-none font-normal inactive md:block hidden">
				<b>Solid</b> Docs
			</span>
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
