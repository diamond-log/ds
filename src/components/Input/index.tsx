'use client';

import FormControl, { FormControlProps } from "react-bootstrap/FormControl"
import { DSInputProps } from "../../types/Input"
import { forwardRef, useState } from "react";
import { idToIndex } from "../../utils/idToIndex";
import { Icon } from "../Icon";
import { useValidation } from "../../contexts/ValidationContext";

export const Input = forwardRef(({ dictionary, togglePasswordVisibility, alert, labelId, labelClassName, icon, ...props }: DSInputProps, ref: React.ForwardedRef<FormControlProps>) => {

    const [visible, setVisible] = useState<boolean>(false);
    const intlText = dictionary?.[idToIndex(props.id)];
    const placeholder = props?.placeholder || intlText;
    const { className } = useValidation();
    props = {...props, className: `${className} ${props.className || ""}`};

    function toggleVisibility() {
        setVisible(!visible);
    }

    const AlertComponent = (() => {
        if (!alert) return null;

        props.className = `${props.className} border border-${alert.type}`;

        return (
            typeof alert.message === "string"
                ? (
                    <p className={`text-${alert.type}`}>{alert.message}</p>
                )
                : alert.message || null
        );
    })();

    const alertIcon = {
        success: "check-lg",
        warning: "exclamation-triangle",
        danger: "exclamation-circle"
    }

    const LabelComponent = (
        labelId 
            ? (
                <label
                htmlFor={props.id}
                className={labelClassName + (props?.required ? ' isRequired' : '')}
                >
                    {dictionary?.[idToIndex(labelId)] || ''}
                </label>
            )
            : null
    )

    let InputComponent: React.ReactNode;

    if(togglePasswordVisibility && props.type === "password") {
        InputComponent = (
            <span className="d-flex position-relative align-items-center w-100">
                <FormControl {...props} type={visible ? "text" : "password"} placeholder={placeholder} ref={ref} />
                {
                    visible
                        ? <Icon name="eye" role="button" className="position-absolute end-0 me-2" onClick={() => toggleVisibility()}/>
                        : <Icon name="eye-slash" role="button" className="position-absolute end-0 me-2" onClick={() => toggleVisibility()}/>
                }
                {
                    alert && (
                        <Icon
                        name={alertIcon[alert.type]}
                        style={{ right: 25 }}
                        className={`position-absolute me-2 pe-none`}
                        variant={alert.type}
                        />
                    )
                }
            </span>
        )
    }
    else if (alert) {
        InputComponent = (
            <span className="d-flex position-relative align-items-center w-100 p-0">
                <FormControl {...props} placeholder={placeholder} ref={ref} />
                <Icon
                name={alertIcon[alert.type]}
                className={`position-absolute me-2 pe-none ${ togglePasswordVisibility ? "end-2" : "end-0" }`}
                variant={alert.type}
                />
            </span>
        )
    }
    else {
        InputComponent = (
            <span className="d-flex position-relative align-items-center w-100 p-0">
                <FormControl {...props} className={(icon ? "icon " : "") + (props.className || "")} placeholder={placeholder} ref={ref} />
                <span className={`position-absolute me-2 end-0`}>{icon}</span>
            </span>
        )
    }

    return (
        AlertComponent 
        ? (
            <>
                <div className={alert?.containerClassName || "w-100 d-flex flex-column gap-1 p-0"}>
                    {LabelComponent}
                    {InputComponent}
                    {AlertComponent}
                </div>
            </>
        ) :
        labelId ? (
            <>
                <div className={"w-100 d-flex flex-column gap-1 p-0"}>
                    {LabelComponent}
                    {InputComponent}
                </div>
            </>
        )
        : (
            <>
                {InputComponent}
            </>
        )
    )
})