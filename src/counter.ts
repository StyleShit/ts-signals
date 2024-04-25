import { createEffect, createSignal } from './signals';

export function setupCounter(element: HTMLDivElement) {
	const [count, setCount] = createSignal(0);

	const doubled = () => count() * 2;

	const increment = element.querySelector<HTMLButtonElement>('#increment')!;
	const reset = element.querySelector<HTMLButtonElement>('#reset')!;
	const countEl = element.querySelector<HTMLDivElement>('#count')!;
	const doubledEl = element.querySelector<HTMLDivElement>('#count-doubled')!;

	createEffect(() => {
		countEl.innerHTML = `Count is ${count()}`;
		doubledEl.innerHTML = `Doubled is ${doubled()}`;
	});

	increment.addEventListener('click', () => setCount(count() + 1));
	reset.addEventListener('click', () => setCount(0));
}
