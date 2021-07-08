import React, { Component } from 'react';
import { withForm, FormGroup } from 'react-bootstrap-formutil';
import {Card, FormControl, Form, Form as BootstrapForm} from 'react-bootstrap';
import Select from 'react-select'
import {Form as UtilForm} from "react-formutil";
import { useDispatch, useSelector } from 'react-redux';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File


const ValidationFormConst = () => {
    const dispatch = useDispatch();
    const FormRef = React.createRef();
    const TextControllerRef =  React.createRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        FormRef.current.$batchDirty(true);
    }
    const OnTextAreaChange = (e) =>{
        console.log(e);
    }

    const handleChange = (content) =>{
        const { $setValue } = TextControllerRef.current;
        $setValue(content,null);

    }

    setTimeout(function (){
        // let s = document.createElement('script');
        // s.src = '/core.js';
        // s.async = true;
        // document.body.appendChild(s);

    },1)

    return (

        <>

            <Form  onSubmit={handleSubmit} >
                <UtilForm $ref={FormRef}
                          $processer={($state) => {

                              $state.$dirty = true;
                          }}
                >
                <FormGroup
                    $ref={TextControllerRef}
                    required
                    validMessage={{
                        required: '请输入用户名',
                    }}
                    name="agree"
                    label="Name"
                    wrapperCol={{
                        xs: 6,
                        md: 10
                    }}
                    labelCol={{
                        xs: 6,
                        md: 2
                    }}>
                    <FormControl custom={true} as={"div"} className={'b-0 h-fit-content'}>
                        <SunEditor onChange={handleChange} />
                    </FormControl>
                </FormGroup>
                <FormGroup
                    className={'select2-row'}
                    required
                    max="3"
                    min="2"
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
                    name="selection"
                    label="Select"
                    wrapperCol={{
                        xs: 6,
                        md: 9
                    }}
                    labelCol={{
                        xs: 6,
                        md: 2
                    }}>
                    <Select className={'select-2 '}
                            closeMenuOnSelect={false}
                            isMulti={true}
                            options={[
                                { value: '', label: 'asds' },
                                { value: 'asd', label: 'asds' },
                                { value: 'strawberry', label: 'Strawberry' },
                                { value: 'vanilla', label: 'Vanilla'}
                                ]} />
                </FormGroup>
                <FormGroup>
                    <FormControl type="submit" />
                </FormGroup>
                </UtilForm>
            </Form>

        </>
    );
}
export default ValidationFormConst;