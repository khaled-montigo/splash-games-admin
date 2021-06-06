import actions from "./actions";


const CodingReducer = (state  = false, action) =>{
    switch (action.type) {
        case actions.isEditing :
            return false;
        case actions.isCoding :
            return true;
        default :
            return state
    }
}
export default CodingReducer