import IconEdit from "~icons/heroicons-outline/pencil-alt"
import { useLocation } from "@solidjs/router"
import IconDiscord from "~icons/ic/baseline-discord"

const Footer = () => {
	const location = useLocation()

	const pathname = () =>
		location.pathname === "/" ? "/index" : location.pathname

	console.log(location)

	const url = () =>
		`https://github.com/solidjs/solid-docs-next/edit/content-rewrite/content${pathname()}.mdx`

	return (
		<footer class="flex flex-col sm:flex-row justify-between pb-8 border-t-1 mt-8 border-solid-lightitem dark:border-solid-darkitem pt-10">
			<a
				class="flex items-center gap-2 hover:underline"
				href="https://discord.com/invite/solidjs"
			>
				<IconDiscord /> Need help? Don't hesitate to ask us on Discord!
			</a>

			<a class="flex items-center gap-2 hover:underline" target="_blank" href={url()}>
				<IconEdit/> Edit this page
			</a>
		</footer>
	)
}

export default Footer