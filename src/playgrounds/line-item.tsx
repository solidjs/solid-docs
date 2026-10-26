import { createSignal } from "solid-js";
import { render } from "@solidjs/web";

export function LineItem() {
	const [quantity, setQuantity] = createSignal(1);
	const price = 12;

	return (
		<div>
			<button type="button" onClick={() => setQuantity(quantity() - 1)}>
				−
			</button>
			<span>{quantity()}</span>
			<button type="button" onClick={() => setQuantity(quantity() + 1)}>
				+
			</button>
			<p>Subtotal: ${quantity() * price}</p>
		</div>
	);
}

render(() => <LineItem />, document.getElementById("app")!);
