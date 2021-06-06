import { useNode } from '@craftjs/core';
import {Row,Col} from 'react-bootstrap';
import React from 'react';
import {useSelector} from "react-redux";

export const EditorContainer = ({children }) => {
    const {
        connectors: { connect, drag },
    } = useNode();
    const { Coding, FormFunctions, ImagesValidations } = useSelector(state => {
        return {
            Coding: state.IsCoding,
        };
    });


    return (
        <Row
            ref={(ref) => connect(drag(ref))}
            className={'pt-5 pd-5'}
        >
          <Col xs={12}>
              {children}
          </Col>
        </Row>
    );
};

export const EditorContainerSettings = () => {
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

export const EditorContainerDefaultProps = {};

EditorContainer.craft = {
    props: EditorContainerDefaultProps,
    related: {
        settings: EditorContainerSettings,
    },
};