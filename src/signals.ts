type Signal<T = unknown> = {
	listeners: Set<EffectCallback>;
	value: T;
	get: () => T;
	set: (newValue: T) => void;
};

type EffectCallback = () => void;

const stack = new Set<EffectCallback>();

export function createSignal<T>(
	initialValue: T,
): [Signal<T>['get'], Signal<T>['set']] {
	const signal: Signal<T> = {
		value: initialValue,

		listeners: new Set(),

		get: () => {
			stack.forEach((cb) => signal.listeners.add(cb));

			return signal.value;
		},

		set: (newValue) => {
			if (Object.is(signal.value, newValue)) {
				return;
			}

			signal.value = newValue;

			signal.listeners.forEach((cb) => cb());
		},
	};

	return [signal.get, signal.set];
}

export function createEffect(cb: EffectCallback) {
	stack.add(cb);

	try {
		cb();
	} catch (e) {
		throw e;
	} finally {
		stack.delete(cb);
	}
}
