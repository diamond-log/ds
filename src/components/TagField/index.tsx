/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { WithOutContext as ReactTags, ReactTagsWrapperProps, SEPARATORS } from 'react-tag-input';
import { useForm } from '../../contexts/FormContext';
import { useValidation } from '../../contexts/ValidationContext';
import { IntlProps } from '../../types';
import { idToIndex } from '../../utils/idToIndex';
import { Icon } from '../Icon';
import { normalizeString } from '../../utils';
import { RegisterOptions } from 'react-hook-form';
import { ValidationInput } from '../ValidationInput';

export type Tag = {
  id: string;
  text: React.ReactNode;
  className?: string;
  value: any;
  disabled?: boolean;
}

export type Suggestion<ValueType = any[]> = {
  id: string;
  text: string;
  className?: string;
  render?: React.ReactNode;
  value?: ValueType extends any[] ? ValueType[number] : ValueType;
}

export type Validation<T> = {
  value: T;
  message?: string;
}

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
  // validateMessage?: {
  //   required?: string;
  //   minTags?: string;
  //   maxTags?: string;
  // }
  className?: string;
} & Omit<ReactTagsWrapperProps, 'suggestions' | "tags" | "handleAddition" | "maxTags"> & Omit<IntlProps, "intltextposition" | "testText">;

