import FormControl from "react-bootstrap/FormControl"
import { DSTextareaProps } from "../../types/Textarea"
import { idToIndex } from "../../utils/idToIndex";
import { forwardRef } from "react";
import { useValidation } from "../../contexts/ValidationContext";

export const Textarea = forwardRef(({ dictionary, as, labelId, labelClassName, autoResize, ...props }: DSTextareaProps, ref: React.ForwardedRef<any>) => {

    const intlText = dictionary?.[idToIndex(props.id)];
    const placeholder = props?.placeholder || intlText;
    const { className } = useValidation();

    props = {...props, className: `${className} ${props.className || ""}`};

    function autoGrow(element: HTMLTextAreaElement) {
        element.style.height = "5px";
        element.style.height = (element.scrollHeight) + "px";
    }

    const TextareaElement = (
        <FormControl
        {...props}
        as="textarea"
        placeholder={placeholder}
        rows={8}
        ref={ref}/>
    )

    if(labelId) return (
        <div className={"w-100 d-flex flex-column gap-1 p-0"}>
            <label
            htmlFor={props.id}
            className={labelClassName + (props?.required ? ' isRequired' : '')}
            >{dictionary?.[idToIndex(labelId)] || ''}</label>
            {TextareaElement}
        </div>
    )

    return (
        <>
            {TextareaElement}
        </>
    )
});