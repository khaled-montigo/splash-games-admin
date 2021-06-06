import React, { useEffect, useState } from 'react';
import { useNode } from '@craftjs/core';
import {FormGroup } from "react-bootstrap-formutil";
import {Col, Form, FormControl, Row, ToggleButtonGroup, ToggleButton} from "react-bootstrap";
import ValidationsClass from  '../../validation/validator/Validations'
import {useDispatch, useSelector} from 'react-redux';
import {ToggleButtonsSettings} from './ToggleButtonsSettings'
import ToggleButtonsCode from './ToggleButtonsCode'


export const ToggleButtons = ({ name, label, type, validation, divCol, wrapperCol, labelCol, value }) => {

    const { Code } = useSelector(state => {
        return {
            Code: state.IsCoding
        };
    });



    const {connectors: { connect, drag } } = useNode();
    return (
       <>
           {!Code
               ? (
                   <Col
                       {...divCol}
                       ref={(ref) => connect(drag(ref))}
                       style={{width: '100%'}}
                   >
                   <FormGroup
                       required={validation.required}
                       isEmail={validation.isEmail}
                       isNumber={validation.isNumber}
                       isFloat={validation.isFloat}
                       isString={validation.isString}

                       maxLength={validation.maxLength}
                       minLength={validation.minLength}
                       max={validation.max}
                       min={validation.min}
                       $validators={{
                           isEmail: (value) => {
                             return ValidationsClass.isEmail(value,"Email not Valid")
                           },
                           isNumber: (value) => {
                               return ValidationsClass.isNumber(value,"Not Number")
                           },
                           isFloat: (value) => {
                               return ValidationsClass.isFloat(value,"Not Float")
                           },

                       }}
                       name={name}
                       label={label}
                       wrapperCol={wrapperCol}
                       labelCol={labelCol}>
                       <ToggleButtonGroup type="radio" name={'s'}>
                           <ToggleButton name={'a'} value={1}>option 1</ToggleButton>
                           <ToggleButton name={'b'} value={2}>option 2</ToggleButton>
                           <ToggleButton name={'c'} value={3}>option 3</ToggleButton>
                       </ToggleButtonGroup>
                   </FormGroup>
                   </Col>
               )
               :
               <ToggleButtonsCode divCol={divCol} labelCol={labelCol} validation={validation} value={validation} type={type} label={label} name={name} wrapperCol={wrapperCol}/>
           }


       </>
    );
};



export const ToggleButtonsDefaultProps = {
    name : '',
    label: 'input text',
    LangFile: '',
    type : 'text',
    required : false,
    validation : {},
    divCol : {
        xs : {span : 12, offset : 0 },
        md : {span : 12, offset : 0 },
        lg : {span : 12, offset : 0 },
        xl : {span : 12, offset : 0 },
    },
    wrapperCol : {
        xs : {span : 12, offset : 0 },
        md : {span : 12, offset : 0 },
        lg : {span : 9, offset : 0 },
        xl : {span : 8, offset : 0 },
    },
    labelCol : {
        xs : {span : 12, offset : 0 },
        md : {span : 12, offset : 0 },
        lg : {span : 3, offset : 0 },
        xl : {span : 2, offset : 0 },
    },
    value : '',

};

ToggleButtons.craft = {
    props: ToggleButtonsDefaultProps,
    related: {
        settings: ToggleButtonsSettings,
    },
};