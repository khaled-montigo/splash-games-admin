import React, { useEffect, useState } from 'react';
import { useNode } from '@craftjs/core';
import {FormGroup } from "react-bootstrap-formutil";
import {Col, Form, FormControl, Row} from "react-bootstrap";
import {SelectInputSettings} from './SelectInputSettings'
import ValidationsClass from  '../../validation/validator/Validations'
import {useDispatch, useSelector} from 'react-redux';
import Select from "react-select";
import {NoNameClass} from '../../../utility/ElemantNames'


export const SelectInput = ({ name, label, uploadLabel, validation, divCol, wrapperCol, labelCol, value }) => {
    const {MyID} = useNode((node) => ({ElID: node.id}));
    const { Code } = useSelector(state => {
        return {
            Code: state.IsCoding
        };
    });


    const options = [
        { value: '', label: 'Select' },
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ];




    const {connectors: { connect, drag } } = useNode();
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
                       className={'select2-row'}
                       required={validation.required}
                       max={validation.max}
                       min={validation.min}
                       $validators={{
                           required: (value) => {
                               if(Array.isArray(value)){
                                   return value.length >= 1 || 'required'
                               }
                               return !!value.value || 'required'
                           },
                           max: (value, len) => {
                               if(Array.isArray(value)){
                                   return value.length <= parseInt(len) || 'Max selection ：' + len
                               }
                               return false;

                           },
                           min: (value, len) => {
                               if(Array.isArray(value)){
                                   return value.length >= parseInt(len) || 'Min selection ：' + len
                               }
                               return false;
                           },
                       }}
                       name={name}
                       label={label}
                       wrapperCol={wrapperCol}
                       labelCol={labelCol}>
                       <Select className={'select-2 '}
                               closeMenuOnSelect={!validation.multiple}
                               isMulti={validation.multiple}
                               options={options} />
                   </FormGroup>
                   </Col>
               )
               :
               ` <Col
                       ${JSON.stringify(divCol)}
                       style={{width: '100%'}}
                       className={NoNameClass(${name})}
                   >
                   <FormGroup ${(validation.required ? ('required') : '\r \r \r')} ${(validation.isEmail ? ('isEmail') : '\r \r \r')} ${(validation.maxLength ? ('maxLength="'+validation.maxLength+'"') : '\r \r \r')} ${(validation.minLength ? ('minLength="'+validation.minLength+'"') : '\r \r \r')} ${(validation.max ? ('max="'+validation.max+'"') : '\r \r \r')} ${(validation.min ? ('min="'+validation.min+'"') : '\r \r \r')}
                   name={'${name}'}
        label={'${label}'}
        wrapperCol={${JSON.stringify(wrapperCol)}}
        labelCol= {${JSON.stringify(labelCol)}}
        >
        <Select className={'select-2 '}
                closeMenuOnSelect={!${validation.multiple}}
                 isMulti={${validation.multiple}}
                 options={options} />
        </FormGroup>
        </Col>`
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




export const SelectInputDefaultProps = {
    name : '',
    label: 'input text',
    uploadLabel: 'Select File',
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

SelectInput.craft = {
    props: SelectInputDefaultProps,
    related: {
        settings: SelectInputSettings,
    },
};