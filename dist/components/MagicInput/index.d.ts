import { DSOptionProps } from "./types";
/**
 *
 * ============================== [COMPONENT'S HYERARCHY] ==============================
 * <Wrapper.Input>
 *		|
 * 		|____ <Control>
 *		|		|
 * 		|		|____
 *		|
 *		|____ <Wrapper.Suggestions>
 *				|
 *				|____ <Option>
 *
 *
 *
 */
declare const MagicInput: import("react").ForwardRefExoticComponent<Omit<{
    children?: React.ReactElement<DSOptionProps, typeof import("./Option").Option> | React.ReactElement<DSOptionProps, typeof import("./Option").Option>[];
} & import("react").ClassAttributes<HTMLInputElement> & import("react").InputHTMLAttributes<HTMLInputElement> & {
    children?: import("react").ReactNode | undefined;
} & Omit<{
    intltextposition?: "left" | "right";
    dictionary?: Record<string, string>;
    testText?: [start: number, end: number];
    labelId?: string;
    labelClassName?: string;
}, "intltextposition"> & import("react-bootstrap").FormControlProps & import("react").InputHTMLAttributes<any> & {
    icon?: React.ReactElement<BsIconProps, any>;
    iconPosition?: "start" | "end";
}, "ref"> & import("react").RefAttributes<HTMLInputElement>>;
export default MagicInput;