export function TagField<ValueType = any>({
  allowDragDrop = false, allowAddNewTags = false, autoFocus = false, minQueryLength = 1, inputFieldPosition = "inline",
  field, dictionary, labelId, labelClassName, onAddition, suggestions, defaultValue, maxLength, minLength, minTags, maxTags,
  fieldId = "uid", required, registerOptions, ...props
  }: DSTagFieldProps<ValueType>) {

  const [tags, setTags] = useState<Array<Tag>>(
    defaultValue
      ? defaultValue.map(value => ({
        ...value,
        text: value?.render || value?.text,
        value: value?.value || value?.text
      }))
      : []
  );
  const [focus, setFocus] = useState(false);
  const { setValue, getValues, clearErrors, setError, getFieldState } = useForm<
  { [field: string]: ValueType } & typeof fieldId extends string ? { [fieldId: string]: ValueType } : {}
  >();
  const { className } = useValidation();
  const validation: RegisterOptions | undefined = (minTags || maxTags || required ) ? {
    ...registerOptions,
    validate: {
      ...registerOptions?.validate,
      required: (arrValue: any[]) => required ? ( arrValue?.length > 0 ? undefined : required ) : undefined,
      minTags: (arrValue: any[]) => minTags ? ( arrValue?.length >= minTags.value ? undefined : minTags?.message || true ) : undefined,

      // refactor
      maxTags: (arrValue: any[]) => maxTags && arrValue ? ( arrValue.length <= maxTags.value ? undefined : maxTags?.message || true ) : undefined
    }
  } : undefined;

  useEffect(() => {
    setTags(
      defaultValue
      ? defaultValue.map(value => ({
        ...value,
        text: value?.render || value?.text,
        value: value?.value || value?.text
      }))
      : []
    )
  },[defaultValue]);

  const filteredTags = tags.filter(tag => !!tag?.id);
  
  const handleDelete = (
    index: number,
    _event: React.MouseEvent<HTMLSpanElement, MouseEvent> | React.KeyboardEvent<HTMLSpanElement>
  ) => {

    if(tags[index]?.disabled) return;
    
    const tagsValues = tags.filter((_, i) => i !== index);
    setTags(tagsValues);

    const formValues: ValueType[] = getValues(field).filter((value: any) => {
      const valueId = (value?.[fieldId] || value?.["id"]);

      if (
        (typeof value === "object" && valueId !== tags[index].id) ||
        (typeof value !== "object" && value !== tags[index].value)
      ) {
        return true
      }

      return false;
    });

    setValue(field, formValues);

    if(required && formValues.length === 0) {
      setError(field, {
        type: "required",
        message: typeof required === "string" ? required : undefined
      })
    }

    if(minTags && formValues.length < minTags.value) {
      setError(field, {
        type: "minTags",
        message: minTags.message
      })
    }
  }; 

  const onTagUpdate = (index: number, newTag: Tag) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1, newTag);
    setTags(updatedTags);

    const formValues: ValueType[] = getValues(field).map((value: any) => {
      const valueId = (value?.[fieldId] || value?.["id"]);
       
      if (
        (typeof value === "object" && value === newTag.id) ||
        (typeof value !== "object" && value === newTag.value)
      ) {
        return newTag.value;
      }

      return value
    });

    setValue(field, formValues);
  };  

  const handleAddition = (data: DSTagFieldProps['suggestions'][number]) => {
    if(!data.text.length || (maxLength && data.text.length > maxLength || (minLength && data.text.length < minLength))) return;
    if(maxTags && tags.length >= maxTags.value) return;
    if(!allowAddNewTags && !suggestions?.some(suggestion => (suggestion?.text === data?.text) || (suggestion?.value === data?.value) )) return;

    let tagsValue: Suggestion<ValueType>[] = [];
    
    if(onAddition) {

      const value = onAddition(data);
      if(!value) return;

      setTags((prevTags) => {
        tagsValue = [...prevTags, {
          ...value,
          text: (
            <span className='d-flex flex-row align-items-center gap-1 text-truncate'>
              {value?.render || value?.text}
            </span>
          ),
          value: value?.value || value?.text
      }];

        return tagsValue;
      });
    }
    else {
      setTags((prevTags) => {
        tagsValue = [...prevTags, {
            ...data,
            text: (
              <span className='d-flex flex-row align-items-center gap-1 text-truncate'>
                {data?.render || data?.text}
              </span>
            ),
            value: data?.value || data?.text
        }];

        return tagsValue;
      });
    }

    const prevValues = getValues(field) || [];
    const newValues = [...prevValues, tagsValue.at(-1).value];

    setValue(
      field,
      newValues
    );

    if(
      getFieldState(field)?.error?.type === "minTags" && newValues.length >= minTags?.value ||
      getFieldState(field)?.error?.type === "required" && newValues.length >= (minTags?.value || 0)
    ) {
      clearErrors(field);
    }
  };

   const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
    const newTags = tags.slice(); 
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);   
    // re-render
    setTags(newTags);

    const tagsValue = newTags.map(({value}) => value);
    setValue(field, tagsValue);
  };

   const onClearAll = () => {
    setTags([]);

    setValue(field, []);
  };

  const renderSuggestion = (item: Tag, query: string) => {

    if( tags.some(tag => tag?.id === item?.id) ) return;

    // refactor
    const suggestion = item as unknown as Suggestion;
    
    return (
      <span
      className="d-flex flex-row align-items-center gap-1 px-1 text-truncate"
      style={{
        padding: "0.375rem",
        borderRadius: "0.375rem"
      }}
      >
        {suggestion?.render || suggestion.text}
      </span>
    )
  }

  const shouldRenderSuggestions = (query: string) => {
    if(
      maxTags && tags.length >= maxTags.value
    ) return false;

    if(focus) return true;
  }

  const filterSuggestions = (query: string, suggestions: Array<Tag>): Array<Tag> => {
    const ns = (str: string) => normalizeString(str, { lowerCase: true });

    return (
      suggestions
      .filter(({ text }) => {
        return ns(text)?.includes(ns(query));
      })
    )
  }

  const InputTagElement = (
    <>
      <ReactTags
      inputProps={{
        disabled: maxTags && tags.length >= maxTags.value
      }}
      autocomplete={!allowAddNewTags ? true : props?.autocomplete}
      autoFocus={autoFocus}
      tags={filteredTags}
      suggestions={suggestions}
      handleInputFocus={() => setFocus(true)}
      handleInputBlur={() => setFocus(false)}
      renderSuggestion={renderSuggestion}
      shouldRenderSuggestions={shouldRenderSuggestions}
      handleFilterSuggestions={filterSuggestions}
      separators={[SEPARATORS.ENTER]}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      handleDrag={handleDrag}
      onTagUpdate={onTagUpdate}
      inputFieldPosition={inputFieldPosition}
      onClearAll={onClearAll}
      allowDragDrop={allowDragDrop}
      minQueryLength={minQueryLength}
      removeComponent={(props) => {
        if(props.tag?.disabled) return null;

        return (
          <Icon
          name="x"
          className={props.className + " cursor-pointer"}
          variant="gray-600"
          size="3"
          onClick={props.onRemove}
          />
        )
      }}
      placeholder={dictionary?.[idToIndex(props.id)] || ''}
      classNames={{
        tag: 'tagfield-tag bg-gray-200 rounded-1',
        tags: 'tagfield-tags w-100',
        tagInput: 'tagfield-tag-input flex-grow-1',
        tagInputField: 'tagfield-tag-input-field',
        selected: 'tagfield-selected' + (className ? ` ${className}` : '') + (props?.className ? ` ${props?.className}` : ''),
        suggestions: 'tagfield-suggestions border border-gray',
        activeSuggestion: 'tagfield-active-suggestion',
        editTagInput: 'tagfield-edit-tag-input',
        editTagInputField: 'tagfield-edit-tag-input-field',
        clearAll: 'tagfield-clear-all',
      }}
      {...props}
      />
    </>
  );

  if(labelId) return (
    <>
      <div className={"w-100 d-flex flex-column gap-1 p-0"}>
        {
          labelId
            ? (
              <label
              htmlFor={props.id}
              className={labelClassName + (required ? ' isRequired' : '')}
              >
                {dictionary?.[idToIndex(labelId)]}
              </label>
            ) : null
        }
        {InputTagElement}
      </div>
      <ValidationInput field={field} registerOptions={validation}/>
    </>
  )

  return (
    <>
      {InputTagElement}
      <ValidationInput field={field} registerOptions={validation}/>
    </>
  )

};