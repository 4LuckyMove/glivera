import * as myFuncs from './modules/functions.js'
import { openSidebar, closeSidebar } from './modules/mobileNavbar.js'

window.addEventListener('DOMContentLoaded', () => {
	myFuncs.isWebp();
	document.querySelector('.hamburger').addEventListener('click', openSidebar)
	document
		.querySelector('.sidebar__close-button')
		.addEventListener('click', closeSidebar)
})
