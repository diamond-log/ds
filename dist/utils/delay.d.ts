export declare function delay(milliseconds: number): {
    execute: (callback: () => any) => void;
    clear: () => void;
};
