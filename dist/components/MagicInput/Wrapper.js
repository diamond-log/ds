"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wrapper = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
class Wrapper {
    static Input(props) {
        const style = {
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            background: '#fff',
            width: '100%'
        };
        return ((0, jsx_runtime_1.jsx)("div", { className: "magic-input-wrapper", style: style, onPointerOver: props.onPointerOver, onPointerLeave: props.onPointerLeave, children: props.children }));
    }
    static Suggestions(props) {
        const style = {
            background: '#fff',
            position: 'absolute',
            left: '50%',
            right: '50%',
            transform: 'translateX(-50%)',
            width: '96%',
            zIndex: 1,
            top: '2.5rem',
            maxHeight: '25rem',
            overflowY: 'scroll',
            overflowX: 'hidden'
        };
        return ((0, jsx_runtime_1.jsx)("div", { className: "magic-input-suggestions border border-gray", style: style, children: props.children }));
    }
}
exports.Wrapper = Wrapper;
