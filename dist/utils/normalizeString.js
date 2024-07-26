"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeString = normalizeString;
function normalizeString(str, { lowerCase }) {
    if (typeof str !== "string")
        return str;
    let returnString = str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/gi, '');
    if (lowerCase)
        returnString = returnString.toLowerCase();
    return returnString;
}
