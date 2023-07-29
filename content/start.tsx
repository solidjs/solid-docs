import { onMount } from "solid-js"
import { Navigate, Outlet } from "solid-start"

export default () => {
	onMount(()=>{
		window.location.replace("https://start.solidjs.com/")
	})
	return <Outlet/>
}
