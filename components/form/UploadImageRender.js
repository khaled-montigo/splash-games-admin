import {Col, Image} from "react-bootstrap";
import {RiEditCircleFill} from "react-icons/ri";
import {MdCancel} from "react-icons/md";
import React from "react";

const UploadImageRender = ({multiple, image, imageColData, index, onImageUpload,onImageRemove}) => {
    const ImageURl = image ? image['data_url'] : null
    return (
        <>
            <Col {...imageColData} className={'mb-5'}>
                <div className={'upload-image-area'}>
                    <div className="upload-image-wrapper">
                        <Image rounded src={ImageURl}/>
                    </div>
                    {multiple && <span
                        onClick={() => onImageUpload(index)}
                        className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow edit-button">
                            <RiEditCircleFill color={"#041c6e"} size={"25"}/>
                        </span> }
                    {!multiple && <span
                        onClick={() => onImageUpload()}
                        className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow edit-button">
                            <RiEditCircleFill color={"#041c6e"} size={"25"}/>
                        </span> }

                    <span
                        onClick={() => onImageRemove(index)}
                        className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow remove-button">
                            <MdCancel size={"25"}/>
                        </span>
                </div>
            </Col>
        </>
    )
}
export default UploadImageRender