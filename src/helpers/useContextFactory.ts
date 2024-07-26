import { Context, useContext } from "react";

export function useContextFactory<T>(context: Context<T>) {
	if (!context) {
		throw new Error(
			"You're trying to create a context hook, but no context was provided."
		);
	}
	const c = useContext(context);
	if (!c) {
		throw new Error(
			"You're trying to call a hook that depends on a Context, outside it."
		);
	}
	return c;
}
