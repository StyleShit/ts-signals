import { createEffect, createSignal } from './signals';

export function setupCounter(element: HTMLButtonElement) {
	const [count, setCount] = createSignal(0);

	createEffect(() => {
		element.innerHTML = `count is ${count()}`;
	});

	element.addEventListener('click', () => setCount(count() + 1));
}
