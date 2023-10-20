import React, {useState, useEffect} from 'react';
import {
  Center,
  HStack,
  Text,
  Box,
  VStack,
  Button,
  FormControl,
  Input,
  TextArea,
} from 'native-base';
import {InterfaceFormControlProps} from 'native-base/lib/typescript/components/composites/FormControl/types';

type FormProps = InterfaceFormControlProps & {
  id: string;
  errors: any;
  label?: string;
  inputProps?: any;
  helperText?: string;
  mode?: 'input' | 'textarea' | 'else';
  children?: React.ReactNode;
};

const FormInput = ({
  id,
  errors,
  inputProps,
  label,
  helperText,
  mode = 'input',
  children,
  ...others
}: FormProps) => {
  const inputStyle = {
    py: 0,
    px: 0,
    borderRadius: '0',
    borderWidth: '0',
    fontSize: 'md',
    fontFamily: 'Inter',
    color: '#fff',
    // focusOutlineColor: 'project.bg',
    // invalidOutlineColor: '#d4d6db',
    _focus: {
      bg: 'transparent',
    },
    _input: {
      selectionColor: '#8E8E95',
      cursorColor: '#8E8E95',
    },
  };

  return (
    <FormControl {...others}>
      {label && (
        <FormControl.Label
          htmlFor={id}
          mb="1"
          _text={{
            fontSize: 'sm',
            fontFamily: 'Inter',
            color: 'rgba(255, 255, 255, 0.50)',
          }}>
          {label}
        </FormControl.Label>
      )}

      {mode === 'input' && (
        <Input
          nativeID={id}
          {...inputStyle}
          {...inputProps}
          onLayout={e => {
            // console.log(e.nativeEvent.layout.height);
          }}
        />
      )}

      {mode === 'textarea' && (
        <TextArea nativeID={id} {...inputStyle} py="2" {...inputProps} />
      )}

      {mode === 'else' && children}

      {id in errors ? (
        <FormControl.ErrorMessage>
          {errors[id] || 'error'}
        </FormControl.ErrorMessage>
      ) : (
        <>
          {helperText && (
            <FormControl.HelperText
              _text={{
                fontSize: 'xs',
              }}>
              {helperText}
            </FormControl.HelperText>
          )}
        </>
      )}
    </FormControl>
  );
};

export default FormInput;
