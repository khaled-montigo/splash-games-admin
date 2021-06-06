const LanguageValidations = (errorsList, dataName, langList, attrList) => {
    let HasError = false;
    if(!errorsList.hasOwnProperty(dataName)){
        return HasError;
    }
    const MainDataName = errorsList[dataName];
        langList.forEach(LangName => {
            if(MainDataName.hasOwnProperty(LangName)){
                const Lang = MainDataName[LangName];
                attrList.forEach(AttrName => {
                    if(Lang.hasOwnProperty(AttrName)){
                        console.log("Error ", LangName, ", " , AttrName)
                        HasError =  true;
                    }
                })
            }
        })

        return HasError;
}

const StepImagesValidations = (ImagesList) => {
    let HasError = false;
    ImagesList.forEach(element => {
        if(element.images.length < 1 ) {
            HasError = true;
        }});
    return HasError;
}

export {LanguageValidations, StepImagesValidations}