"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idToIndex = idToIndex;
function idToIndex(id) {
    return id?.replaceAll("-", "_") || '';
}
