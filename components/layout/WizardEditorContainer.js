import {Element, Frame, useNode} from '@craftjs/core';
import {Row, Col, Form as BootstrapForm, Card, Button} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import StepWizard from "react-step-wizard";
import transitions from "../../styles/transitions.module.css";
import {EditorContainer} from "./EditorContainer";
import {Form as UtilForm} from "react-formutil";
import StartWizardFormCode from "../mainCode/wizardForm/StartWizardFormCode";
import EndWizardFormCode from "../mainCode/wizardForm/EndWizardFormCode";
import WizardFormNav from "./WizardFormNav";


export const WizardEditorContainer = () => {

    const {
        connectors: { connect, drag },
    } = useNode();
    const { Coding} = useSelector(state => {
        return {
            Coding: state.IsCoding,
        };
    });

    let $formutil = React.createRef();

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
        console.log(wizardState);
        console.log(wizardStateSW);
        wizardStateSW.nextStep();
    }
    const onStepChange = (stats) => {
        setFormCurrentStepState(stats.activeStep);

    };






    const submit = (e) => {
        e.preventDefault();
    };



    return (
        <Row
            ref={(ref) => connect(drag(ref))}
            className={'pt-5 pd-5'}
        >
          <Col xs={12}>

              <BootstrapForm onSubmit={submit}>
                  <UtilForm
                      $ref={$formutil}
                      $processer={($state) => {$state.$dirty = true;}}>
                      <Card className={`custom-card mt-3 ${Coding && 'ShowAllFormSteps'}`}>
                          <Card.Header  className={'d-flex justify-content-between'}>
                             <span >
                                  Step {formCurrentStepState}
                             </span>
                              <span >
                                 <input type={'number'} value={formTotalStepState} onChange={(e)=> {setFormTotalStepState(e.target.value)}}/>
                             </span>
                          </Card.Header>
                          <Card.Body>
                              <pre className={'pre-overflow'}>
                                  <code>
                                      <StartWizardFormCode ClassName={"Test"} Functions={null}/>

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
                                              <Element canvas id={`FormStep${i}`}  is={EditorContainer}>


                                              </Element>
                                          </div>
                                      )
                                  })}

                              </StepWizard>
                                          <EndWizardFormCode ClassName={"Test"}/>

                                    </code>
                                </pre>

                          </Card.Body>
                          <Card.Footer className={'d-flex justify-content-between border-top mt-5 pt-10'}>
                              <Button onClick={previousStep} className={'font-weight-bolder text-uppercase px-9 py-2'}  variant="light outline-secondary">back</Button>
                              <Button onClick={nextStep} className={'font-weight-bolder text-uppercase px-9 py-2'}  variant="primary">Next</Button>

                          </Card.Footer>

                      </Card>

                  </UtilForm>
              </BootstrapForm>



          </Col>
        </Row>
    );
};

export const ContainerSettings = () => {
    const {
        actions: { setProp },
    } = useNode((node) => ({
        background: node.data.props.background,
        padding: node.data.props.padding,
    }));

    return (
        <div>

        </div>
    );
};

export const ContainerDefaultProps = {};

WizardEditorContainer.craft = {
    props: ContainerDefaultProps,
    related: {
        settings: ContainerSettings,
    },
};