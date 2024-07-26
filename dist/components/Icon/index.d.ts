export interface BsIconProps {
    name: string;
    size?: '1' | '2' | '3' | '4' | '5' | '6';
    variant?: string;
}
export type DSIconProps = BsIconProps & React.HTMLAttributes<HTMLElement>;
export declare const Icon: import("react").ForwardRefExoticComponent<BsIconProps & import("react").HTMLAttributes<HTMLElement> & import("react").RefAttributes<HTMLElement>>;
