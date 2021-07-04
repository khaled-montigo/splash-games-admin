
import React, { useState, useEffect } from 'react';
import {FormGroup, Form as UtilForm} from 'react-bootstrap-formutil';
import {Container, Row, Col , Card, FormControl, Form as BootstrapForm, Button, FormLabel} from 'react-bootstrap';
import StepWizard from "react-step-wizard";
import WizardFormNav from "/components/layout/WizardFormNav";
import ImageUploading from 'react-images-uploading';
import SunEditor from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css';
import ValidationsClass from  '/utility/Validations'
import Select from "react-select";
import UploadImageRender from '/components/form/UploadImageRender'
import transitions from "/styles/transitions.module.css";
import GetApiUrl from "/utility/Config";
import axios from "axios";
import Router from "next/router";
import {LanguageValidations} from '/utility/ValidationChecker'
import serialize from "form-serialize";
import jsonToFormData from "/utility/FormDataGenerator";
import {useCookies} from "react-cookie";

export default function EditGame({GameData, SocialEngagingOptions,PromoToolsOptions, GamePropertiesOptions}){
    const [myCookie, setCookie] = useCookies(["session"]);
    const [sweetAlertState, setSweetAlertState] = React.useState(0);
    const [errorAlertState, setErrorAlertState] = React.useState({
        serverError : 0,
        message : "",
        errors : ""
    });
    let submitValid = false;
    let $formutil = React.createRef();
    const [formCurrentStepState, setFormCurrentStepState] = useState(1)
    const [wizardState, setWizardState] = useState({
        form: {},
        transitions: {
            enterRight: `${transitions.animated} ${transitions.enterRight}`,
            enterLeft: `${transitions.animated} ${transitions.enterLeft}`,
            exitRight: `${transitions.animated} ${transitions.exitRight}`,
            exitLeft: `${transitions.animated} ${transitions.exitLeft}`,
            intro: `${transitions.animated} ${transitions.intro}`,
        },
        // demo: true, // uncomment to see more
    });
    const {wizardStateSW, wizardStateDemo} = wizardState;
    const setWizardInstance = wizardStateSW => setWizardState({
        ...wizardState,
        wizardStateSW,
    });

    const WizardTitles = [
        {title : "Main Info", icon : 'CgMenuBoxed'},
        {title : "Images", icon : 'IoIosImages'},
        {title : "Custom Area", icon : 'BiCustomize'}
    ]


    const description_en_section_Options = [
        { value: 'turbo', label: 'Turbo' },
        { value: 'poker_skill', label: 'Poker skill' },
    ];
    const description_en_devices_Options = [
        { value: 'Mobile', label: 'Mobile' },
        { value: 'Desktop', label: 'Desktop' },
        { value: 'Tablet', label: 'Tablet' },
    ];
    const selectedTest = [
        { value: 'Mobile', label: 'Mobile' },
    ];

    const propertiesOptions = GamePropertiesOptions;
    const promoToolsOptions = PromoToolsOptions;
    const engagingAndSocialOptions = SocialEngagingOptions;

    const GetSelectedSection = () => {
        let selectedSection = {};
        description_en_section_Options.forEach((element) => {
            if(element.value == GameData.section){
                selectedSection = element;
            }
        })

        return selectedSection;
    }

    const GetSelectedDevices = () => {
        const selectedDevices = [];
        if(GameData.devices.includes(",")){
           const devicesList = GameData.devices.split(",");
            description_en_devices_Options.forEach((element) => {
                if (devicesList.includes(element.value)){
                    selectedDevices.push(element)
                }
            })
        }else{
            description_en_devices_Options.forEach((element) => {
                if(element.value == GameData.devices){
                    selectedDevices.push(element)
                }
            })
        }


        return selectedDevices;
    }

    const GetSelectedProperties = () => {
        const selectedProperties = [];
        if (Array.isArray(GameData.selectedProperties)){
            GamePropertiesOptions.forEach((element) => {
                if (GameData.selectedProperties.includes(element.value)) {
                    selectedProperties.push(element)
                }
            })
        }
        return selectedProperties;
    }

    const GetSelectedPromoTools = () => {
        const selectedPromoTools = [];
        if (Array.isArray(GameData.selectedPromoTools)){
            PromoToolsOptions.forEach((element) => {
                if (GameData.selectedPromoTools.includes(element.value)) {
                    selectedPromoTools.push(element)
                }
            })
        }
        return selectedPromoTools;
    }


    const GetSelectedSocialEngaging = () => {
        const selectedselectedSocialEngaging = [];
        if (Array.isArray(GameData.selectedSocialEngaging)){
            SocialEngagingOptions.forEach((element) => {
                if (GameData.selectedSocialEngaging.includes(element.value)) {
                    selectedselectedSocialEngaging.push(element)
                }
            })
        }
        return selectedselectedSocialEngaging;
    }

    const description_en_description_Ref =  React.createRef();
    const [description_en_description_State , setDescription_en_description_State] =  React.useState(GameData.description);
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
    const [imageState, setImageState] = React.useState({images: [{data_url : GameData.image, old : true}], valid : true});
    const onImageChange = (imageList, addUpdateIndex) => {
        setImageState({images : imageList, valid : true});
    };
    const [logoState, setLogoState] = React.useState({images: [{data_url : GameData.logo, old : true}], valid : true});
    const onLogoChange = (imageList, addUpdateIndex) => {
        setLogoState({images : imageList, valid : true});
    };


    const [devicesImageState, setDevicesImageState] = React.useState({images: [], valid : true});
    const onDevicesImageChange = (imageList, addUpdateIndex) => {
        if(devicesImageState.images.length > imageList.length){
            setDevicesImageState({images : imageList, valid : true});
            return;
        }else {
            if(!Array.isArray(addUpdateIndex)) {
                UploadImage("devices-image", imageList[addUpdateIndex].file)
                    .then(data => {
                        if (data.success) {
                            imageList[addUpdateIndex].imageName = data.data.image;
                            setDevicesImageState({images: imageList, valid: true});
                        }
                    })
                    .catch(err => {
                        imageList.splice(addUpdateIndex, 1)
                        let valid = true;
                        if (imageList.length < 1){
                            valid = false;
                        }
                        setDevicesImageState({images: imageList, valid: valid});
                    })
                return;
            }
            addUpdateIndex.forEach(element => {
                UploadImage("devices-image",imageList[element].file)
                    .then(data => {
                        if(data.success){
                            imageList[element].imageName = data.data.image;
                            setDevicesImageState({images : imageList, valid : true});
                        }
                    })
                    .catch(err => console.log(err))
            })
        }
    };

    const [sliderImagesState, setSliderImagesState] = React.useState({images: [], valid : true});
    const onSliderImagesChange = (imageList, addUpdateIndex) => {
        if(sliderImagesState.images.length > imageList.length){
            setSliderImagesState({images : imageList, valid : true});
            return;
        }else {
            if(!Array.isArray(addUpdateIndex)) {
                UploadImage("sliders-image", imageList[addUpdateIndex].file)
                    .then(data => {
                        if (data.success) {
                            imageList[addUpdateIndex].imageName = data.data.image;
                            setSliderImagesState({images: imageList, valid: true});
                        }
                    })
                    .catch(err => {
                        imageList.splice(addUpdateIndex, 1)
                        let valid = true;
                        if (imageList.length < 1){
                            valid = false;
                        }
                        setSliderImagesState({images: imageList, valid: valid});
                    })
                return;
            }
            addUpdateIndex.forEach(element => {
                UploadImage("sliders-image",imageList[element].file)
                    .then(data => {
                        if(data.success){
                            imageList[element].imageName = data.data.image;
                            setSliderImagesState({images : imageList, valid : true});
                        }
                    })
                    .catch(err => console.log(err))
            })
        }
    };



    const [TournamentsArea_image_State, setTournamentsArea_image_State] = React.useState({images: [], valid : true});
    const onTournamentsArea_image_Change = (imageList, addUpdateIndex) => {
        if(TournamentsArea_image_State.images.length > imageList.length){
            setTournamentsArea_image_State({images : imageList, valid : true});
            return;
        }else {
            if(!Array.isArray(addUpdateIndex)) {
                UploadImage("tournaments-spins", imageList[addUpdateIndex].file)
                    .then(data => {
                        if (data.success) {
                            imageList[addUpdateIndex].imageName = data.data.image;
                            setTournamentsArea_image_State({images: imageList, valid: true});
                        }
                    })
                    .catch(err => {
                        imageList.splice(addUpdateIndex, 1)
                        let valid = true;
                        if (imageList.length < 1){
                            valid = false;
                        }
                        setTournamentsArea_image_State({images: imageList, valid: valid});
                    })
                return;
            }
            addUpdateIndex.forEach(element => {
                UploadImage("tournaments-spins",imageList[element].file)
                    .then(data => {
                        if(data.success){
                            imageList[element].imageName = data.data.image;
                            setTournamentsArea_image_State({images : imageList, valid : true});
                        }
                    })
                    .catch(err => console.log(err))
            })
        }
    };



    const [tournamentsArea_en_description_State , setTournamentsArea_en_description_State] =  React.useState('');
    const TournamentsArea_en_description_Ref =  React.createRef();
    const onTournamentsArea_en_description_Change = (content) => {
        const { $setValue, $setDirty } = TournamentsArea_en_description_Ref.current;
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
        setTournamentsArea_en_description_State(content);
    }

    const [SpinsArea_image_State, setSpinsArea_image_State] = React.useState({images: [], valid : true});
    const onSpinsArea_image_Change = (imageList, addUpdateIndex) => {
        if(SpinsArea_image_State.images.length > imageList.length){
            setSpinsArea_image_State({images : imageList, valid : true});
            return;
        }else {
            if(!Array.isArray(addUpdateIndex)) {
                UploadImage("tournaments-spins", imageList[addUpdateIndex].file)
                    .then(data => {
                        if (data.success) {
                            imageList[addUpdateIndex].imageName = data.data.image;
                            setSpinsArea_image_State({images: imageList, valid: true});
                        }
                    })
                    .catch(err => {
                        imageList.splice(addUpdateIndex, 1)
                        let valid = true;
                        if (imageList.length < 1){
                            valid = false;
                        }
                        setSpinsArea_image_State({images: imageList, valid: valid});
                    })
                return;
            }
            addUpdateIndex.forEach(element => {
                UploadImage("tournaments-spins",imageList[element].file)
                    .then(data => {
                        if(data.success){
                            imageList[element].imageName = data.data.image;
                            setSpinsArea_image_State({images : imageList, valid : true});
                        }
                    })
                    .catch(err => console.log(err))
            })
        }
    };

    const [spinsArea_en_description_State , setSpins_en_description_State] =  React.useState('');
    const SpinsArea_en_description_Ref =  React.createRef();
    const onSpinsArea_en_description_Change = (content) => {
        const { $setValue, $setDirty } = SpinsArea_en_description_Ref.current;
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
        setSpins_en_description_State(content);
    }


    useEffect(() => {
        if(Array.isArray(GameData.images)) {
            const _ImagesListData = sliderImagesState.images
            GameData.images.forEach((element) => {
                const imageName =  element.toString().replace(GameData.base_url, "");
                const _ImageObj = {data_url : element, imageName : imageName, old : true}
                _ImagesListData.push(_ImageObj);
            });
            setSliderImagesState({images: _ImagesListData, valid: sliderImagesState.valid})
        }
        if(GameData.devices_image){
            const imageName =  GameData.devices_image.toString().replace(GameData.base_url, "");
            const _ImageObj = {data_url : GameData.devices_image, imageName : imageName, old : true};
            console.log(_ImageObj)
            setDevicesImageState({
                images: [_ImageObj],
                valid: true
            })
        }

        if(GameData.TournamentsArea != null){
            setHasTournamentsArea(true)
            const imageName =  GameData.TournamentsArea.image.toString().replace(GameData.base_url, "");
            const _ImageObj = {data_url : GameData.TournamentsArea.image, imageName : imageName, old : true};
            setTournamentsArea_image_State({
                images: [_ImageObj],
                valid: true
            })
        }


        if(GameData.SpinsArea != null){
            setHasSpinsAre(true)
            const imageName =  GameData.SpinsArea.image.toString().replace(GameData.base_url, "");
            const _ImageObj = {data_url : GameData.SpinsArea.image, imageName : imageName, old : true};
            setSpinsArea_image_State({
                images: [_ImageObj],
                valid: true
            })
        }



    },[])



    const UploadImage = (type, File)  => {
        let url = GetApiUrl("games/image-upload");
        let formData = new FormData();
        formData.append('type', type);
        formData.append('image', File);

        const promise = axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + myCookie.session,
            }
        })
        const dataPromise = promise.then((response) => response.data)
        return dataPromise
    }

    const OnImagesValidation = () => {
        let HasError = false;
        const ImagesValidations = [imageState,logoState,devicesImageState,sliderImagesState]
        ImagesValidations.forEach(element => {
            if(element.images.length < 1 ) {
                HasError = true;
            }});
        return HasError;
    }



    const previousStep = () => {
        wizardStateSW.previousStep();
    }


    const [hasTournamentsArea, setHasTournamentsArea] = useState(false)
    const isTournamentsArea = (e) => {
        setHasTournamentsArea(e.target.checked);
    }


    const [hasSpinsAre, setHasSpinsAre] = useState(false)
    const isSpinsArea = (e) => {
        setHasSpinsAre(e.target.checked);
    }




    const onStepChange = (stats) => {
        console.log(stats.activeStep);
    };

    const OnFormSubmit = (e) => {
        e.preventDefault();
        const { $invalid, $batchDirty , $errors} = $formutil.current;


        if(wizardStateSW.state.activeStep === 0){
            let  FirstStepError = LanguageValidations($errors,'description',['en','ar'],['description','section','title','devices'])
            if(!FirstStepError){
                wizardStateSW.nextStep();
            }
            $batchDirty(true);
            return;
        }

        if(wizardStateSW.state.activeStep === 1){
            if(!OnImagesValidation()){
                wizardStateSW.nextStep();
            }
            $batchDirty(true);
            return;
        }

        if(wizardStateSW.state.activeStep === 2){
            if(hasTournamentsArea){
                let TournamentsAreaError = LanguageValidations($errors,'TournamentsArea',['en','ar'],['title','description'])
                if(TournamentsAreaError){
                    $batchDirty(true);
                    return;
                }

                if($errors.hasOwnProperty('TournamentsArea')){
                    if($errors.TournamentsArea.hasOwnProperty('image_col')){
                        $batchDirty(true);
                        return;
                    }
                }

                if(TournamentsArea_image_State.images.length < 1) {
                    $batchDirty(true);
                    return;
                }

            }

            if(hasSpinsAre){
                let SpinsAreaError = LanguageValidations($errors,'SpinsArea',['en','ar'],['title','description'])
                if(SpinsAreaError){
                    $batchDirty(true);
                    return;
                }
                if($errors.hasOwnProperty('SpinsArea')){
                    if($errors.TournamentsArea.hasOwnProperty('image_col')){
                        $batchDirty(true);
                        return;
                    }
                }

                if(SpinsArea_image_State.images.length < 1) {
                    $batchDirty(true);
                    return;
                }
            }
        }

        const form = document.querySelector('#add_form');
        const data = serialize(form, { hash: true });
        if(!hasTournamentsArea){
            delete data.TournamentsArea;
        }else{
            data.TournamentsArea.image = TournamentsArea_image_State.images[0].imageName
        }
        if(!hasSpinsAre){
            delete data.SpinsArea;
        }else{
            data.SpinsArea.image = SpinsArea_image_State.images[0].imageName
        }
        if(imageState.images.length > 0){
            if (!imageState.images[0].old){
                data.image = imageState.images[0].file;
            }
        }
        if(logoState.images.length > 0){
            if (!logoState.images[0].old) {
                data.logo = logoState.images[0].file;
            }
        }

        if(devicesImageState.images.length > 0) {
            data.devices_image = devicesImageState.images[0].imageName;
        }

        if(sliderImagesState.images.length > 0){
            const sliderImages = [];
            sliderImagesState.images.forEach(function(image) {
                sliderImages.push(image.imageName);
            });
            data.slider_images = sliderImages;
        }
        console.log("data");
        console.log(data);


        const formData =  jsonToFormData(data);
        SubmitData(formData);

        /* Submit Function */
    };

    const SubmitData = (formData) =>{
        let url = GetApiUrl("games/" +GameData.id + "?_method=PUT");
        axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + myCookie.session,
            }
        }).then(res => { // then print response status

        }).catch(error => {
            console.log("ERRRR:: ",error.response);
        });
    }

    return ( <>
        <Card className={'custom-card mt-3'}>
            <BootstrapForm id={"add_form"}  onSubmit={OnFormSubmit} >
                <UtilForm $ref={$formutil}
                          $processer={($state) => {
                              $state.$dirty = true;
                          }}
                >
                    <Card.Body>
                        <StepWizard
                            onStepChange={onStepChange}

                            transitions={wizardState.transitions} // comment out for default transitions
                            instance={setWizardInstance}
                            initialStep={1}
                            nav={<WizardFormNav titles={WizardTitles} />} >

                            <Row>
                                <Col xs="12">
                                    <Col xs={{span:12,offset:0}} md={{span:12,offset:0}} lg={{span:12,offset:0}} xl={{span:12,offset:0}}
                                    >
                                        <FormGroup required
                                                   name={'description[en][section]'}
                                                   label={'Section'}
                                                   $defaultValue={GetSelectedSection()}
                                                   wrapperCol={{xs:{span:12,offset:0},md:{span:12,offset:0},lg:{span:9,offset:0},xl:{span:8,offset:0}}}
                                                   labelCol={{xs:{span:12,offset:0},md:{span:12,offset:0},lg:{span:3,offset:0},xl:{span:2,offset:0}}} >
                                            <Select className={'select-2 '}
                                                    closeMenuOnSelect={!undefined}
                                                    isMulti={undefined}
                                                    options={description_en_section_Options} />
                                        </FormGroup>
                                    </Col>
                                    <Col
                                        xs={{span : 12 , offset : 0 }}
                                        md={{span : 12 , offset : 0 }}
                                        lg={{span : 12 , offset : 0 }}
                                        xl={{span : 12 , offset : 0 }}
                                        className={'mb-3'}
                                        style={{width: '100%'}}>
                                        <FormGroup required maxLength={250}
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
                                                   name={'url'}
                                                   label={'Url'}
                                                   $defaultValue={GameData.url}
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
                                        <FormGroup required maxLength={250}
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
                                                   name={'description[en][name]'}
                                                   label={'Name'}
                                                   $defaultValue={GameData.name}
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
                                        <FormGroup maxLength={250}
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
                                                   name={'description[en][game_type]'}
                                                   label={'Game Type'}
                                                   $defaultValue={GameData.game_type}
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
                                        <FormGroup maxLength={250}
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
                                                   name={'description[en][category]'}
                                                   label={'Category'}
                                                   $defaultValue={GameData.category}
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
                                    <Col xs={{span:12,offset:0}} md={{span:12,offset:0}} lg={{span:12,offset:0}} xl={{span:12,offset:0}}
                                    >
                                        <FormGroup required
                                                   max="3" min="1"
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
                                                   name={'description[en][devices][]'}
                                                   label={'Devices'}
                                                   $defaultValue={GetSelectedDevices()}
                                                   wrapperCol={{xs:{span:12,offset:0},md:{span:12,offset:0},lg:{span:9,offset:0},xl:{span:8,offset:0}}}
                                                   labelCol={{xs:{span:12,offset:0},md:{span:12,offset:0},lg:{span:3,offset:0},xl:{span:2,offset:0}}} >
                                            <Select

                                                className={'select-2 '}
                                                closeMenuOnSelect={!true}
                                                isMulti={true}
                                                options={description_en_devices_Options} />
                                        </FormGroup>
                                    </Col>
                                    <Col
                                        xs={{span : 12 , offset : 0 }}
                                        md={{span : 12 , offset : 0 }}
                                        lg={{span : 12 , offset : 0 }}
                                        xl={{span : 12 , offset : 0 }}
                                        className={'mb-3'}
                                        style={{width: '100%'}}>
                                        <FormGroup maxLength={250}
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
                                                   name={'description[en][tournaments]'}
                                                   label={'Tournaments'}
                                                   $defaultValue={GameData.tournaments}
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
                                        <FormGroup maxLength={250}
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
                                                   name={'description[en][additional]'}
                                                   label={'Additional'}
                                                   $defaultValue={GameData.additional}
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
                                    <Col xs={{span:12,offset:0}} md={{span:12,offset:0}} lg={{span:12,offset:0}} xl={{span:12,offset:0}}
                                    >
                                        <FormGroup
                                            max="3"
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
                                            name={'properties[]'}
                                            label={'Properties'}
                                            $defaultValue={GetSelectedProperties()}
                                            wrapperCol={{xs:{span:12,offset:0},md:{span:12,offset:0},lg:{span:9,offset:0},xl:{span:8,offset:0}}}
                                            labelCol={{xs:{span:12,offset:0},md:{span:12,offset:0},lg:{span:3,offset:0},xl:{span:2,offset:0}}} >
                                            <Select className={'select-2 '}
                                                    closeMenuOnSelect={!true}
                                                    isMulti={true}
                                                    options={propertiesOptions} />
                                        </FormGroup>
                                    </Col> <Col xs={{span:12,offset:0}} md={{span:12,offset:0}} lg={{span:12,offset:0}} xl={{span:12,offset:0}}
                                >
                                    <FormGroup
                                        max="3"
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
                                        name={'promo_tools[]'}
                                        label={'Promo Tools'}
                                        $defaultValue={GetSelectedPromoTools()}
                                        wrapperCol={{xs:{span:12,offset:0},md:{span:12,offset:0},lg:{span:9,offset:0},xl:{span:8,offset:0}}}
                                        labelCol={{xs:{span:12,offset:0},md:{span:12,offset:0},lg:{span:3,offset:0},xl:{span:2,offset:0}}} >
                                        <Select className={'select-2 '}
                                                closeMenuOnSelect={!true}
                                                isMulti={true}
                                                options={promoToolsOptions} />
                                    </FormGroup>
                                </Col> <Col xs={{span:12,offset:0}} md={{span:12,offset:0}} lg={{span:12,offset:0}} xl={{span:12,offset:0}}
                                >
                                    <FormGroup
                                        max="3"
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
                                        name={'engaging_and_social[]'}
                                        label={'Engaging&social'}
                                        $defaultValue={GetSelectedSocialEngaging()}
                                        wrapperCol={{xs:{span:12,offset:0},md:{span:12,offset:0},lg:{span:9,offset:0},xl:{span:8,offset:0}}}
                                        labelCol={{xs:{span:12,offset:0},md:{span:12,offset:0},lg:{span:3,offset:0},xl:{span:2,offset:0}}} >
                                        <Select className={'select-2'}
                                                closeMenuOnSelect={!true}
                                                isMulti={true}
                                                options={engagingAndSocialOptions} />
                                    </FormGroup>
                                </Col><Col
                                    xs={{span : 12 , offset : 0 }}
                                    md={{span : 12 , offset : 0 }}
                                    lg={{span : 12 , offset : 0 }}
                                    xl={{span : 12 , offset : 0 }}
                                    className={'mb-3'}
                                    style={{width: '100%'}}>
                                    <FormGroup  $ref={description_en_description_Ref} required
                                                name={'description[en][description]'}
                                                label={'Description'}
                                                $defaultValue={description_en_description_State}
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
                                            <SunEditor defaultValue={description_en_description_State} height={200} onChange={onDescription_en_description_Change} />
                                            <input value={description_en_description_State} type={'hidden'} name={'description[en][description]'}  />
                                        </FormControl>
                                    </FormGroup>
                                </Col>

                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12">
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
                                                <FormLabel>List Image</FormLabel>
                                            </Col>
                                            <Col
                                                xs={{span : 12 , offset : 0 }}
                                                md={{span : 12 , offset : 0 }}
                                                lg={{span : 10 , offset : 0 }}
                                                xl={{span : 10 , offset : 0 }}>
                                                <ImageUploading
                                                    multiple={undefined}
                                                    name={'fds'}
                                                    value={imageState.images}
                                                    onChange={onImageChange}
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
                                                            </Row>                                        </>
                                                    )}
                                                </ImageUploading>
                                            </Col>
                                        </Row>
                                        {imageState.images.valid &&
                                        <Row>
                                            <div class="has-error is-invalid">
                                                <div class="invalid-feedback">Error image: required</div>
                                            </div>
                                        </Row>
                                        }                    </Col><Col
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
                                            <FormLabel>Logo</FormLabel>
                                        </Col>
                                        <Col
                                            xs={{span : 12 , offset : 0 }}
                                            md={{span : 12 , offset : 0 }}
                                            lg={{span : 10 , offset : 0 }}
                                            xl={{span : 10 , offset : 0 }}>
                                            <ImageUploading
                                                multiple={undefined}
                                                name={'fds'}
                                                value={logoState.images}
                                                onChange={onLogoChange}
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
                                                        </Row>                                        </>
                                                )}
                                            </ImageUploading>
                                        </Col>
                                    </Row>
                                    {logoState.images.valid &&
                                    <Row>
                                        <div class="has-error is-invalid">
                                            <div class="invalid-feedback">Error image: required</div>
                                        </div>
                                    </Row>
                                    }                    </Col><Col
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
                                            <FormLabel>Device Image</FormLabel>
                                        </Col>
                                        <Col
                                            xs={{span : 12 , offset : 0 }}
                                            md={{span : 12 , offset : 0 }}
                                            lg={{span : 10 , offset : 0 }}
                                            xl={{span : 10 , offset : 0 }}>
                                            <ImageUploading
                                                multiple={undefined}
                                                name={'fds'}
                                                value={devicesImageState.images}
                                                onChange={onDevicesImageChange}
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
                                                        </Row>                                        </>
                                                )}
                                            </ImageUploading>
                                        </Col>
                                    </Row>
                                    {devicesImageState.images.valid &&
                                    <Row>
                                        <div class="has-error is-invalid">
                                            <div class="invalid-feedback">Error image: required</div>
                                        </div>
                                    </Row>
                                    }                    </Col><Col
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
                                            <FormLabel>Slider Images</FormLabel>
                                        </Col>
                                        <Col
                                            xs={{span : 12 , offset : 0 }}
                                            md={{span : 12 , offset : 0 }}
                                            lg={{span : 10 , offset : 0 }}
                                            xl={{span : 10 , offset : 0 }}>
                                            <ImageUploading
                                                multiple={true}
                                                name={'fds'}
                                                value={sliderImagesState.images}
                                                onChange={onSliderImagesChange}
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
                                                                <Col xs={12}>
                                                                    <Button
                                                                        className={'mb-3'}
                                                                        onClick={onImageUpload}
                                                                        variant="primary"
                                                                        {...dragProps}>
                                                                        Upload Image
                                                                    </Button>
                                                                </Col>

                                                                {imageList.map((image, index) => {
                                                                    return (
                                                                        <>
                                                                            <UploadImageRender multiple={true}  image={image} imageColData={{"xs":{"span":12,"offset":0},"md":{"span":12,"offset":0},"lg":{"span":6,"offset":0},"xl":{"span":5,"offset":0}}} index={index} onImageUpload={onImageUpdate} onImageRemove={onImageRemove}/>
                                                                        </>
                                                                    )
                                                                })}


                                                            </>
                                                        </Row>                                        </>
                                                )}
                                            </ImageUploading>
                                        </Col>
                                    </Row>
                                    {sliderImagesState.images.valid &&
                                    <Row>
                                        <div class="has-error is-invalid">
                                            <div class="invalid-feedback">Error image: required</div>
                                        </div>
                                    </Row>
                                    }                    </Col>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12">

                                    <Row>
                                        <Col
                                            xs={{span : 12 , offset : 0 }}
                                            md={{span : 12 , offset : 0 }}
                                            lg={{span : 12 , offset : 0 }}
                                            xl={{span : 12 , offset : 0 }}
                                            className={'mb-3'}
                                            style={{width: '100%'}}>
                                            <FormGroup
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
                                                name={'isTournamentsArea'}
                                                onChange={isTournamentsArea}
                                                label={'TournamentsArea'}
                                                wrapperCol={{
                                                    xs:{span : 12 , offset : 0 },
                                                    md :{span : 6 , offset : 0 },
                                                    lg:{span : 1 , offset : 0 },
                                                    xl:{span : 1 , offset : 0 },
                                                }}
                                                labelCol={{
                                                    xs:{span : 12 , offset : 0 },
                                                    md :{span : 6 , offset : 0 },
                                                    lg:{span : 3 , offset : 3 },
                                                    xl:{span : 3 , offset : 3 },
                                                }}>
                                                <FormControl type={'checkbox'} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    {hasTournamentsArea &&
                                    <Row>


                                        <Col
                                            xs={{span : 12 , offset : 0 }}
                                            md={{span : 12 , offset : 0 }}
                                            lg={{span : 12 , offset : 0 }}
                                            xl={{span : 12 , offset : 0 }}
                                            className={'mb-3'}
                                            style={{width: '100%'}}>
                                            <FormGroup
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
                                                name={'TournamentsArea[en][title]'}
                                                label={'Title'}
                                                $defaultValue={()=>{
                                                if(GameData.TournamentsArea != null){
                                                    return GameData.TournamentsArea.title
                                                }
                                                }}
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
                                            className={`mb-2 `}>
                                            <Row>
                                                <Col
                                                    xs={{span : 12 , offset : 0 }}
                                                    md={{span : 12 , offset : 0 }}
                                                    lg={{span : 3 , offset : 0 }}
                                                    xl={{span : 2 , offset : 0 }}>
                                                    <FormLabel>Image</FormLabel>
                                                </Col>
                                                <Col
                                                    xs={{span : 12 , offset : 0 }}
                                                    md={{span : 12 , offset : 0 }}
                                                    lg={{span : 10 , offset : 0 }}
                                                    xl={{span : 10 , offset : 0 }}>
                                                    <ImageUploading
                                                        multiple={undefined}
                                                        name={'fds'}
                                                        value={TournamentsArea_image_State.images}
                                                        onChange={onTournamentsArea_image_Change}
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
                                                                </Row>                                        </>
                                                        )}
                                                    </ImageUploading>
                                                </Col>
                                            </Row>
                                            {TournamentsArea_image_State.images.valid &&
                                            <Row>
                                                <div class="has-error is-invalid">
                                                    <div class="invalid-feedback">Error image: required</div>
                                                </div>
                                            </Row>
                                            }                    </Col>
                                        <Col
                                            xs={{span : 12 , offset : 0 }}
                                            md={{span : 12 , offset : 0 }}
                                            lg={{span : 12 , offset : 0 }}
                                            xl={{span : 12 , offset : 0 }}
                                            className={'mb-3'}
                                            style={{width: '100%'}}>
                                            <FormGroup
                                                required
                                                max={12}
                                                name={'TournamentsArea[image_col]'}
                                                label={'Col'}
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
                                                <FormControl type={'number'} />
                                            </FormGroup>
                                        </Col>
                                        <Col
                                            xs={{span : 12 , offset : 0 }}
                                            md={{span : 12 , offset : 0 }}
                                            lg={{span : 12 , offset : 0 }}
                                            xl={{span : 12 , offset : 0 }}
                                            className={'mb-3'}
                                            style={{width: '100%'}}>
                                            <FormGroup  $ref={TournamentsArea_en_description_Ref}
                                                        name={'TournamentsArea[en][description]'}
                                                        label={'Description'}
                                                        wrapperCol={{
                                                            xs:{span : 12 , offset : 0 },
                                                            md :{span : 12 , offset : 0 },
                                                            lg:{span : 9 , offset : 0 },
                                                            xl:{span : 10 , offset : 0 },
                                                        }}
                                                        $defaultValue={()=>{
                                                            if(GameData.TournamentsArea != null){
                                                                return GameData.TournamentsArea.description
                                                            }
                                                        }}
                                                        labelCol={{
                                                            xs:{span : 12 , offset : 0 },
                                                            md :{span : 12 , offset : 0 },
                                                            lg:{span : 3 , offset : 0 },
                                                            xl:{span : 2 , offset : 0 },
                                                        }}>
                                                <FormControl  custom={true} as={"div"} className={'b-0 h-fit-content'}>
                                                    <SunEditor defaultValue={()=>{
                                                        if(GameData.TournamentsArea != null){
                                                            return GameData.TournamentsArea.description
                                                        }
                                                    }} height={200} onChange={onTournamentsArea_en_description_Change} />
                                                    <input value={tournamentsArea_en_description_State} type={'hidden'} name={'TournamentsArea[en][description]'}  />
                                                </FormControl>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    }
                                    <hr/>
                                    <Row>
                                        <Col
                                            xs={{span : 12 , offset : 0 }}
                                            md={{span : 12 , offset : 0 }}
                                            lg={{span : 12 , offset : 0 }}
                                            xl={{span : 12 , offset : 0 }}
                                            className={'mb-3'}
                                            style={{width: '100%'}}>
                                            <FormGroup
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
                                                name={'isSpinsArea'}
                                                onChange={isSpinsArea}
                                                label={'SpinsArea'}
                                                wrapperCol={{
                                                    xs:{span : 12 , offset : 0 },
                                                    md :{span : 6 , offset : 0 },
                                                    lg:{span : 1 , offset : 0 },
                                                    xl:{span : 1 , offset : 0 },
                                                }}
                                                labelCol={{
                                                    xs:{span : 12 , offset : 0 },
                                                    md :{span : 6 , offset : 0 },
                                                    lg:{span : 3 , offset : 3 },
                                                    xl:{span : 3 , offset : 3 },
                                                }}>
                                                <FormControl type={'checkbox'} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    {hasSpinsAre &&
                                    <Row>
                                        <Col
                                            xs={{span: 12, offset: 0}}
                                            md={{span: 12, offset: 0}}
                                            lg={{span: 12, offset: 0}}
                                            xl={{span: 12, offset: 0}}
                                            className={'mb-3'}
                                            style={{width: '100%'}}>
                                            <FormGroup
                                                $validators={{
                                                    isEmail: (value) => {
                                                        return ValidationsClass.isEmail(value, "Email not Valid")
                                                    },
                                                    isNumber: (value) => {
                                                        return ValidationsClass.isNumber(value, "Not Number")
                                                    },
                                                    isFloat: (value) => {
                                                        return ValidationsClass.isFloat(value, "Not Float")
                                                    },
                                                }}
                                                name={'SpinsArea[en][title]'}
                                                label={'Title'}
                                                wrapperCol={{
                                                    xs: {span: 12, offset: 0},
                                                    md: {span: 12, offset: 0},
                                                    lg: {span: 9, offset: 0},
                                                    xl: {span: 8, offset: 0},
                                                }}
                                                labelCol={{
                                                    xs: {span: 12, offset: 0},
                                                    md: {span: 12, offset: 0},
                                                    lg: {span: 3, offset: 0},
                                                    xl: {span: 2, offset: 0},
                                                }}>
                                                <FormControl type={'text'}/>
                                            </FormGroup>
                                        </Col>
                                        <Col
                                            xs={{span: 12, offset: 0}}
                                            md={{span: 12, offset: 0}}
                                            lg={{span: 12, offset: 0}}
                                            xl={{span: 12, offset: 0}}
                                            className={`mb-2 `}>
                                            <Row>
                                                <Col
                                                    xs={{span: 12, offset: 0}}
                                                    md={{span: 12, offset: 0}}
                                                    lg={{span: 3, offset: 0}}
                                                    xl={{span: 2, offset: 0}}>
                                                    <FormLabel>Image</FormLabel>
                                                </Col>
                                                <Col
                                                    xs={{span: 12, offset: 0}}
                                                    md={{span: 12, offset: 0}}
                                                    lg={{span: 10, offset: 0}}
                                                    xl={{span: 10, offset: 0}}>
                                                    <ImageUploading
                                                        multiple={undefined}
                                                        name={'fds'}
                                                        value={SpinsArea_image_State.images}
                                                        onChange={onSpinsArea_image_Change}
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
                                                                                    <UploadImageRender
                                                                                        multiple={undefined}
                                                                                        image={image} imageColData={{
                                                                                        "xs": {
                                                                                            "span": 12,
                                                                                            "offset": 0
                                                                                        },
                                                                                        "md": {"span": 12, "offset": 0},
                                                                                        "lg": {"span": 6, "offset": 0},
                                                                                        "xl": {"span": 5, "offset": 0}
                                                                                    }} index={index}
                                                                                        onImageUpload={onImageUpdate}
                                                                                        onImageRemove={onImageRemove}/>
                                                                                </>
                                                                            )
                                                                        })}
                                                                        {(imageList.length < 1) &&
                                                                        <UploadImageRender multiple={undefined}
                                                                                           image={null} imageColData={{
                                                                            "xs": {
                                                                                "span": 12,
                                                                                "offset": 0
                                                                            },
                                                                            "md": {"span": 12, "offset": 0},
                                                                            "lg": {"span": 6, "offset": 0},
                                                                            "xl": {"span": 5, "offset": 0}
                                                                        }} index={0} onImageUpload={onImageUpload}
                                                                                           onImageRemove={onImageRemove}/>
                                                                        }

                                                                    </>
                                                                </Row>                                        </>
                                                        )}
                                                    </ImageUploading>
                                                </Col>
                                            </Row>
                                            {SpinsArea_image_State.images.valid &&
                                            <Row>
                                                <div class="has-error is-invalid">
                                                    <div class="invalid-feedback">Error image: required</div>
                                                </div>
                                            </Row>
                                            }                    </Col>
                                        <Col
                                            xs={{span: 12, offset: 0}}
                                            md={{span: 12, offset: 0}}
                                            lg={{span: 12, offset: 0}}
                                            xl={{span: 12, offset: 0}}
                                            className={'mb-3'}
                                            style={{width: '100%'}}>
                                            <FormGroup
                                                required
                                                max={12}
                                                name={'SpinsArea[image_col]'}
                                                label={'Col'}
                                                wrapperCol={{
                                                    xs: {span: 12, offset: 0},
                                                    md: {span: 12, offset: 0},
                                                    lg: {span: 9, offset: 0},
                                                    xl: {span: 8, offset: 0},
                                                }}
                                                labelCol={{
                                                    xs: {span: 12, offset: 0},
                                                    md: {span: 12, offset: 0},
                                                    lg: {span: 3, offset: 0},
                                                    xl: {span: 2, offset: 0},
                                                }}>
                                                <FormControl type={'number'}/>
                                            </FormGroup>
                                        </Col>
                                        <Col
                                            xs={{span: 12, offset: 0}}
                                            md={{span: 12, offset: 0}}
                                            lg={{span: 12, offset: 0}}
                                            xl={{span: 12, offset: 0}}
                                            className={'mb-3'}
                                            style={{width: '100%'}}>
                                            <FormGroup $ref={SpinsArea_en_description_Ref}
                                                       name={'SpinsArea[en][description]'}
                                                       label={'Description'}
                                                       wrapperCol={{
                                                           xs: {span: 12, offset: 0},
                                                           md: {span: 12, offset: 0},
                                                           lg: {span: 9, offset: 0},
                                                           xl: {span: 10, offset: 0},
                                                       }}
                                                       labelCol={{
                                                           xs: {span: 12, offset: 0},
                                                           md: {span: 12, offset: 0},
                                                           lg: {span: 3, offset: 0},
                                                           xl: {span: 2, offset: 0},
                                                       }}>
                                                <FormControl custom={true} as={"div"} className={'b-0 h-fit-content'}>
                                                    <SunEditor height={200}
                                                               onChange={onSpinsArea_en_description_Change}/>
                                                    <input value={spinsArea_en_description_State} type={'hidden'} name={'SpinsArea[en][description]'}  />


                                                </FormControl>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    }

                                </Col>
                            </Row>

                        </StepWizard>
                    </Card.Body>
                    <Card.Footer className={'d-flex justify-content-between border-top mt-5 pt-10'}>
                        <Button onClick={previousStep} className={'font-weight-bolder text-uppercase px-9 py-2'}  variant="light outline-secondary">back</Button>
                        <Button type={'submit'} className={'font-weight-bolder text-uppercase px-9 py-2'}  variant="primary">Next</Button>
                    </Card.Footer>

                </UtilForm>
            </BootstrapForm>
        </Card>
    </>)
}



