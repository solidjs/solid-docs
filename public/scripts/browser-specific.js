// add class to `html` for browser specific styles, such scrollbars
if (navigator.userAgent.includes("Firefox"))
	document.documentElement.classList.add("firefox");
// add class to `html` for platform specific styles, such scrollbars
if (navigator.userAgent.includes("Windows"))
	document.documentElement.classList.add("windows");
