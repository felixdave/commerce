console.log('hello');

document.querySelector('h1').onclick = () => {
	location.href = '/';
};

const date = new Date();
const offset = date.getTimezoneOffset();
console.log(offset / 60);

document.querySelector('.collapse').onclick = slideNav;

let closed = false;

function slideNav() {
	let navSide = document.querySelector('#sidenav');
	let navSideEls = document.querySelectorAll('#sidenav > *');

	if (closed == false) {
		navSideEls.forEach((element) => {
			if (element != navSideEls[0]) {
				element.style.transition = '0.2s';
				element.style.opacity = '0';
			} else {
				element.style.color = '#ffa41d';
				element.style.transition = '0.5s';
				element.style.transform = 'rotate(180deg)';
				element.style.left = '8px';
				element.style.top = '-6px';
			}
		});
		// Whole nav
		setTimeout(() => {
			navSide.style.transition = '0.2s';
			navSide.style.width = '0';
			navSide.style.padding = '16px 0px';
		}, 200);
		closed = true;
	} else {
		navSide.removeAttribute('style');

		navSideEls.forEach((element) => {
			if (element != navSideEls[0]) {
				element.removeAttribute('style');
			} else {
				element.style.color = '#ffa41d';
				element.style.transition = '0.5s';
				element.style.transform = 'rotate(0deg)';
				element.style.left = 'inherit';
				element.style.top = 'inherit';
			}
		});
		closed = false;
	}
}
