console.log('hello');

document.querySelector('h1').onclick = () => {
	location.href = '/';
};

document.querySelector('.titleBar h3').onclick = () => {
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
	let titleBar = document.querySelector('#content .titleBar');
	let titleBarEl = document.querySelectorAll('#content .titleBar > *');
	let titleBarH4 = document.querySelector(' #content .titleBar h4');
	let titleBarSmall = document.querySelector(' #content .titleBar small');

	if (closed == false) {
		// if open
		navSideEls.forEach((element) => {
			if (element != navSideEls[0]) {
				element.style.transition = '0.2s';
				element.style.opacity = '0';
			} else {
				element.style.left = '8px';
				element.style.transition = '0.5s';
				element.style.transform = 'rotate(180deg)';
			}
		});
		// Whole nav
		setTimeout(() => {
			navSide.style.transition = '0.2s';
			navSide.style.width = '0';
			navSide.style.padding = '16px 0';
			titleBar.style.padding = '0 32px';
			titleBarEl.forEach((e) => {
				e.style.display = 'block';
			});
		}, 200);
		// set to close
		closed = true;
	} else {
		// if closed
		navSide.removeAttribute('style');

		navSideEls.forEach((element) => {
			if (element != navSideEls[0]) {
				element.removeAttribute('style');
				element.style.transition = '0.2s';
			} else {
				element.style.transition = '.5s';
				element.style.transform = 'rotate(0deg)';
				element.style.left = 'inherit';
			}
		});
		titleBarEl.forEach((e) => {
			e.removeAttribute('style');
		});
		titleBarH4.style.display = 'none';
		titleBarSmall.style.display = 'none';

		closed = false;
	}
}
function autorun() {
	let navSide = document.querySelector('#sidenav');
	let navSideEls = document.querySelectorAll('#sidenav > *');
	let titleBar = document.querySelector('#content .titleBar');
	let titleBarEl = document.querySelectorAll('#content .titleBar > *');
	navSideEls.forEach((element) => {
		if (element != navSideEls[0]) {
			// element.style.transition = '0.2s';
			element.style.opacity = '0';
		} else {
			element.style.left = '8px';
			// element.style.transition = '0.5s';
			element.style.transform = 'rotate(180deg)';
		}
	});
	// Whole nav
	setTimeout(() => {
		// navSide.style.transition = '0.2s';
		navSide.style.width = '0';
		navSide.style.padding = '16px 0';
		titleBar.style.padding = '0 32px';
		titleBarEl.forEach((e) => {
			e.style.display = 'block';
		});
	}, 0);

	closed = true;
}
autorun();
