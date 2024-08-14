import { ReactTagsWrapperProps } from 'react-tag-input';
import { IntlProps } from '../../types';
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
export type DSTagFieldProps<ValueType = any[]> = {
    field: string;
    suggestions?: Suggestion<ValueType>[];
    /**
      Required to continue rendering tags due to a rerendering bug
    **/
    defaultValue?: (Suggestion<ValueType> | Tag)[];
    onAddition?: (data: Suggestion<ValueType>[number]) => Tag | undefined | false;
    allowAddNewTags?: boolean;
    minTags?: number;
    maxTags?: number;
    minLength?: number;
    maxLength?: number;
    fieldId?: string;
    required?: boolean;
    validateMessage?: {
        required?: string;
        minTags?: string;
        maxTags?: string;
    };
    className?: string;
} & Omit<ReactTagsWrapperProps, 'suggestions' | "tags" | "handleAddition"> & Omit<IntlProps, "intltextposition" | "testText">;
export declare function TagField<ValueType = any>({ allowDragDrop, allowAddNewTags, autoFocus, minQueryLength, inputFieldPosition, field, dictionary, labelId, labelClassName, onAddition, suggestions, defaultValue, maxLength, minLength, minTags, maxTags, fieldId, validateMessage, required, ...props }: DSTagFieldProps<ValueType>): import("react/jsx-runtime").JSX.Element;
