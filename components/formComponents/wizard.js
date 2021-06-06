import React, { Fragment, useState, useEffect } from 'react';
import StepWizard from 'react-step-wizard';
import styles from '../../styles/wizard.module.css';
import transitions from '../../styles/transitions.module.css';
import {Element} from "@craftjs/core";
import {EditorContainer} from "../layout/EditorContainer";

const Wizard = () => {
    console.log(transitions);
    const totalSteps = 3;
    const [state, updateState] = useState({
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
    const { SW, demo } = state;
    const setInstance = SW => updateState({
        ...state,
        SW,
    });

    const [formStepState, setFormStepState ]= useState(1)

    // Do something on step change
    const onStepChange = (stats) => {
        console.log(stats.activeStep);
    };



    const previousStep = () => {
        SW.nextStep();
    }
    const nextStep = () =>{
        SW.nextStep();
    }



    return (
        <div className='container'>
            <h3>React Step Wizard</h3>
            <div className={'jumbotron'}>
                <div className='row'>
                    <div className={`col-12 col-sm-6 offset-sm-3 ${styles['rsw-wrapper']}`}>
                        <StepWizard
                            onStepChange={onStepChange}
                            isHashEnabled
                            transitions={state.transitions} // comment out for default transitions
                            nav={<Nav/>}
                            instance={setInstance}
                        >
                            {Array.from(Array(totalSteps), (e, i) => {
                                return (
                                    <Element canvas id={`formStep${i}`} is={EditorContainer}>

                                    </Element>
                                )
                            })}


                        </StepWizard>
                        <div>
                            <hr />
                            { formStepState > 1 &&
                            <button className='btn btn-default btn-block' onClick={previousStep}>Go Back</button>
                            }
                            { formStepState < totalSteps ?
                                <button className='btn btn-primary btn-block' onClick={nextStep}>Continue</button>
                                :
                                <button className='btn btn-success btn-block' onClick={nextStep}>Finish</button>
                            }

                        </div>
                    </div>
                </div>
            </div>
            { (demo && SW) && <InstanceDemo SW={SW} /> }
        </div>
    );
};

export default Wizard;

const InstanceDemo = ({ SW }) => (
    <Fragment>
        <h4>Control from outside component</h4>
        <button className={'btn btn-secondary'} onClick={SW.previousStep}>Previous Step</button>
        &nbsp;
        <button className={'btn btn-secondary'} onClick={SW.nextStep}>Next Step</button>
    </Fragment>
);

