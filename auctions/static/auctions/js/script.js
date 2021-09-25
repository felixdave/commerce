console.log('hello');

document.querySelector('h1').onclick = () => {
	location.href = '/';
};

const date = new Date();
const offset = date.getTimezoneOffset();
console.log(offset / 60);
