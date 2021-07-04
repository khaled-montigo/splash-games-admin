const GetErrorsFromResponse = (response) => {
    let ReturnData = {
        serverError : response.status,
        message : "",
        errors : ""
    };

    if(!response.hasOwnProperty("data")){
        ReturnData.message = "Server Error";
        return ReturnData;
    }
    ReturnData.message = response.data.message;

    if(!response.data.hasOwnProperty("errors")){
        return ReturnData;
    }
    const ErrorsList =  response.data.errors;
    Object.entries(ErrorsList).forEach(([key, value]) => {
        let Errors = ReturnData.errors;
        if(Errors != ""){
            Errors = Errors + "<br>";
        }
        const ArrKey = key.includes(".");
        if(ArrKey){
            let KeyNames = key.split('.');
            let newKey = KeyNames[KeyNames.length - 1];
             key = key.toString().replace("_", " ");
             key = key.toString().replace("-", " ");
            newKey = newKey.toString().replace("_", " ");
            newKey = newKey.toString().replace("-", " ");
            const newValue = value.toString().replace(key, newKey);
            Errors = Errors + KeySpin(newKey) + " : " + MessageSpin(newValue);
        }else{
            Errors = Errors + KeySpin(key) + " : " + MessageSpin(value);
        }
        ReturnData.errors = Errors;
    })


    return ReturnData;
}


const KeySpin = (Key) =>{
    return `<spin class='error-text-key'>${Key}</spin>`
}

const MessageSpin = (message) =>{
    return `<spin class='error-text-message'>${message}</spin>`
}


export {GetErrorsFromResponse}