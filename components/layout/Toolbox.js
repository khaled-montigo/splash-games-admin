import { useEditor, Element } from '@craftjs/core';
import React from 'react';
import {Row, ButtonToolbar, Button, Col} from 'react-bootstrap'

import { TextInput } from '../formComponents/TextInput/TextInput'
import { TextAreaInput } from '../formComponents/TextArea/TextAreaInput'
import { FileInput } from '../formComponents/FileInput/FileInput'
import { ImageUpload } from '../formComponents/ImageUpload/ImageUpload'
import { SelectInput } from '../formComponents/SelectInput/SelectInput'
import { ToggleButtons } from '../formComponents/ToggleButtonGroup/ToggleButtons'
import { CheckboxInput } from '../formComponents/CheckBoxInput/CheckboxInput'

export const Toolbox = () => {
    const { connectors } = useEditor();

    return (
       <Row>
           <Col xs={12}>
               <ButtonToolbar>
                   <span className="pr-4">
                       <Button className={'mb-2'} variant="outline-primary" ref={(ref) => connectors.create(ref, <TextInput  />)}>TextInput</Button>
                   </span>
                   <span className="pr-4">
                       <Button className={'mb-2'} variant="outline-primary" ref={(ref) => connectors.create(ref, <FileInput  />)}>File Input</Button>
                   </span>
                   <span className="pr-4">
                       <Button className={'mb-2'} variant="outline-primary" ref={(ref) => connectors.create(ref, <ImageUpload  />)}>ImageUpload</Button>
                   </span>
                   <span className="pr-4">
                       <Button className={'mb-2'} variant="outline-primary" ref={(ref) => connectors.create(ref, <SelectInput  />)}>SelectInput</Button>
                   </span>
                   <span className="pr-4">
                       <Button className={'mb-2'} variant="outline-primary" ref={(ref) => connectors.create(ref, <CheckboxInput  />)}>Checkbox</Button>
                   </span>
                   <span className="pr-4">
                       <Button className={'mb-2'} variant="outline-primary" ref={(ref) => connectors.create(ref, <TextAreaInput  />)}>TextArea</Button>
                   </span>
               </ButtonToolbar>
           </Col>



       </Row>

    );
};