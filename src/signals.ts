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
		// eslint-disable-next-line no-useless-catch -- Intentionally rethrowing the error
	} catch (e) {
		throw e;
	} finally {
		stack.delete(cb);
	}
}

export function createMemo<T>(cb: () => T): () => T {
	const [value, setValue] = createSignal<T | null>(null);

	createEffect(() => {
		setValue(cb());
	});

	// At this point, the value is guaranteed to be T, the effect takes care of it.
	// We initialize the signal with `null` to avoid calculating the value twice unnecessarily.
	return value as () => T;
}
