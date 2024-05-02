import { createEffect, createMemo, createSignal } from './signals';

export function setupCounter(element: HTMLDivElement) {
	const [count, setCount] = createSignal(0);
	const [name, setName] = createSignal('StyleShit');

	const doubled = createMemo(() => count() * 2);

	const increment = element.querySelector<HTMLButtonElement>('#increment')!;
	const reset = element.querySelector<HTMLButtonElement>('#reset')!;
	const countEl = element.querySelector<HTMLDivElement>('#count')!;
	const doubledEl = element.querySelector<HTMLDivElement>('#count-doubled')!;

	const nameInput = element.querySelector<HTMLInputElement>('#name')!;
	const nameOutput = element.querySelector<HTMLSpanElement>('#name-output')!;

	createEffect(() => {
		countEl.innerHTML = `Count is ${count()}`;
		doubledEl.innerHTML = `Doubled is ${doubled()}`;
	});

	createEffect(() => {
		const value = name().trim();

		if (value === '') {
			nameOutput.innerHTML = 'Please enter your name';
			return;
		}

		nameOutput.innerHTML = `Hello, ${value}`;
	});

	increment.addEventListener('click', () => setCount(count() + 1));
	reset.addEventListener('click', () => setCount(0));
	nameInput.addEventListener('input', () => setName(nameInput.value));

	nameInput.value = name();
}
