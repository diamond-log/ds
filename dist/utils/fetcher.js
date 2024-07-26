"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetcher = void 0;
exports.fetcher = {
    get: (input, init) => fetch(input, { ...init, method: 'GET' }).then(res => res.json()),
    post: (input, init) => fetch(input, { ...init, method: 'POST' }).then(res => res.json()),
    delete: (input, init) => fetch(input, { ...init, method: 'DELETE' }).then(res => res.json()),
    patch: (input, init) => fetch(input, { ...init, method: 'PATCH' }).then(res => res.json()),
    put: (input, init) => fetch(input, { ...init, method: 'PUT' }).then(res => res.json())
};
