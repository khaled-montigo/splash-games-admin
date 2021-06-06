import React, { useEffect, useState } from 'react';
import { useNode } from '@craftjs/core';
import {FormGroup } from "react-bootstrap-formutil";
import {Col, Form, FormControl, Row} from "react-bootstrap";
import {TextAreaInputSettings} from './TextAreaInputSettings'
import ValidationsClass from  '../../../utility/Validations'
import {useDispatch, useSelector} from 'react-redux';
import TextAreaInputCode from './TextAreaInputCode'
import SunEditor from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css';
import {AddToCodeFunctions} from "../../../reducers/CodeFunctions/actionCreator";
import {ElementLowerName, ElementUpperName, NoNameClass} from '../../../utility/ElemantNames'

export const TextAreaInput = ({ name, label, height, validation, divCol, wrapperCol, labelCol }) => {
    const {connectors: { connect, drag } } = useNode();
    const {ElID} = useNode((node) => ({ElID: node.id}));
    const { Code, FunctionsData } = useSelector(state => {
        return {
            Code: state.IsCoding,
            FunctionsData: state.CodeFunctions
        };
    });
    let TextAreaRef  =  React.createRef();



    const handleChange = (content) =>{
        if(TextAreaRef.current === null){
            return;
        }
        const { $setValue, $setDirty } = TextAreaRef.current;
        if(content === '<p><br></p>'){
            content = "";
        }
        if(content === '<p></p>'){
            content = "";
        }
        if(content === ""){
            $setDirty(true, null);
        }
        $setValue(content,null);
    }

    useEffect(() => {
        console.log("useEffect");
        const LowerName = ElementLowerName(ElID, name);
        const UpperName  = ElementUpperName (ElID, name);
        const FunctionsCode = `const ${LowerName}Ref =  React.createRef();
const on${UpperName}Change = (content) => {
const { $setValue, $setDirty } = ${LowerName}Ref.current;
    if(content === '<p><br></p>'){
        content = "";
    }
    if(content === '<p></p>'){
        content = "";
    }
    if(content === ""){
        $setDirty(true, null);
    }
    $setValue(content,null);
}`
        AddToCodeFunctions(FunctionsData, ElID, FunctionsCode);
    },[name]);

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
                           $ref={TextAreaRef}
                            required={validation.required}
                            maxLength={validation.maxLength}
                            minLength={validation.minLength}
                            name={name}
                            label={label}
                            wrapperCol={wrapperCol}
                            labelCol={labelCol}>
                            <FormControl custom={true} as={"div"} className={'b-0 h-fit-content'}>
                                <SunEditor height={height} onChange={handleChange} />
                            </FormControl>
                        </FormGroup>

                    </Col>
                )
                :
                <TextAreaInputCode ElID={ElID}  name={name} divCol={divCol} labelCol={labelCol} validation={validation} value={validation} height={height} label={label} wrapperCol={wrapperCol}/>
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




export const TextAreaInputDefaultProps = {
    name : '',
    label: 'input text',
    LangFile: '',
    height : 200,
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
        xl : {span : 10, offset : 0 },
    },
    labelCol : {
        xs : {span : 12, offset : 0 },
        md : {span : 12, offset : 0 },
        lg : {span : 3, offset : 0 },
        xl : {span : 2, offset : 0 },
    },
    value : '',
};


TextAreaInput.craft = {
    props: TextAreaInputDefaultProps,
    related: {
        settings: TextAreaInputSettings,
    },
};