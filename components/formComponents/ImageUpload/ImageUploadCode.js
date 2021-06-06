import React, { useEffect, useState } from 'react';
import Layout from "../../layout/Layout";
import {UnderscoreCapitalize} from '../../../utility/UnderscoreCapitalize'
import {NoNameClass} from '../../../utility/ElemantNames'


const ImageUploadCode = ({
                             ElID,
                             name,
                             label,
                             uploadLabel,
                             changeLabel,
                             validation,
                             divCol,
                             imagesAreaCol,
                             labelCol,
                             imageCol
                         }) => {

    const OnChangeName = () => {
        let newName = UnderscoreCapitalize(name);
        if(newName){
            newName = newName.charAt(0).toUpperCase() + newName.slice(1);
            return "on" + newName +"Change";
        }else{
            return "on" + ElID + "Change";
        }
    }

    const stateImages = () => {
        const newName = UnderscoreCapitalize(name);
        if(newName){
            return newName +"State.images";
        }else{
            return ElID +"State.images";

        }
    }


    const multipleStartCode = () => {
        if(validation.multiple){
            return(`<Col xs={12}>
 <Button
     className={'mb-3'}
     onClick={onImageUpload}
     variant="primary"
     {...dragProps}>
     {uploadLabel}
 </Button>
</Col>`)
        }
    }

    return (
        `<Col
xs={{span : ${divCol.xs.span} , offset : ${divCol.xs.offset} }}
md={{span : ${divCol.md.span} , offset : ${divCol.md.offset} }}
lg={{span : ${divCol.lg.span} , offset : ${divCol.lg.offset} }}
xl={{span : ${divCol.xl.span} , offset : ${divCol.xl.offset} }}
className={\`mb-2 ${NoNameClass(name)}\`}>
    <Row>
        <Col
            xs={{span : ${labelCol.xs.span} , offset : ${labelCol.xs.offset} }}
            md={{span : ${labelCol.md.span} , offset : ${labelCol.md.offset} }}
            lg={{span : ${labelCol.lg.span} , offset : ${labelCol.lg.offset} }}
            xl={{span : ${labelCol.xl.span} , offset : ${labelCol.xl.offset} }}>
                <FormLabel>{label}</FormLabel>
                    </Col>
                        <Col 
                            xs={{span : ${imagesAreaCol.xs.span} , offset : ${imagesAreaCol.xs.offset} }}
                            md={{span : ${imagesAreaCol.md.span} , offset : ${imagesAreaCol.md.offset} }}
                            lg={{span : ${imagesAreaCol.lg.span} , offset : ${imagesAreaCol.lg.offset} }}
                            xl={{span : ${imagesAreaCol.xl.span} , offset : ${imagesAreaCol.xl.offset} }}>
                            <ImageUploading
                                    multiple={${validation.multiple}}
                                    name={'fds'}
                                    onChange={${OnChangeName}}
                                    maxNumber={${validation.maxNumber}}
                                    maxFileSize={${validation.maxFileSize}}
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
                                                    ${<multipleStartCode/>}

                                                    {imageList.map((image, index) => {
                                                        console.log(index);
                                                        return (
                                                            <>
                                                                <UploadImageRender multiple={${validation.multiple}}  image={image} imageColData={${imageCol}} index={index} onImageUpload={onImageUpdate} onImageRemove={onImageRemove}/>
                                                            </>
                                                        )
                                                    })}

                                                    {(!validation.multiple && imageList.length < 1) &&
                                                    <UploadImageRender multiple={${validation.multiple}}  image={null} imageColData={${imageCol}} index={0} onImageUpload={onImageUpload} onImageRemove={onImageRemove}/>
                                                    }
                                                </>


                                            </Row>

                                        </>


                                    )}
                                </ImageUploading>
                            </Col>
                        </Row>

                    </Col>


        <Col
        xs={{span : ${divCol.xs.span} , offset : ${divCol.xs.offset} }}
        md={{span : ${divCol.md.span} , offset : ${divCol.md.offset} }}
        lg={{span : ${divCol.lg.span} , offset : ${divCol.lg.offset} }}
        xl={{span : ${divCol.xl.span} , offset : ${divCol.xl.offset} }}
                       className={'mb-3'}
                   >
                       <Row>
                           <Col xs={2}>
                               <FormLabel column={'sm'}>${label}</FormLabel>
                           </Col>
                           <Col xs={9}>
                               <ImageUploading
                                   value={${stateImages()}}
                                   onChange={${OnChangeName()}}
                                   maxNumber={${validation.maxLength}}
                                   dataURLKey="data_url"
                               >
                                   {({
                                         imageList,
                                         onImageUpload,
                                         onImageRemoveAll,
                                         onImageUpdate,
                                         onImageRemove,
                                         isDragging,
                                         dragProps,
                                     }) => (
                                       // write your building UI
                                       <div className="upload__image-wrapper">
                                           <Button
                                               style={isDragging ? { color: 'red' } : undefined}
                                               onClick={onImageUpload}
                                               variant="primary"
                                               {...dragProps}>
                                               ${uploadLabel}
                                           </Button>

                                           &nbsp;
                                           {imageList.map((image, index) => {
                                               console.log(index);
                                               console.log(image);
                                               return(
                                                   <div key={index} className="image-item">
                                                       <img src={image['data_url']} alt="" width="300" />
                                                       <div className="image-item__btn-wrapper">
                                                          <Row>
                                                              <Col xs={4}>
                                                                  <Button
                                                                      onClick={() => onImageUpdate(index)}
                                                                      variant="primary"
                                                                      size="sm">
                                                                      ${changeLabel}
                                                                  </Button>
                                                              </Col>
                                                              <Col xs={{span: 2, offset :1}}>
                                                                  <Button
                                                                      onClick={() => onImageRemove(index)}
                                                                      variant="danger"
                                                                      size="sm">
                                                                      Remove
                                                                  </Button>
                                                              </Col>
                                                          </Row>
                                                       </div>
                                                   </div>
                                               )
                                           })}
                                       </div>
                                   )}
                               </ImageUploading>
                           </Col>
                       </Row>

                   </Col>
       `
    );
};

export default ImageUploadCode;

