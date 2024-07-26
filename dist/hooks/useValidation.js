"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useValidation = useValidation;
function useValidation(field, useFormContext) {
    // const form = useForm<R>() || useFormContext();
    // const value = form?.getValues?.(field);
    // const className = form?.formState?.errors[field]
    //   ? "is-invalid"
    //   : value
    //     ? "" // ? "is-valid"
    //     : "";
    // function ErrorMessage(props: React.HTMLAttributes<HTMLElement>) {
    //   const { className, ...rest } = props;
    //   return (
    //     <small className={`text-danger ${className}`} {...rest}>
    //       {form?.formState?.errors?.[field]?.message}
    //     </small>
    //   );
    // }
    // return { className, ErrorMessage };
    return { className: '', ErrorMessage: () => null };
}
