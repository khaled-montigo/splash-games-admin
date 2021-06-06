import {useNode} from "@craftjs/core";
import {Container, Row, Col,FormControl, InputGroup, Form, Accordion, Card, Button} from "react-bootstrap";
import React from "react";

export const CheckboxInputSettings = () => {
    const {
        actions: { setProp },
        props,
    } = useNode((node) => ({
        props: node.data.props,
    }));

    const ChangeDivColVal = (e, Size, Type) => {
        if(e.target.value < 0 || e.target.value > 12){
            if(e.target.value < 0){
                setProp((props) => (props.divCol[Size][Type] = ''), 12)
            }
            e.preventDefault();
            return
        }
        setProp((props) => (props.divCol[Size][Type] = e.target.value), 12)
    }

    const ChangeWrapperColVal = (e, Size, Type) => {
        if(e.target.value < 0 || e.target.value > 12){
            if(e.target.value < 0){
                setProp((props) => (props.wrapperCol[Size][Type] = ''), 12)
            }
            e.preventDefault();
            return
        }
        setProp((props) => (props.wrapperCol[Size][Type] = e.target.value), 12)
    }

    const ChangeLabelColVal = (e, Size, Type) => {
        if(e.target.value < 0 || e.target.value > 12){
            if(e.target.value < 0){
                setProp((props) => (props.labelCol[Size][Type] = ''), 12)
            }
            e.preventDefault();
            return
        }
        setProp((props) => (props.labelCol[Size][Type] = e.target.value), 12)
    }


    const ChangeValidationData = (Type, value) => {
        if(!value){
            setProp((props) => ( delete props.validation[Type]), 12);
            return;
        }
        setProp((props) => (props.validation[Type] = value), 12);
    }

    const ChangeIsTypeValidationData = (Type, value) => {
        const IsTypes = ['isEmail', 'isNumber', 'isFloat', 'isString'];
        IsTypes.map((TypeValue, i) => {
            if(props.validation[TypeValue]){
                setProp((props) => ( delete props.validation[TypeValue]), 12);
            }
        });
        ChangeValidationData(Type, value);
    }






    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <Accordion defaultActiveKey={'main_info'}>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="main_info">
                                    Main Info
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="main_info">
                                <Card.Body>
                                    <Col xs={12}>
                                        <Form.Group controlId="InputLabel">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="field name"
                                                value={props.name}
                                                onChange={(e) => {
                                                    setProp((props) => (props.name = e.target.value), 12)
                                                }}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12}>
                                        <Form.Group controlId="InputLabel">
                                            <Form.Label>Label</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="label"
                                                value={(props.label == '$Label' ? '' : props.label)}
                                                onChange={(e) => {
                                                    if(!e.target.value){
                                                        setProp((props) => (props.label = '$Label'), 12)
                                                        e.preventDefault()
                                                        return;
                                                    }
                                                    setProp((props) => (props.label = e.target.value), 12)
                                                }}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="div_col">
                                   Area Size
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="div_col">
                                <Card.Body>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>xs</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl type={'number'}
                                                     value={props.divCol.xs.span}
                                                     onChange={(e) => {
                                                         ChangeDivColVal(e,'xs','span')
                                                     }}
                                        />
                                        <FormControl type={'number'}
                                                     value={props.divCol.xs.offset}
                                                     onChange={(e) => {
                                                         ChangeDivColVal(e,'xs','offset')
                                                     }}

                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>md</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl type={'number'}
                                                     value={props.divCol.md.span}
                                                     onChange={(e) => {
                                                         ChangeDivColVal(e,'md','span')
                                                     }}
                                        />
                                        <FormControl type={'number'}
                                                     value={props.divCol.md.offset}
                                                     onChange={(e) => {
                                                         ChangeDivColVal(e,'md','offset')
                                                     }}

                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>lg</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl type={'number'}
                                                     value={props.divCol.lg.span}
                                                     onChange={(e) => {
                                                         ChangeDivColVal(e,'lg','span')
                                                     }}
                                        />
                                        <FormControl type={'number'}
                                                     value={props.divCol.lg.offset}
                                                     onChange={(e) => {
                                                         ChangeDivColVal(e,'lg','offset')
                                                     }}

                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>xl</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl type={'number'}
                                                     value={props.divCol.xl.span}
                                                     onChange={(e) => {
                                                         ChangeDivColVal(e,'xl','span')
                                                     }}
                                        />
                                        <FormControl type={'number'}
                                                     value={props.divCol.xl.offset}
                                                     onChange={(e) => {
                                                         ChangeDivColVal(e,'xl','offset')
                                                     }}

                                        />
                                    </InputGroup>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="input_col">
                                    Input size
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="input_col">
                                <Card.Body>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>xs</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl type={'number'}
                                                     value={props.wrapperCol.xs.span}
                                                     onChange={(e) => {
                                                         ChangeWrapperColVal(e,'xs','span')
                                                     }}
                                        />
                                        <FormControl type={'number'}
                                                     value={props.wrapperCol.xs.offset}
                                                     onChange={(e) => {
                                                         ChangeWrapperColVal(e,'xs','offset')
                                                     }}

                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>md</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl type={'number'}
                                                     value={props.wrapperCol.md.span}
                                                     onChange={(e) => {
                                                         ChangeWrapperColVal(e,'md','span')
                                                     }}
                                        />
                                        <FormControl type={'number'}
                                                     value={props.wrapperCol.md.offset}
                                                     onChange={(e) => {
                                                         ChangeWrapperColVal(e,'md','offset')
                                                     }}

                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>lg</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl type={'number'}
                                                     value={props.wrapperCol.lg.span}
                                                     onChange={(e) => {
                                                         ChangeWrapperColVal(e,'lg','span')
                                                     }}
                                        />
                                        <FormControl type={'number'}
                                                     value={props.wrapperCol.lg.offset}
                                                     onChange={(e) => {
                                                         ChangeWrapperColVal(e,'lg','offset')
                                                     }}

                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>xl</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl type={'number'}
                                                     value={props.wrapperCol.xl.span}
                                                     onChange={(e) => {
                                                         ChangeWrapperColVal(e,'xl','span')
                                                     }}
                                        />
                                        <FormControl type={'number'}
                                                     value={props.wrapperCol.xl.offset}
                                                     onChange={(e) => {
                                                         ChangeWrapperColVal(e,'xl','offset')
                                                     }}

                                        />
                                    </InputGroup>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="label_col">
                                    Label size
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="label_col">
                                <Card.Body>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>xs</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl type={'number'}
                                                     value={props.labelCol.xs.span}
                                                     onChange={(e) => {
                                                         ChangeLabelColVal(e,'xs','span')
                                                     }}
                                        />
                                        <FormControl type={'number'}
                                                     value={props.labelCol.xs.offset}
                                                     onChange={(e) => {
                                                         ChangeLabelColVal(e,'xs','offset')
                                                     }}

                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>md</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl type={'number'}
                                                     value={props.labelCol.md.span}
                                                     onChange={(e) => {
                                                         ChangeLabelColVal(e,'md','span')
                                                     }}
                                        />
                                        <FormControl type={'number'}
                                                     value={props.labelCol.md.offset}
                                                     onChange={(e) => {
                                                         ChangeLabelColVal(e,'md','offset')
                                                     }}

                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>lg</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl type={'number'}
                                                     value={props.labelCol.lg.span}
                                                     onChange={(e) => {
                                                         ChangeLabelColVal(e,'lg','span')
                                                     }}
                                        />
                                        <FormControl type={'number'}
                                                     value={props.labelCol.lg.offset}
                                                     onChange={(e) => {
                                                         ChangeLabelColVal(e,'lg','offset')
                                                     }}

                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>xl</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl type={'number'}
                                                     value={props.labelCol.xl.span}
                                                     onChange={(e) => {
                                                         ChangeLabelColVal(e,'xl','span')
                                                     }}
                                        />
                                        <FormControl type={'number'}
                                                     value={props.labelCol.xl.offset}
                                                     onChange={(e) => {
                                                         ChangeLabelColVal(e,'xl','offset')
                                                     }}

                                        />
                                    </InputGroup>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="validation">
                                    Validation
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="validation">
                                <Card.Body>
                                    <Form.Group controlId="InputLabel">
                                        <Form.Label>LangeFile.FormName</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="LangeFile.FormName"
                                            value={props.LangFile}
                                            onChange={(e) => {
                                                setProp((props) => (props.LangFile = e.target.value), 12)
                                            }}
                                        />
                                    </Form.Group>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend >
                                            <InputGroup.Checkbox
                                                name={'required'}
                                                checked={props.validation.required}
                                                onChange={(e) => {
                                                    ChangeValidationData(e.target.name,e.target.checked);
                                                }}/>
                                            <InputGroup.Text className={'input_group_end'}>required</InputGroup.Text>
                                        </InputGroup.Prepend>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend >
                                            <InputGroup.Checkbox
                                                name={'isEmail'}
                                                checked={props.validation.isEmail}
                                                onChange={(e) => {
                                                    ChangeIsTypeValidationData(e.target.name,e.target.checked);
                                                }}/>
                                            <InputGroup.Text className={'input_group_end'}>isEmail</InputGroup.Text>
                                        </InputGroup.Prepend>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend >
                                            <InputGroup.Checkbox
                                                name={'isNumber'}
                                                checked={props.validation.isNumber}
                                                onChange={(e) => {
                                                    ChangeIsTypeValidationData(e.target.name,e.target.checked);
                                                }}/>
                                            <InputGroup.Text className={'input_group_end'}>isNumber</InputGroup.Text>
                                        </InputGroup.Prepend>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend >
                                            <InputGroup.Checkbox
                                                name={'isFloat'}
                                                checked={props.validation.isFloat}
                                                onChange={(e) => {
                                                    ChangeIsTypeValidationData(e.target.name,e.target.checked);
                                                }}/>
                                            <InputGroup.Text className={'input_group_end'}>isFloat</InputGroup.Text>
                                        </InputGroup.Prepend>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="basic-addon1">maxLength</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            type={'number'}
                                            value={props.validation.maxLength}
                                            placeholder="max Length"
                                            aria-label="max Length"
                                            aria-describedby="basic-addon1"
                                            onChange={(e) => {
                                                if(e.target.value <= 0 || !e.target.value ){
                                                    if(props.validation.maxLength){
                                                        setProp((props) => ( delete props.validation.maxLength), 12);
                                                    }
                                                    e.target.value = '';
                                                    return;
                                                }
                                                setProp((props) => (props.validation.maxLength = e.target.value), 12);
                                            }}/>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="basic-addon1">minLength</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            type={'number'}
                                            value={props.validation.minLength}
                                            placeholder="max Length"
                                            aria-label="max Length"
                                            aria-describedby="basic-addon1"
                                            onChange={(e) => {
                                                if(e.target.value <= 0 || !e.target.value ){
                                                    if(props.validation.minLength){
                                                        setProp((props) => ( delete props.validation.minLength), 12);
                                                    }
                                                    e.target.value = 0;
                                                    return;
                                                }
                                                setProp((props) => (props.validation.minLength = e.target.value), 12);
                                            }}/>
                                    </InputGroup>

                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Col>



            </Row>
        </Container>

    );
};