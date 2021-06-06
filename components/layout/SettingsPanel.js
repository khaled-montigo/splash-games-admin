import { useEditor } from '@craftjs/core';
import {Row,Button} from "react-bootstrap";
import React from 'react';
import {useSelector} from "react-redux";
import {RemoveFromCodeFunctions} from '../../reducers/CodeFunctions/actionCreator'
import {RemoveFromUploadImagesValidation} from '../../reducers/UploadImagesValidation/actionCreator'

export const SettingsPanel = () => {
    const { actions, selected } = useEditor((state, query) => {
        const currentNodeId = state.events.selected;
        let selected;

        if (currentNodeId) {
            selected = {
                id: currentNodeId,
                name: state.nodes[currentNodeId].data.name,
                settings:
                    state.nodes[currentNodeId].related &&
                    state.nodes[currentNodeId].related.settings,
                isDeletable: query.node(currentNodeId).isDeletable(),
            };
        }

        return {
            selected,
        };
    });


    const { Code, FunctionsData, UploadImagesValidations } = useSelector(state => {
        return {
            Code: state.IsCoding,
            FunctionsData: state.CodeFunctions,
            UploadImagesValidations : state.UploadImagesValidation,
        };
    });

    return selected ? (
        <>
            <div className={'custom-scrollbar'}>
                <div className={'custom-scrollbar-frame'}>
                    {selected.settings && React.createElement(selected.settings)}
                    {selected.isDeletable ? (
                        <Row className={' justify-content-center mt-2'}>
                            <Button variant="danger"
                                    onClick={() => {
                                        RemoveFromCodeFunctions(FunctionsData, selected.id)
                                        RemoveFromUploadImagesValidation(UploadImagesValidations, selected.id)
                                        actions.delete(selected.id);
                                    }}>
                                Delete
                            </Button>
                        </Row>
                    ) : null}
                </div>
            </div>
        </>
    ) : null;
};