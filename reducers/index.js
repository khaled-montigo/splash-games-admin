import { combineReducers } from 'redux';
import CodingReducer from "./Coding/reducers";
import CodeFunctionsReducer from "./CodeFunctions/reducers";
import UploadImagesValidationReducer from "./UploadImagesValidation/reducers";


const rootReducers = combineReducers({
    IsCoding: CodingReducer,
    CodeFunctions : CodeFunctionsReducer,
    UploadImagesValidation  : UploadImagesValidationReducer,
});

export default rootReducers;
