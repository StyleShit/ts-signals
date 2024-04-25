import { createSignal } from './signals';

export function setupCounter(element: HTMLButtonElement) {
	const [count, setCount] = createSignal(0);

	const increment = () => {
		setCount(count() + 1);
		writeDOM();
	};

	const writeDOM = () => {
		element.innerHTML = `count is ${count()}`;
	};

	element.addEventListener('click', increment);

	writeDOM();
}
