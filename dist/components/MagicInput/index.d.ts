import { MagicInputProps } from "./types";
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
declare const MagicInput: import("react").ForwardRefExoticComponent<Omit<MagicInputProps & import("react-bootstrap").FormControlProps & import("react").InputHTMLAttributes<any> & {
    icon?: React.ReactElement<BsIconProps, any>;
    iconPosition?: "start" | "end";
}, "ref"> & import("react").RefAttributes<HTMLInputElement>>;
export default MagicInput;
