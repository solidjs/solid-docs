import { HttpStatusCode } from "solid-start/server"

export default function () {
	return (
		<div class="h-full mt-12 flex flex-col justify-center items-center text-center">
			<div class="font-bold text-xl">404</div>
			<div class="font-bold text-xl">This page doesn't quite exist yet</div>
			<HttpStatusCode code={404} />
		</div>
	)
}
