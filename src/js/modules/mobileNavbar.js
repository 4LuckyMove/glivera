export const openSidebar = () => {
	document.querySelector('.sidebar').classList.add('sidebar_show')
	document.querySelector('.content').classList.add('content_show')
	document.body.classList.add('hide')
}

export const closeSidebar = () => {
	document.querySelector('.sidebar').classList.remove('sidebar_show')
	document.querySelector('.content').classList.remove('content_show')
	document.body.classList.remove('hide')
}
