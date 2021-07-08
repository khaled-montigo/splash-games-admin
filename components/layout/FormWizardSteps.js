import {Element, Frame, useNode} from '@craftjs/core';
import {Row, Col, Form as BootstrapForm, Card, Button} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import StepWizard from "react-step-wizard";
import transitions from "../../styles/transitions.module.css";
import WizardFormNav from "./WizardFormNav";
import {EditorContainer} from "./EditorContainer";
import {WizardStep} from "./WizardStep";


export const FormWizardSteps = () => {

    const {
        connectors: { connect, drag },
    } = useNode();
    const { Coding} = useSelector(state => {
        return {
            Coding: state.IsCoding,
        };
    });


    const [formCurrentStepState, setFormCurrentStepState] = useState(1)
    const [formTotalStepState, setFormTotalStepState] = useState(3)
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
    const WizardTitles = [{
        title : "Step 1", icon : 'RiProfileLine'
    }]

    const setWizardInstance = (wizardStateSW) => {
        let ActiveStep = 0
        if(wizardStateSW.state.activeStep <= 0){
            ActiveStep = 1;
        }else{
            ActiveStep = wizardStateSW.state.activeStep;
        }
        setFormCurrentStepState(ActiveStep);
        setWizardState({
            ...wizardState,
            wizardStateSW,
        })
    };

    const previousStep = () => {
        wizardStateSW.previousStep();
    }
    const nextStep = () => {
        wizardStateSW.nextStep();
    }
    const onStepChange = (stats) => {
        setFormCurrentStepState(stats.activeStep);

    };






    const submit = (e) => {
        e.preventDefault();
    };



    return (
        <EditorContainer >
            <Card.Header  className={'d-flex justify-content-between'}>
                <span>Step {formCurrentStepState}</span>
                <span>
                    <input type={'number'} value={formTotalStepState} onChange={(e)=> {setFormTotalStepState(e.target.value)}}/>
                </span>
            </Card.Header>
            <StepWizard
                onStepChange={onStepChange}
                isHashEnabled
                transitions={wizardState.transitions} // comment out for default transitions
                instance={setWizardInstance}
                nav={<WizardFormNav titles={WizardTitles} />}
            >
                {Array.from({length: formTotalStepState}, (_, i) => {
                    return (
                        <div >
                            <Element canvas id={`formStep${i}`} is={EditorContainer}>

                            </Element>
                        </div>
                    )
                })}

            </StepWizard>
            <Card.Footer className={'d-flex justify-content-between border-top mt-5 pt-10'}>
                <Button onClick={previousStep} className={'font-weight-bolder text-uppercase px-9 py-2'}  variant="light outline-secondary">back</Button>
                <Button onClick={nextStep} className={'font-weight-bolder text-uppercase px-9 py-2'}  variant="primary">Next</Button>

            </Card.Footer>
        </EditorContainer>
    );
};


export const FormWizardStepsDefaultProps = {};

FormWizardSteps.craft = {
    props: FormWizardStepsDefaultProps,
};