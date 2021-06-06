import React, { useEffect, useState } from 'react';
import { useNode } from '@craftjs/core';
import {FormGroup, CheckboxGroup } from "react-bootstrap-formutil";
import {Col, Form, FormControl, Row, ToggleButtonGroup, FormCheck} from "react-bootstrap";
import ValidationsClass from  '../../validation/validator/Validations'
import {useDispatch, useSelector} from 'react-redux';
import {CheckboxInputSettings} from './CheckboxInputSettings'
import CheckboxInputCode from './CheckboxInputCode'


export const CheckboxInput = ({ name, label, type, validation, divCol, wrapperCol, labelCol, value }) => {

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
                       <CheckboxGroup>
                           <FormCheck inline type="checkbox" value="1" label="label 1"
                           onChange={null}/>
                           <FormCheck inline type="checkbox" value="2" label="label 2"
                                       onChange={(e) => {} }/>
                           <FormCheck  inline type="checkbox" value="2" label="label 3"
                                       onChange={(e) => {} }/>
                       </CheckboxGroup>
                   </FormGroup>
                   </Col>
               )
               :
               <CheckboxInputCode divCol={divCol} labelCol={labelCol} validation={validation} value={validation} type={type} label={label} name={name} wrapperCol={wrapperCol}/>
           }


       </>
    );
};



export const CheckboxInputsDefaultProps = {
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

CheckboxInput.craft = {
    props: CheckboxInputsDefaultProps,
    related: {
        settings: CheckboxInputSettings,
    },
};