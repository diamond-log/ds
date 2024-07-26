export type IntlProps<T = unknown> = {
    intltextposition?: "left" | "right";
    dictionary?: Record<string, string>;
    testText?: [start: number, end: number];
	labelId?: string;
	labelClassName?: string;
} & T;