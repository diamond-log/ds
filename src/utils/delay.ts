export function delay(milliseconds: number) {

	let timeout: NodeJS.Timeout;

	function clear() {
		if (timeout) {
			clearTimeout(timeout);
		}
	}

	return {
		execute: (callback: () => any) => {

			clear();

			timeout = setTimeout(() => {
				callback();
			}, milliseconds)

		},
		clear
	}

}