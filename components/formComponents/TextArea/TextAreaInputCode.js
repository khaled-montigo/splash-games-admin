import React from 'react';
import {ElementLowerName, ElementUpperName} from "../../../utility/ElemantNames";



const TextAreaInputCode = ({ ElID, name, label, height, validation, divCol, wrapperCol, labelCol }) => {

    const LowerName = ElementLowerName(ElID, name);
    const UpperName  = ElementUpperName (ElID, name);

    return (
        `<Col
        xs={{span : ${divCol.xs.span} , offset : ${divCol.xs.offset} }}
        md={{span : ${divCol.md.span} , offset : ${divCol.md.offset} }}
        lg={{span : ${divCol.lg.span} , offset : ${divCol.lg.offset} }}
        xl={{span : ${divCol.xl.span} , offset : ${divCol.xl.offset} }}
        className={'mb-3'}
        style={{width: '100%'}}>
        <FormGroup  $ref={${LowerName}Ref} ${(validation.required ? ('required') : '\r \r \r')}  ${(validation.maxLength ? ('maxLength="'+validation.maxLength+'"') : '\r \r \r')} ${(validation.minLength ? ('minLength="'+validation.minLength+'"') : '\r \r \r')} 
        name={'${name}'}
        label={'${label}'}
        wrapperCol={{
            xs:{span : ${wrapperCol.xs.span} , offset : ${wrapperCol.xs.offset} },
            md :{span : ${wrapperCol.md.span} , offset : ${wrapperCol.md.offset} },
            lg:{span : ${wrapperCol.lg.span} , offset : ${wrapperCol.lg.offset} },
            xl:{span : ${wrapperCol.xl.span} , offset : ${wrapperCol.xl.offset} },
        }}
        labelCol={{
            xs:{span : ${labelCol.xs.span} , offset : ${labelCol.xs.offset} },
            md :{span : ${labelCol.md.span} , offset : ${labelCol.md.offset} },
            lg:{span : ${labelCol.lg.span} , offset : ${labelCol.lg.offset} },
            xl:{span : ${labelCol.xl.span} , offset : ${labelCol.xl.offset} },
        }}>
        <FormControl custom={true} as={"div"} className={'b-0 h-fit-content'}>
        <SunEditor height={${height}} onChange={on${UpperName}Change} />
        </FormControl>
        </FormGroup>
</Col>
        `.replace(/(\r\n|\n\n|\r)/gm, "")
    );
};

export default TextAreaInputCode