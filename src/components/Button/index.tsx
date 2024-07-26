import BSButton from "react-bootstrap/Button";
import { DSButtonProps } from "../../types/Button";
import { idToIndex } from "../../utils/idToIndex";
import { ReactNode } from "react";

export const Button = ({ dictionary, intltextposition, as, ...props }: DSButtonProps) => {

    const intlText = dictionary?.[idToIndex(props.id)];

    const children: ReactNode = (() => {
        if (props?.children && intlText) {
            return intltextposition === "right" 
                ? 
                    <>
                        {props.children}
                        <label className="user-select-none cursor-pointer">{intlText}</label>
                    </> 
                :
                    <>
                        <label className="user-select-none cursor-pointer">{intlText}</label>
                        {props.children}
                    </>
        }
        if (props?.children) return props.children;
        return intlText;
    })();

    return (
        <BSButton {...props} children={children}/>
    )
}