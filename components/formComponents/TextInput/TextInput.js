import React, { useEffect, useState } from 'react';
import { useNode } from '@craftjs/core';
import {FormGroup } from "react-bootstrap-formutil";
import {Col, Form, FormControl, Row} from "react-bootstrap";
import {TextInputSettings} from './TextInputSettings'
import ValidationsClass from  '../../validation/validator/Validations'
import {useDispatch, useSelector} from 'react-redux';
import TextInputCode from './TextInputCode'
import {NoNameClass} from "../../../utility/ElemantNames";


export const TextInput = ({ name, label, type, validation, divCol, wrapperCol, labelCol, value, ss }) => {
    const {
        actions: { setProp }, MyID, props,} = useNode((node) => ({
        ElID: node.id,
        props: node.data.props,
    }));
    const { Code } = useSelector(state => {
        return {
            Code: state.IsCoding
        };
    });
    const {connectors: {connect, drag } } = useNode();



    return (
       <>
           {!Code
               ? (
                   <Col
                       {...divCol}
                       ref={(ref) => connect(drag(ref))}
                       style={{width: '100%'}}
                       className={NoNameClass(name)}
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
                       validMessage={{
                           // required: '请输入用户名',
                           // isNumber: '请输入用户名',

                       }}
                       name={name}
                       label={label}
                       wrapperCol={wrapperCol}
                       labelCol={labelCol}>
                       <FormControl  type={type} />
                   </FormGroup>

                   </Col>
               )
               :
               <TextInputCode divCol={divCol} labelCol={labelCol} validation={validation} value={validation} type={type} label={label} name={name} wrapperCol={wrapperCol}/>
           }


       </>
    );
};

const MakeID = (length)  => {
    const result           = [];
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}




export const TextInputDefaultProps = {
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


TextInput.craft = {
    props: TextInputDefaultProps,
    related: {
        settings: TextInputSettings,
    },
};