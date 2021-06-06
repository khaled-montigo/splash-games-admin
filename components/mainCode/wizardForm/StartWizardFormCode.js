import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

const StartWizardFormCode = ({ClassName, Functions}) => {
    const dispatch = useDispatch();
    const {Coding, FormFunctions, ImagesValidations} = useSelector(state => {
        return {
            Coding: state.IsCoding,
            FormFunctions: state.CodeFunctions,
            ImagesValidations: state.UploadImagesValidation,
        };
    });

    const FunctionsRender = () => {
        let FunctionsList = "";
        for (const key in FormFunctions) {
            FunctionsList = FunctionsList + FormFunctions[key] + "\n";
        }
        return FunctionsList;
    }

    const ImagesValidationRender = () => {
        let ValidationsList = [];
        for (const key in ImagesValidations) {
            if (ImagesValidations[key].required) {
                ValidationsList.push(ImagesValidations[key].lowerName + "State")
            }
        }
        return "const ImagesValidations = [" + ValidationsList + "]";
    }


    return (<> {!Coding ? "" : `
import React from "react";
import {FormGroup, Form as UtilForm} from 'react-bootstrap-formutil';
import {Container, Row, Col , Card, FormControl, Form as BootstrapForm, Button, FormLabel} from 'react-bootstrap';
import ImageUploading from 'react-images-uploading';
import SunEditor from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css';
import ValidationsClass from  '/utility/Validations'
import StepWizard from "react-step-wizard";
import transitions from "/styles/transitions.module.css";
const ${ClassName} = () => {    
  
    let submitValid = false;
    let $formutil = React.createRef();
    const [formCurrentStepState, setFormCurrentStepState] = useState(1)
    const [wizardState, setWizardState] = useState({
        form: {},
        transitions: {
            enterRight: `+'`${transitions.animated} ${transitions.enterRight}`'+`,
            enterLeft: `+'`${transitions.animated} ${transitions.enterLeft}`'+`,
            exitRight: `+'`${transitions.animated} ${transitions.exitRight}`'+`,
            exitLeft: `+'`${transitions.animated} ${transitions.exitLeft}`'+`,
            intro: `+'`${transitions.animated} ${transitions.intro}`'+`,
        },
        // demo: true, // uncomment to see more
    });
    const {wizardStateSW, wizardStateDemo} = wizardState;
    const setWizardInstance = wizardStateSW => setWizardState({
        ...wizardState,
        wizardStateSW,
    });
    
    
    ${FunctionsRender()}
   
    
    const OnImagesValidation = () => {
    let IsValid = true;
     ${ImagesValidationRender()}
    ImagesValidations.forEach(element => {
    if(element.images.length < 1 ) {
    IsValid = false;
    }});
        return IsValid;
    }
    
    
    
    const previousStep = () => {
        wizardStateSW.previousStep();
    }
    const nextStep = () => {
        wizardStateSW.nextStep();
    }
    const onStepChange = (stats) => {
        console.log(stats.activeStep);
    };
    
     const OnFormSubmit = (e) => {
        console.log("OnFormSubmit");
        e.preventDefault();
        submitValid  = true;
        const { $invalid, $batchDirty, $weakErrors } = $formutil.current;
        if ($invalid) {
            console.log("OnFormSubmit $invalid");
            $batchDirty(true);
            return;
        }
        if(!OnImagesValidation()){
            console.log("OnFormSubmit OnImagesValidation");
            return;
        }
        /* Submit Function */
    };
    
        return ( <>
        <Card className={'custom-card mt-3'}>
         <BootstrapForm onSubmit={OnFormSubmit}>
        <UtilForm $ref={$formutil}
            $processer={($state) => {
                $state.$dirty = true;
            }}
        >
        <Card.Body>
         <StepWizard
            onStepChange={onStepChange}
            isHashEnabled
            transitions={wizardState.transitions} // comment out for default transitions
            instance={setWizardInstance}>
    `} </>);
};

export default StartWizardFormCode;
