import React, { useEffect, useState } from 'react';
import { useNode } from '@craftjs/core';
import {FormGroup } from "react-bootstrap-formutil";
import {Col, Form, FormControl, Row} from "react-bootstrap";
import {TextInputSettings} from './TextInputSettings'
import ValidationsClass from  '../../validation/validator/Validations'
import {useDispatch, useSelector} from 'react-redux';


const TextInputCode = ({ name, label, type, validation, divCol, wrapperCol, labelCol, value }) => {
    return (
        `
         <Col
        xs={{span : ${divCol.xs.span} , offset : ${divCol.xs.offset} }}
        md={{span : ${divCol.md.span} , offset : ${divCol.md.offset} }}
        lg={{span : ${divCol.lg.span} , offset : ${divCol.lg.offset} }}
        xl={{span : ${divCol.xl.span} , offset : ${divCol.xl.offset} }}
        className={'mb-3'}
        style={{width: '100%'}}>
        <FormGroup ${(validation.required ? ('required') : '\r \r \r')} ${(validation.isEmail ? ('isEmail') : '\r \r \r')} ${(validation.maxLength ? ('maxLength="'+validation.maxLength+'"') : '\r \r \r')} ${(validation.minLength ? ('minLength="'+validation.minLength+'"') : '\r \r \r')} ${(validation.max ? ('max="'+validation.max+'"') : '\r \r \r')} ${(validation.min ? ('min="'+validation.min+'"') : '\r \r \r')}
        
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
        name={'${name}'}
        label={'${label}'}
        wrapperCol={{
            xs:{span : ${wrapperCol.xs.span} , offset : ${wrapperCol.xs.offset} },
            md :{span : ${wrapperCol.md.span} , offset : ${wrapperCol.md.offset} },
            lg:{span : ${wrapperCol.lg.span} , offset : ${wrapperCol.lg.offset} },
            xl:{span : ${wrapperCol.xl.span} , offset : ${wrapperCol.xl.offset} },
        }}
        labelCol={{
            xs:{span : ${labelCol.xs.span} , offset : ${labelCol.xs.offset} },
            md :{span : ${labelCol.md.span} , offset : ${labelCol.md.offset} },
            lg:{span : ${labelCol.lg.span} , offset : ${labelCol.lg.offset} },
            xl:{span : ${labelCol.xl.span} , offset : ${labelCol.xl.offset} },
        }}>
        <FormControl type={'${type}'} />
        </FormGroup>
</Col>
        `.replace(/(\r\n|\n\n|\r)/gm, "")
    );
};

export default TextInputCode