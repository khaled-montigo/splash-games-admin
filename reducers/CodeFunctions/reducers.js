import actions from "./actions";

const initialStateData = []

const CodeFunctionsReducer = (state  = initialStateData, action) =>{
    const { type, data } = action;
    switch (type) {
        case actions.ADD_CODE_FUNCTION :
            return data;
        case actions.REMOVE_CODE_FUNCTION :
            return data;
        default :
            return state;
    }
}
export default CodeFunctionsReducer