export async function getServerSideProps({res, params}){
    let Error = false;
    let GameDataUrl = GetApiUrl("games/"+params.id);
    let GameData = null
    await axios.get(GameDataUrl, {headers: {'Content-Type': 'multipart/form-data'}
    }).then(res => { // then print response status

        if(!res.data.success){
            Error = true;
        }
        GameData = res.data.data
    }).catch(error => {

        Error = true;
    });

    let SocialEngagingUrl = GetApiUrl("engaging-social");
    let SocialEngagingOptions = []
    await axios.get(SocialEngagingUrl, {headers: {'Content-Type': 'multipart/form-data'}
    }).then(res => { // then print response status
        if(!res.data.success){
            Error = true;
        }
        res.data.data.forEach(function(obj) {
            SocialEngagingOptions.push({ value: obj.id, label: obj.title });
        });
    }).catch(error => {
        Error = true;
    });



    let PromoToolsUrl = GetApiUrl("promo-tools");
    let PromoToolsOptions = []
    await axios.get(PromoToolsUrl, {headers: {'Content-Type': 'multipart/form-data'}
    }).then(res => { // then print response status
        if(!res.data.success){
            Error = true;
        }
        res.data.data.forEach(function(obj) {
            PromoToolsOptions.push({ value: obj.id, label: obj.title });
        });
    }).catch(error => {
        Error = true;
    });

    let GamePropertiesUrl = GetApiUrl("game-properties");
    let GamePropertiesOptions = []
    await axios.get(GamePropertiesUrl, {headers: {'Content-Type': 'multipart/form-data'}
    }).then(res => { // then print response status
        if(!res.data.success){
            Error = true;
        }
        res.data.data.forEach(function(obj) {
            GamePropertiesOptions.push({ value: obj.id, label: obj.title });
        });
    }).catch(error => {
        Error = true;
    });

    if(Error){
        res.setHeader("location", "/");
        res.statusCode = 302;
        res.end();
    }


    return{
        props:{
            GameData,
            SocialEngagingOptions,
            PromoToolsOptions,
            GamePropertiesOptions
        }
    }
}