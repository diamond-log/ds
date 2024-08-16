"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Control = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
// React
const react_1 = require("react");
exports.Control = (0, react_1.forwardRef)((props, ref) => {
    const { icon, iconPosition, ...inputProps } = props;
    const wrapperStyle = {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
    };
    const controlStyle = {
        ...inputProps.style,
        paddingLeft: (icon && iconPosition == 'start') ? '2rem' : undefined,
    };
    function getIconWrapperStyles() {
        const commonStyle = {
            position: 'absolute'
        };
        if (inputProps.type === 'number' && iconPosition === 'end') {
            return {
                ...commonStyle,
                right: '2rem'
            };
        }
        else if (iconPosition === 'end') {
            return {
                ...commonStyle,
                right: '0.5rem'
            };
        }
        else {
            return {
                ...commonStyle,
                left: '0.5rem'
            };
        }
    }
    return ((0, jsx_runtime_1.jsxs)("div", { style: wrapperStyle, children: [(0, jsx_runtime_1.jsx)("input", { ...inputProps, style: controlStyle, ref: ref }), icon &&
                (0, jsx_runtime_1.jsx)("span", { style: getIconWrapperStyles(), children: icon })] }));
});
