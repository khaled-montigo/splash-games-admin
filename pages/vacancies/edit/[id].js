import React, { useState, useEffect } from 'react';
import {FormGroup, Form as UtilForm} from 'react-bootstrap-formutil';
import {Container, Row, Col, Card, FormControl, Form as BootstrapForm, Button, FormLabel, Alert} from 'react-bootstrap';
import ImageUploading from 'react-images-uploading';
import SunEditor from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css';
import UploadImageRender from '/components/form/UploadImageRender'
import ValidationsClass from  '/utility/Validations'
import Select from "react-select";
import serialize from "form-serialize";
import jsonToFormData from "../../../utility/FormDataGenerator";
import GetApiUrl from "../../../utility/Config";
import axios from "axios";
import {GetErrorsFromResponse} from "../../../utility/ErrorsData";
import {useCookies} from "react-cookie";
import SweetAlert from "react-bootstrap-sweetalert";
import Router from "next/router";



export default function AddVacancies({VacanciesData}){
    const [myCookie, setCookie] = useCookies(["session"]);
    const [sweetAlertState, setSweetAlertState] = React.useState(0);
    const [errorAlertState, setErrorAlertState] = React.useState({
        serverError : 0,
        message : "",
        errors : ""
    });
    let submitValid = false;
    let $formutil = React.createRef();

    const description_en_description_Ref =  React.createRef();
    const [description_en_description_State , setDescription_en_description_State] =  React.useState(VacanciesData.description);
    const onDescription_en_description_Change = (content) => {
        const { $setValue, $setDirty } = description_en_description_Ref.current;
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
        setDescription_en_description_State(content);
    }



    const OnImagesValidation = () => {
        let IsValid = true;
        const ImagesValidations = []
        ImagesValidations.forEach(element => {
            if(element.images.length < 1 ) {
                IsValid = false;
            }});
        return IsValid;
    }

    const OnFormSubmit = (e) => {
        console.log("OnFormSubmit");
        e.preventDefault();
        submitValid  = true;
        const { $invalid, $batchDirty, $weakErrors, $validates} = $formutil.current;
        if ($invalid) {
            $batchDirty(true);
            $validates();
            return;
        }

        const form = document.querySelector('#add_form');
        const data = serialize(form, { hash: true });
        /* Submit Function */
        const formData =  jsonToFormData(data);
        SubmitData(formData);
    };


    const SubmitData = (formData) =>{
        let url = GetApiUrl("vacancies/" + VacanciesData.id +"?_method=PUT");
        axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + myCookie.session,
            }
        }).then(res => { // then print response status
            if(res.data.success){
                setSweetAlertState(1);
            }
        }).catch(error => {
            const ErrorData = GetErrorsFromResponse(error.response);
            setErrorAlertState({
                serverError: ErrorData.serverError,
                message: ErrorData.message,
                errors: ErrorData.errors
            });
            window.scrollTo(0, 0);
        });
    }

    return ( <>
        {errorAlertState.serverError != 0 &&
        (
            <Alert variant="danger">
                <Alert.Heading>Error : {errorAlertState.serverError}</Alert.Heading>
                <p>{errorAlertState.message}</p>
                <hr />
                <p dangerouslySetInnerHTML={{__html: errorAlertState.errors}} className="mb-0"></p>
            </Alert>
        )
        }
        <Card className={'custom-card mt-3'}>
            <BootstrapForm onSubmit={OnFormSubmit} id={'add_form'}>
                <UtilForm $ref={$formutil}
                          $processer={($state) => {
                              $state.$dirty = true;
                          }}
                >
                    <Card.Body>


                        <Row>
                            <Col
                                xs={{span : 12 , offset : 0 }}
                                md={{span : 6 , offset : 0 }}
                                lg={{span : 6 , offset : 0 }}
                                xl={{span : 6 , offset : 0 }}
                                className={'mb-3'}
                                style={{width: '100%'}}>
                                <FormGroup required
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
                                           name={'experience_from'}
                                           label={'Experience From'}
                                           $defaultValue={VacanciesData.experience_from}
                                           wrapperCol={{
                                               xs:{span : 12 , offset : 0 },
                                               md :{span : 12 , offset : 0 },
                                               lg:{span : 6 , offset : 0 },
                                               xl:{span : 6 , offset : 0 },
                                           }}
                                           labelCol={{
                                               xs:{span : 12 , offset : 0 },
                                               md :{span : 12 , offset : 0 },
                                               lg:{span : 4 , offset : 0 },
                                               xl:{span : 4 , offset : 0 },
                                           }}>
                                    <FormControl min={0} type={'number'} />
                                </FormGroup>
                            </Col>

                            <Col
                                xs={{span : 12 , offset : 0 }}
                                md={{span : 6 , offset : 0 }}
                                lg={{span : 6 , offset : 0 }}
                                xl={{span : 6 , offset : 0 }}
                                className={'mb-3'}
                                style={{width: '100%'}}>
                                <FormGroup required
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
                                           name={'experience_to'}
                                           label={'Experience to'}
                                           $defaultValue={VacanciesData.experience_to}
                                           wrapperCol={{
                                               xs:{span : 12 , offset : 0 },
                                               md :{span : 12 , offset : 0 },
                                               lg:{span : 6 , offset : 0 },
                                               xl:{span : 6 , offset : 0 },
                                           }}
                                           labelCol={{
                                               xs:{span : 12 , offset : 0 },
                                               md :{span : 12 , offset : 0 },
                                               lg:{span : 4 , offset : 0 },
                                               xl:{span : 4 , offset : 0 },
                                           }}>
                                    <FormControl min={1}  type={'number'} />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Col
                            xs={{span : 12 , offset : 0 }}
                            md={{span : 12 , offset : 0 }}
                            lg={{span : 12 , offset : 0 }}
                            xl={{span : 12 , offset : 0 }}
                            className={'mb-3'}
                            style={{width: '100%'}}>
                            <FormGroup required maxLength={255}
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
                                       name={'expiry_on'}
                                       label={'Expiry On'}
                                       $defaultValue={VacanciesData.expiry_on}
                                       wrapperCol={{
                                           xs:{span : 12 , offset : 0 },
                                           md :{span : 12 , offset : 0 },
                                           lg:{span : 9 , offset : 0 },
                                           xl:{span : 8 , offset : 0 },
                                       }}
                                       labelCol={{
                                           xs:{span : 12 , offset : 0 },
                                           md :{span : 12 , offset : 0 },
                                           lg:{span : 3 , offset : 0 },
                                           xl:{span : 2 , offset : 0 },
                                       }}>
                                <FormControl type={'date'} />
                            </FormGroup>
                        </Col>

                        <Col
                            xs={{span : 12 , offset : 0 }}
                            md={{span : 12 , offset : 0 }}
                            lg={{span : 12 , offset : 0 }}
                            xl={{span : 12 , offset : 0 }}
                            className={'mb-3'}
                            style={{width: '100%'}}>
                            <FormGroup required maxLength={255}
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
                                       name={'description[en][title]'}
                                       label={'Title'}
                                       $defaultValue={VacanciesData.title}
                                       wrapperCol={{
                                           xs:{span : 12 , offset : 0 },
                                           md :{span : 12 , offset : 0 },
                                           lg:{span : 9 , offset : 0 },
                                           xl:{span : 8 , offset : 0 },
                                       }}
                                       labelCol={{
                                           xs:{span : 12 , offset : 0 },
                                           md :{span : 12 , offset : 0 },
                                           lg:{span : 3 , offset : 0 },
                                           xl:{span : 2 , offset : 0 },
                                       }}>
                                <FormControl type={'text'} />
                            </FormGroup>
                        </Col>
                        <Col
                            xs={{span : 12 , offset : 0 }}
                            md={{span : 12 , offset : 0 }}
                            lg={{span : 12 , offset : 0 }}
                            xl={{span : 12 , offset : 0 }}
                            className={'mb-3'}
                            style={{width: '100%'}}>
                            <FormGroup  $ref={description_en_description_Ref} required
                                        name={'description[en][description]'}
                                        label={'Description'}
                                        $defaultValue={VacanciesData.description}
                                        wrapperCol={{
                                            xs:{span : 12 , offset : 0 },
                                            md :{span : 12 , offset : 0 },
                                            lg:{span : 9 , offset : 0 },
                                            xl:{span : 10 , offset : 0 },
                                        }}
                                        labelCol={{
                                            xs:{span : 12 , offset : 0 },
                                            md :{span : 12 , offset : 0 },
                                            lg:{span : 3 , offset : 0 },
                                            xl:{span : 2 , offset : 0 },
                                        }}>
                                <FormControl custom={true} as={"div"} className={'b-0 h-fit-content'}>
                                    <SunEditor defaultValue={VacanciesData.description} height={300} onChange={onDescription_en_description_Change} />
                                    <input value={description_en_description_State} type={'hidden'} name={'description[en][description]'}  />
                                </FormControl>
                            </FormGroup>
                        </Col>


                    </Card.Body>
                    <Card.Footer>
                        <FormGroup>
                            <FormControl type="submit" />
                        </FormGroup>
                    </Card.Footer>
                </UtilForm>
            </BootstrapForm>

        </Card>
        {sweetAlertState === 1 &&
        <SweetAlert success title="The Model added successfully " onConfirm={() => {
            Router.replace('/vacancies')
        }} onCancel={() => {
            Router.replace('/vacancies')
        }}>
            You clicked the button!
        </SweetAlert>
        }
    </>)

}




export async function getServerSideProps({res, params}){
    let GameDataUrl = GetApiUrl("vacancies/"+params.id);
    let VacanciesData = null
    await axios.get(GameDataUrl, {headers: {'Content-Type': 'multipart/form-data'}
    }).then(response => { // then print response status
        if(!response.data.success){
            // res.setHeader("location", "/vacancies");
            // res.statusCode = 302;
            // res.end();
        }
        VacanciesData = response.data.data
    }).catch(error => {
        console.log(error);
        res.setHeader("location", "/vacancies");
        res.statusCode = 302;
        res.end();
    });


    return{
        props:{
            VacanciesData,
        }
    }
}