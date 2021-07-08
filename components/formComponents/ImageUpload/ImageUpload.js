import React, {useEffect, useState} from 'react';
import {useNode} from '@craftjs/core';
import {FormGroup} from "react-bootstrap-formutil";
import {Col, Form, FormControl, Row, Button, FormLabel, Image} from "react-bootstrap";
import {ImageUploadSettings} from './ImageUploadSettings'
import ValidationsClass from '../../validation/validator/Validations'
import {useDispatch, useSelector} from 'react-redux';
import ImageUploading from 'react-images-uploading';
import ImageUploadCode from './ImageUploadCode'
import {UnderscoreCapitalize} from "../../../utility/UnderscoreCapitalize";
import {AddToCodeFunctions} from '../../../reducers/CodeFunctions/actionCreator'
import {AddToUploadImagesValidation} from '../../../reducers/UploadImagesValidation/actionCreator'
import {ElementLowerName, ElementUpperName, NoNameClass} from '../../../utility/ElemantNames'
import {RiEditCircleFill} from "react-icons/ri";
import {MdCancel} from "react-icons/md";
import UploadImageRender from '/components/form/UploadImageRender'


export const ImageUpload = ({
                                name,
                                label,
                                uploadLabel,
                                changeLabel,
                                validation,
                                divCol,
                                imagesAreaCol,
                                labelCol,
                                imageCol,
                                value
                            }) => {
    const {connectors: {connect, drag}} = useNode();
    const {ElID} = useNode((node) => ({ElID: node.id}));
    const {Code, FunctionsData, ImagesValidations} = useSelector(state => {
        return {
            Code: state.IsCoding,
            FunctionsData: state.CodeFunctions,
            ImagesValidations: state.UploadImagesValidation,
        };
    });


    const test = [{
        data_url: "https://via.placeholder.com/400x300.png?text=Image",
        file: null
    }];

    const [state, setState] = React.useState({
        images: null,
    });

    const maxNumber = 69;
    const onChange = (imageList, addUpdateIndex) => {
        setState({images: imageList});
    };


    const ElementName = name ? name : ElID;
    const ValidationData = {
        required: validation.required,
        name: ElementName,
        lowerName: ElementLowerName(ElID, name),
    }

    AddToUploadImagesValidation(ImagesValidations, ElID, ValidationData)

    useEffect(() => {
        const LowerName = ElementLowerName(ElID, name);
        const UpperName = ElementUpperName(ElID, name);
        const FunctionsCode = `const [${LowerName}State, set${UpperName}State] = React.useState({images: []});
        const on${UpperName}Change = (imageList, addUpdateIndex) => {
        set${UpperName}State({images : imageList});
        };`
        AddToCodeFunctions(FunctionsData, ElID, FunctionsCode);
    }, [name]);




    return (
        <>
            {!Code
                ? (
                    <Col
                        {...divCol}
                        className={`mb-2 ${NoNameClass(name)}`}
                        ref={(ref) => connect(drag(ref))}
                        style={{width: '100%'}}
                        >
                        <Row>
                            <Col  {...labelCol}>
                                <FormLabel>{label}</FormLabel>
                            </Col>
                            <Col {...imagesAreaCol}>
                                <ImageUploading
                                    multiple={validation.multiple}
                                    name={'fds'}
                                    value={state.images}
                                    onChange={onChange}
                                    maxNumber={validation.maxNumber}
                                    maxFileSize={validation.maxFileSize}
                                    dataURLKey="data_url">
                                    {({
                                          imageList,
                                          onImageUpload,
                                          onImageRemoveAll,
                                          onImageUpdate,
                                          onImageRemove,
                                          isDragging,
                                          dragProps,
                                      }) => (
                                        <>
                                            <Row>
                                                <>
                                                    {validation.multiple &&
                                                        <Col xs={12}>
                                                            <Button
                                                                className={'mb-3'}
                                                                onClick={onImageUpload}
                                                                variant="primary"
                                                                {...dragProps}>
                                                                {uploadLabel}
                                                            </Button>
                                                        </Col>
                                                    }

                                                    {imageList.map((image, index) => {
                                                        return (
                                                            <>
                                                                <UploadImageRender multiple={validation.multiple}  image={image} imageColData={imageCol} index={index} onImageUpload={onImageUpdate} onImageRemove={onImageRemove}/>
                                                            </>
                                                        )
                                                    })}

                                                    {(!validation.multiple && imageList.length < 1) &&
                                                    <UploadImageRender multiple={validation.multiple}  image={null} imageColData={imageCol} index={0} onImageUpload={onImageUpload} onImageRemove={onImageRemove}/>
                                                    }
                                                </>


                                            </Row>

                                        </>


                                    )}
                                </ImageUploading>
                            </Col>
                        </Row>

                    </Col>
                )
                :
                <ImageUploadCode ElID={ElID} name={name} label={label} uploadLabel={uploadLabel}
                                 changeLabel={changeLabel} validation={validation} divCol={divCol} imagesAreaCol={imagesAreaCol}
                                 labelCol={labelCol} imageCol={imageCol} />
            }


        </>
    );
};

const MakeID = (length) => {
    const result = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}


export const ImageUploadDefaultProps = {
    name: '',
    label: 'Image',
    uploadLabel: 'Upload Image',
    changeLabel: 'Change',
    LangFile: '',
    validation: {},
    divCol: {
        xs: {span: 12, offset: 0},
        md: {span: 12, offset: 0},
        lg: {span: 12, offset: 0},
        xl: {span: 12, offset: 0},
    },
    imagesAreaCol: {
        xs: {span: 12, offset: 0},
        md: {span: 12, offset: 0},
        lg: {span: 10, offset: 0},
        xl: {span: 10, offset: 0},
    },
    labelCol: {
        xs: {span: 12, offset: 0},
        md: {span: 12, offset: 0},
        lg: {span: 3, offset: 0},
        xl: {span: 2, offset: 0},
    },
    imageCol: {
        xs: {span: 12, offset: 0},
        md: {span: 12, offset: 0},
        lg: {span: 6, offset: 0},
        xl: {span: 5, offset: 0},
    },
    value: '',

};

ImageUpload.craft = {
    props: ImageUploadDefaultProps,
    related: {
        settings: ImageUploadSettings,
    },
};