"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useContextFactory = useContextFactory;
const react_1 = require("react");
function useContextFactory(context) {
    if (!context) {
        throw new Error("You're trying to create a context hook, but no context was provided.");
    }
    const c = (0, react_1.useContext)(context);
    if (!c) {
        throw new Error("You're trying to call a hook that depends on a Context, outside it.");
    }
    return c;
}
