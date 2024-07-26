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
        return ((0, jsx_runtime_1.jsx)("div", { style: style, onPointerOver: props.onPointerOver, onPointerLeave: props.onPointerLeave, children: props.children }));
    }
    static Suggestions(props) {
        const style = {
            background: '#fff',
            position: 'absolute',
            alignSelf: 'start',
            width: 'calc(100% + 0.750rem)',
            translate: '-0.375rem 0',
            zIndex: 5,
            top: '2rem',
            maxHeight: '20rem',
            overflowY: props.children?.length > 8 ? 'scroll' : 'hidden',
            overflowX: 'hidden'
        };
        return ((0, jsx_runtime_1.jsx)("div", { className: "border border-gray", style: style, children: props.children }));
    }
}
exports.Wrapper = Wrapper;
