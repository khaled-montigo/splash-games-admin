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
import {WizardEditorContainer} from "./WizardEditorContainer";

export const TestEditorContainer = ({children }) => {

    const {
        connectors: { connect, drag },
    } = useNode();
    const { Coding} = useSelector(state => {
        return {
            Coding: state.IsCoding,
        };
    });


    const [formTotalStepState, setFormTotalStepState] = useState(5);

    const [renderItemsState, setRenderItemsState] = useState([]);


    const changeWizardSteps = (val) =>{
        const renderItems = []
        Array.from({length: 10}, (_, i) => {
            i = i + 1;
        })
        {Array.from(Array(val), (e, i) => {
            console.log(val);
            renderItems.push(<><Col xs={12}><Element canvas id={`FormStep${i}`}  is={EditorContainer}></Element></Col></>)
        })}
        // setRenderItemsState(renderItems);

        console.log(renderItems)

    }

    useEffect(() => {

    },[formTotalStepState])

    return (
        <Row
            ref={(ref) => connect(drag(ref))}
            className={'pt-5 pd-5'}
        >
          <Col xs={12}>
              <span >
                  <input type={'number'} value={formTotalStepState} onChange={(e)=> {changeWizardSteps(e.target.value)}}/>
              </span>
          </Col>
            <Col xs={12}>
                <WizardEditorContainer  StepsRender={renderItemsState} StepsNumber={formTotalStepState}>

                </WizardEditorContainer>
            </Col>
        </Row>
    );
};

export const TestEditorContainerSettings = () => {
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

export const TestEditorContainerDefaultProps = {};

TestEditorContainer.craft = {
    props: TestEditorContainerDefaultProps,
    related: {
        settings: TestEditorContainerSettings,
    },
};