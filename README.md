# TypeScript Signals

A simple implementation of Signals in TypeScript.

This repository is purely for fun and educational purposes.
It is not intended to be used in production code.

## Live Demo

[![Netlify Status](https://api.netlify.com/api/v1/badges/a782e12b-6f39-48f2-b8c0-ced9cd483866/deploy-status)](https://app.netlify.com/sites/ts-signals/deploys)

[https://ts-signals.netlify.app/](https://ts-signals.netlify.app/)

## What are Signals?

Signals are a way to manage state in a reactive way. They are similar to observables, but with a simpler API.

You can learn more about them here:

-   [SolidJS - Introduction/Signals](https://www.solidjs.com/tutorial/introduction_signals)

-   [YouTube - Ryan K Carniato - Revolutionary Signals](https://www.youtube.com/watch?v=Jp7QBjY5K34)

-   [TC39/proposal-signals](https://github.com/tc39/proposal-signals)

## API

The Signals API is lean and contains only 2 building blocks:

-   `createSignal(initialValue: T): [get, set]` - Creates a Signal object and returns a getter and a setter.

-   `createEffect(cb: () => void)` - Creates an effect that runs the callback function _automagically™_ whenever the Signals that are used inside the callback change.

## Usage

Let's see a simple example of a counter signal that logs the count whenever it changes:

```typescript
import { createSignal, createEffect } from './signals';

const [count, setCount] = createSignal(0);

const increment = () => setCount(count() + 1);

createEffect(() => {
	console.log('Count:', count());
});

increment(); // Count: 1
increment(); // Count: 2

// ...
```

We create a Signal with default value of `0`, and add an effect that logs the count whenever it changes.
The effect automatically infers its dependencies, and runs whenever the `count` Signal changes.

Magic! 🎩✨

## How it Works Under the Hood?

A "Signal" is just an object that holds a value and gives you the option to read and write to it. Roughly something like this:

```typescript
const signal = {
	value: 0,

	get() {
		return this.value;
	},

	set(newValue) {
		this.value = newValue;
	},
};
```

The actual magic happens when combining the `createSignal` and `createEffect` functions.

We utilize JavaScript's call stack to keep track of the dependencies of each effect.
Whenever a Signal is read inside an effect, we add the effect to the Signal's list of subscribers, and whenever the Signal is written to, we notify all the subscribers to run their effects:

```typescript
function createEffect(cb) {
	callStack.add(cb);

	// This will trigger the Signal's `get` method, which in turn,
	// will add the effect to the Signal's subscribers list.
	cb();

	callStack.delete(cb);
}

function createSignal() {
	const signal = {
		// ...

		subscribers: new Set(),

		get() {
			// Merge `this.subscribers` with the current call stack.

			return this.value;
		},

		set(newValue) {
			this.value = newValue;

			// Notify all the subscribers in `this.subscribers`.
		},
	};

	// ...
}
```

Simple yet powerful! 🚀
