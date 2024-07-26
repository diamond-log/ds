"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = delay;
function delay(milliseconds) {
    let timeout;
    function clear() {
        if (timeout) {
            clearTimeout(timeout);
        }
    }
    return {
        execute: (callback) => {
            clear();
            timeout = setTimeout(() => {
                callback();
            }, milliseconds);
        },
        clear
    };
}
