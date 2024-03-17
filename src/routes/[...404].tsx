import { NotFound } from "~/ui/not-found";

export default function NoEntry() {
	throw new Error("404");
}
