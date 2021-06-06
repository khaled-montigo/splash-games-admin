import { Element, useNode } from '@craftjs/core';
import React from 'react';

export const WizardStep = ({ children }) => {
    const {
        connectors: { connect },
    } = useNode();
    return (
        <div
            ref={connect}
            className="row"
            style={{
                paddingTop: '50px',
            }} >
            {children}
        </div>
    );
};
export const WizardStepDefaultProps = {};
WizardStep.craft = {
    props: WizardStepDefaultProps,
};