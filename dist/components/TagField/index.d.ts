import { ReactTagsWrapperProps } from 'react-tag-input';
import { IntlProps } from '../../types';
import { RegisterOptions } from 'react-hook-form';
export type Tag = {
    id: string;
    text: React.ReactNode;
    className?: string;
    value: any;
    disabled?: boolean;
};
export type Suggestion<ValueType = any[]> = {
    id: string;
    text: string;
    className?: string;
    render?: React.ReactNode;
    value?: ValueType extends any[] ? ValueType[number] : ValueType;
};
export type Validation<T> = {
    value: T;
    message?: string;
};
export type DSTagFieldProps<ValueType = any[]> = {
    field: string;
    suggestions?: Suggestion<ValueType>[];
    /** ! Required to continue rendering tags due to a rerendering bug **/
    defaultValue?: (Suggestion<ValueType> | Tag)[];
    onAddition?: (data: Suggestion<ValueType>[number]) => Tag | undefined | false;
    allowAddNewTags?: boolean;
    fieldId?: string;
    minLength?: number;
    maxLength?: number;
    minTags?: Validation<number>;
    maxTags?: Validation<number>;
    /** Boolean or required error message */
    required?: boolean | string;
    registerOptions?: RegisterOptions;
    className?: string;
} & Omit<ReactTagsWrapperProps, 'suggestions' | "tags" | "handleAddition" | "maxTags"> & Omit<IntlProps, "intltextposition" | "testText">;
export declare function TagField<ValueType = any>({ allowDragDrop, allowAddNewTags, autoFocus, minQueryLength, inputFieldPosition, field, dictionary, labelId, labelClassName, onAddition, suggestions, defaultValue, maxLength, minLength, minTags, maxTags, fieldId, required, registerOptions, ...props }: DSTagFieldProps<ValueType>): import("react/jsx-runtime").JSX.Element;
