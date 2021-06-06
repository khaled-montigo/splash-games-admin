import actions from './actions';
import {useSelector} from "react-redux";
import rootReducers from "../index";
import {useDispatch} from "react-redux";
const {
  setCoding,
  setEditing,
} = actions;




const SetCodingView = () =>{
  console.log("EEEE");
  return async dispatch => {
    try {
      console.log("AAA");
     return  dispatch(setCoding());
    } catch (err) {
      console.log("BBB");
      return   dispatch(setCoding());
    }
  };
};

const setEditingView = () =>{
  return async dispatch => {
    try {
      return  dispatch(setEditing());
    } catch (err) {
      return dispatch(setEditing());
    }
  };
};


export { SetCodingView, setEditingView};
