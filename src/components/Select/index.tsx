import FormSelect from "react-bootstrap/FormSelect"
import { idToIndex } from "../../utils/idToIndex";
import { forwardRef } from "react";
import { useValidation } from "../../hooks/useValidation";
import { DSSelectProps } from "../../types/Select";

export const Select = forwardRef(({ dictionary, labelId, labelClassName, ...props }: DSSelectProps, ref: React.ForwardedRef<any>) => {

    const { className, ErrorMessage } = useValidation({
        field: props.name!
    });

    props = {...props, className: `${className} ${props.className || ""}`};

    const SelectElement = <FormSelect {...props} ref={ref}/>;

    if(labelId) return (
        <div className={"w-100 d-flex flex-column gap-1 p-0"}>
            <label
            htmlFor={props.id}
            className={labelClassName + (props?.required ? ' isRequired' : '')}
            >{dictionary?.[idToIndex(labelId)] || ''}</label>
            {SelectElement}
            {ErrorMessage}
        </div>
    )

    return (
        <>
            {SelectElement}
            {ErrorMessage}
        </>
    )
});