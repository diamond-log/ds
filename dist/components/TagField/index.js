"use strict";
/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagField = TagField;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_tag_input_1 = require("react-tag-input");
const FormContext_1 = require("../../contexts/FormContext");
const ValidationContext_1 = require("../../contexts/ValidationContext");
const idToIndex_1 = require("../../utils/idToIndex");
const Icon_1 = require("../Icon");
const utils_1 = require("../../utils");
function TagField({ allowDragDrop = false, allowAddNewTags = false, autoFocus = false, minQueryLength = 1, inputFieldPosition = "inline", field, dictionary, labelId, labelClassName, onAddition, suggestions, defaultValue, maxLength, minLength, maxTags, fieldId = "uid", ...props }) {
    const [tags, setTags] = (0, react_1.useState)(defaultValue
        ? defaultValue.map(value => ({
            ...value,
            text: value?.render || value?.text,
            value: value?.value || value?.text
        }))
        : []);
    const [focus, setFocus] = (0, react_1.useState)(false);
    const { setValue, getValues } = (0, FormContext_1.useForm)();
    const { className } = (0, ValidationContext_1.useValidation)(field);
    const filteredTags = tags.filter(tag => !!tag?.id);
    (0, react_1.useEffect)(() => {
        setTags(defaultValue
            ? defaultValue.map(value => ({
                ...value,
                text: value?.render || value?.text,
                value: value?.value || value?.text
            }))
            : []);
    }, [defaultValue]);
    const handleDelete = (index, _event) => {
        if (tags[index]?.disabled)
            return;
        const tagsValues = tags.filter((_, i) => i !== index);
        setTags(tagsValues);
        const formValues = getValues(field).filter((value) => {
            const valueId = (value?.[fieldId] || value?.["id"]);
            if ((typeof value === "object" && valueId !== tags[index].id) ||
                (typeof value !== "object" && value !== tags[index].value)) {
                return true;
            }
            return false;
        });
        setValue(field, formValues);
    };
    const onTagUpdate = (index, newTag) => {
        const updatedTags = [...tags];
        updatedTags.splice(index, 1, newTag);
        setTags(updatedTags);
        const formValues = getValues(field).map((value) => {
            const valueId = (value?.[fieldId] || value?.["id"]);
            if ((typeof value === "object" && value === newTag.id) ||
                (typeof value !== "object" && value === newTag.value)) {
                return newTag.value;
            }
            return value;
        });
        setValue(field, formValues);
    };
    const handleAddition = (data) => {
        if (!data.text.length || (maxLength && data.text.length > maxLength || (minLength && data.text.length < minLength)))
            return;
        if (maxTags && tags.length >= maxTags)
            return;
        if (!allowAddNewTags && !suggestions?.some(suggestion => (suggestion?.text === data?.text) || (suggestion?.value === data?.value)))
            return;
        let tagsValue = [];
        if (onAddition) {
            const value = onAddition(data);
            if (!value)
                return;
            setTags((prevTags) => {
                tagsValue = [...prevTags, {
                        ...value,
                        text: ((0, jsx_runtime_1.jsx)("span", { className: 'd-flex flex-row align-items-center gap-1 text-truncate', children: value?.render || value?.text })),
                        value: value?.value || value?.text
                    }];
                return tagsValue;
            });
        }
        else {
            setTags((prevTags) => {
                tagsValue = [...prevTags, {
                        ...data,
                        text: ((0, jsx_runtime_1.jsx)("span", { className: 'd-flex flex-row align-items-center gap-1 text-truncate', children: data?.render || data?.text })),
                        value: data?.value || data?.text
                    }];
                return tagsValue;
            });
        }
        const prevValues = getValues(field) || [];
        setValue(field, [...prevValues, tagsValue.at(-1).value]);
    };
    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        // re-render
        setTags(newTags);
        const tagsValue = newTags.map(({ value }) => value);
        setValue(field, tagsValue);
    };
    const onClearAll = () => {
        setTags([]);
        setValue(field, []);
    };
    const renderSuggestion = (item, query) => {
        if (tags.some(tag => tag?.id === item?.id))
            return;
        // refactor
        const suggestion = item;
        return ((0, jsx_runtime_1.jsx)("span", { className: "d-flex flex-row align-items-center gap-1 px-1 text-truncate", style: {
                padding: "0.375rem",
                borderRadius: "0.375rem"
            }, children: suggestion?.render || suggestion.text }));
    };
    const filterSuggestions = (query, suggestions) => {
        const ns = (str) => (0, utils_1.normalizeString)(str, { lowerCase: true });
        return (suggestions
            .filter(({ text }) => {
            return ns(text)?.includes(ns(query));
        }));
    };
    const InputTagElement = ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(react_tag_input_1.WithOutContext, { autocomplete: !allowAddNewTags ? true : props?.autocomplete, autoFocus: autoFocus, tags: filteredTags, suggestions: suggestions, handleInputFocus: () => setFocus(true), handleInputBlur: () => setFocus(false), renderSuggestion: renderSuggestion, shouldRenderSuggestions: () => focus, handleFilterSuggestions: filterSuggestions, separators: [react_tag_input_1.SEPARATORS.ENTER], handleDelete: handleDelete, handleAddition: handleAddition, handleDrag: handleDrag, onTagUpdate: onTagUpdate, inputFieldPosition: inputFieldPosition, onClearAll: onClearAll, allowDragDrop: allowDragDrop, minQueryLength: minQueryLength, removeComponent: (props) => {
                if (props.tag?.disabled)
                    return null;
                return ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "x", className: props.className + " cursor-pointer", variant: "gray-600", size: "3", onClick: props.onRemove }));
            }, placeholder: dictionary?.[(0, idToIndex_1.idToIndex)(props.id)] || '', classNames: {
                // root: "tagfield-root",
                // rootFocused: "tagfield-root-focused",
                // selected: "tagfield-selected",
                // selectedTag: "tagfield-selected-tag",
                // selectedTagName: "tagfield-selected-tag-name",
                // search: "tagfield-search",
                // searchInput: "tagfield-search-input",
                // suggestions: "tagfield-suggestions",
                // suggestionActive: "tagfield-suggestion-active",
                // suggestionDisabled: "tagfield-suggestion-disabled",
                tag: 'tagfield-tag bg-gray-200 rounded-1',
                tags: 'tagfield-tags w-100',
                tagInput: 'tagfield-tag-input flex-grow-1',
                tagInputField: 'tagfield-tag-input-field',
                selected: 'tagfield-selected ' + className,
                // remove: 'tagfield-remove',
                suggestions: 'tagfield-suggestions border border-gray',
                activeSuggestion: 'tagfield-active-suggestion',
                editTagInput: 'tagfield-edit-tag-input',
                editTagInputField: 'tagfield-edit-tag-input-field',
                clearAll: 'tagfield-clear-all',
            }, ...props }) }));
    if (labelId)
        return ((0, jsx_runtime_1.jsxs)("div", { className: "w-100 d-flex flex-column gap-1 p-0", children: [labelId
                    ? ((0, jsx_runtime_1.jsx)("label", { htmlFor: props.id, className: labelClassName + (props?.required ? ' isRequired' : ''), children: dictionary[(0, idToIndex_1.idToIndex)(labelId)] })) : null, InputTagElement] }));
    return InputTagElement;
}
;
