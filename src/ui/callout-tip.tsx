import { Alert } from "@kobalte/core"
import { type JSXElement } from "solid-js"

type Props = {
	children: JSXElement
}

export function CalloutTip(props: Props) {
	return <Alert.Root>{props.children}</Alert.Root>
}
