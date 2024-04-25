type Signal<T = unknown> = {
	value: T;
	get: () => T;
	set: (newValue: T) => void;
};

export function createSignal<T>(
	initialValue: T,
): [Signal<T>['get'], Signal<T>['set']] {
	const signal: Signal<T> = {
		value: initialValue,

		get: () => {
			return signal.value;
		},

		set: (newValue) => {
			signal.value = newValue;
		},
	};

	return [signal.get, signal.set];
}
