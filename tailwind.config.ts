import { Config } from "tailwindcss"
import typography from "@tailwindcss/typography"

export default {
	content: [
		"./src/**/*.{js,jsx,ts,tsx,md,mdx}",
		"./content/**/*.{js,jsx,ts,tsx,md,mdx}",
	],
	theme: {
		extend: {},
	},
	plugins: [typography()],
} satisfies Config
