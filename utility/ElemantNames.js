import {UnderscoreCapitalize} from "./UnderscoreCapitalize";


const NoNameClass = (name) => {
    if(name){
        return  ''
    }
    return 'field-no-name';
}

const ElementLowerName = (ElID, name) => {
    let LowerName  = "";
    if(name){
        LowerName = UnderscoreCapitalize(name);
    }else{
        LowerName = ElID;
    }
    return LowerName;
}

const ElementUpperName = (ElID, name)  => {
    let LowerName  = "";
    let UpperName = "";
    if(name){
        LowerName = UnderscoreCapitalize(name);
        UpperName =  LowerName.charAt(0).toUpperCase() + LowerName.slice(1);
    }else{
        UpperName = ElID;
    }
    return UpperName;

}

export {NoNameClass, ElementLowerName, ElementUpperName}