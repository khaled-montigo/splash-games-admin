import Router from 'next/router'

import React from "react";
import axios from 'axios';
import {FormGroup, Form as UtilForm} from 'react-bootstrap-formutil';
import {Container, Row, Col , Card, FormControl, Form as BootstrapForm, Button, FormLabel} from 'react-bootstrap';
import ImageUploading from 'react-images-uploading';
import SunEditor from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css';
import UploadImageRender from '/components/form/UploadImageRender'
import ValidationsClass from  '/utility/Validations'
import jsonToFormData from  '/utility/FormDataGenerator'
import serialize from  'form-serialize';
import SweetAlert from 'react-bootstrap-sweetalert';
import GetApiUrl from '/utility/Config'

const AddGameProperty = () => {

    let submitValid = false;
    let $bootstrapFormRef = React.createRef();
    let $formutil = React.createRef();

    const [sweetAlertState, setSweetAlertState] = React.useState(0);
    const [iconState, setIconState] = React.useState({images: [], valid : true});
    const onIconChange = (imageList, addUpdateIndex) => {
        setIconState({images : imageList, valid : true});
    };
    const [buttonInputChecked, setButtonInputChecked] = React.useState(false);
    const ChangeButtonInputCheck = (e) =>{
        setButtonInputChecked(e.target.checked);
    }

    const OnImagesValidation = () => {
        let IsValid = true;

        const ImagesValidations = [iconState]
        ImagesValidations.forEach(element => {
            if(element.images.length < 1 ) {
                setIconState({...iconState, valid : false});
                IsValid = false;
            }else{
                setIconState({...iconState, valid : true});
            }
        });
        return IsValid;
    }

    const OnFormSubmit = (e) => {
        e.preventDefault();
        OnImagesValidation();
        submitValid  = true;
        const { $invalid, $batchDirty, $weakErrors } = $formutil.current;
        if ($invalid) {
            $batchDirty(true);
            return;
        }
        if(!OnImagesValidation()){
            $batchDirty(true);
            return;
        }
        const form = document.querySelector('#add_form');
        const data = serialize(form, { hash: true });
        if(iconState.images.length > 0){
            data.icon = iconState.images[0].file;
        }
        let ButtonValue = 0;
        if(buttonInputChecked){
            ButtonValue = 1;
        }
        data.button = ButtonValue;


       const formData =  jsonToFormData(data);
        SubmitData(formData);

    };

    const SubmitData = (formData) =>{
        let url = GetApiUrl("promo-tools");
        axios.post(url, formData, {headers: {'Content-Type': 'multipart/form-data'}
        }).then(res => { // then print response status
              if(res.data.success){
                  setSweetAlertState(1);
              }
        }).catch(error => {
            console.log("ERRRR:: ",error.response.data);
        });
    }

    const SetFormDataValue = (event ) => {
       console.log(event);
    }

    return ( <>
        <Card className={'custom-card mt-3'}>
            <Card.Header>
                <h4>Add Promo Tools</h4>
            </Card.Header>
            <BootstrapForm id={"add_form"} itemRef={$bootstrapFormRef} onSubmit={OnFormSubmit}>
                <UtilForm $ref={$formutil}
                          $processer={($state) => {
                              $state.$dirty = true;
                          }}
                >
                    <Card.Body>

                        <Col
                            xs={{span : 12 , offset : 0 }}
                            md={{span : 12 , offset : 0 }}
                            lg={{span : 12 , offset : 0 }}
                            xl={{span : 12 , offset : 0 }}
                            className={`mb-2 `}>
                            <Row>
                                <Col
                                    xs={{span : 12 , offset : 0 }}
                                    md={{span : 12 , offset : 0 }}
                                    lg={{span : 3 , offset : 0 }}
                                    xl={{span : 2 , offset : 0 }}>
                                    <FormLabel>Icon</FormLabel>
                                </Col>
                                <Col
                                    xs={{span : 12 , offset : 0 }}
                                    md={{span : 12 , offset : 0 }}
                                    lg={{span : 10 , offset : 0 }}
                                    xl={{span : 10 , offset : 0 }}>
                                    <ImageUploading
                                        multiple={undefined}
                                        name={'fds'}
                                        value={iconState.images}
                                        onChange={onIconChange}
                                        maxNumber={undefined}
                                        maxFileSize={undefined}
                                        dataURLKey="data_url">
                                        {({
                                              imageList,
                                              onImageUpload,
                                              onImageRemoveAll,
                                              onImageUpdate,
                                              onImageRemove,
                                              isDragging,
                                              dragProps,
                                          }) => (
                                            <>
                                                <Row>
                                                    <>




                                                        {imageList.map((image, index) => {
                                                            return (
                                                                <>
                                                                    <UploadImageRender multiple={undefined}  image={image} imageColData={{"xs":{"span":12,"offset":0},"md":{"span":12,"offset":0},"lg":{"span":6,"offset":0},"xl":{"span":5,"offset":0}}} index={index} onImageUpload={onImageUpdate} onImageRemove={onImageRemove}/>
                                                                </>
                                                            )
                                                        })}
                                                        {(imageList.length < 1) &&
                                                        <UploadImageRender multiple={undefined}  image={null} imageColData={{"xs":{"span":12,"offset":0},"md":{"span":12,"offset":0},"lg":{"span":6,"offset":0},"xl":{"span":5,"offset":0}}} index={0} onImageUpload={onImageUpload} onImageRemove={onImageRemove}/>
                                                        }

                                                    </>


                                                </Row>

                                            </>


                                        )}
                                    </ImageUploading>
                                    {!iconState.valid &&
                                    <Row>
                                        <div class="has-error is-invalid" style={{marginTop: "-44px", marginLeft : "20px"}} >
                                            <div class="invalid-feedback">Error image: required</div>
                                        </div>
                                    </Row>
                                    }
                                </Col>
                            </Row>


                        </Col>
                        <Col
                            xs={{span : 12 , offset : 0 }}
                            md={{span : 12 , offset : 0 }}
                            lg={{span : 12 , offset : 0 }}
                            xl={{span : 12 , offset : 0 }}
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
                                       name={'promo_tools[en][title]'}
                                       label={'Title'}
                                       onChange={SetFormDataValue}
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
                                <FormControl  type={'text'} />
                            </FormGroup>
                        </Col>

                        <Col
                            xs={{span : 12 , offset : 0 }}
                            md={{span : 12 , offset : 0 }}
                            lg={{span : 12 , offset : 0 }}
                            xl={{span : 12 , offset : 0 }}
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
                                       name={'promo_tools[en][description]'}
                                       label={'Description'}
                                       onChange={SetFormDataValue}
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
                                <FormControl  type={'text'} />
                            </FormGroup>
                        </Col>
                        <Col
                            xs={{span : 12 , offset : 0 }}
                            md={{span : 12 , offset : 0 }}
                            lg={{span : 12 , offset : 0 }}
                            xl={{span : 12 , offset : 0 }}
                            className={'mb-3'}
                            style={{width: '100%'}}>
                            <FormGroup required
                                       max={12}
                                       min={1}
                                       name={'col'}
                                       label={'View Col'}
                                       onChange={SetFormDataValue}
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
                                <FormControl  type={'number'} />
                            </FormGroup>
                        </Col>

                        <Col
                            xs={{span : 12 , offset : 0 }}
                            md={{span : 12 , offset : 0 }}
                            lg={{span : 12 , offset : 0 }}
                            xl={{span : 12 , offset : 0 }}
                            className={'mb-3'}
                            style={{width: '100%'}}>
                            <FormGroup
                                name={'button'}
                                label={'Button'}
                                onChange={ChangeButtonInputCheck}
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
                                <FormControl checked={buttonInputChecked}  type={'checkbox'} />
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
        <SweetAlert success title="The Game Property added successfully " onConfirm={()=>{
            Router.replace('/promo-tools')
        }} onCancel={()=>{
            Router.replace('/promo-tools')
        }}>
            You clicked the button!
        </SweetAlert>
        }

    </>)

}
export default AddGameProperty; 