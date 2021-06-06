import actions from './actions';

const {
  addCodeFunction,
  removeCodeFunction,
} = actions;






const AddToCodeFunctions = (Functions, ElID, FunctionData) =>{
  Functions[ElID] = FunctionData;
  return async dispatch => {
    try {

     return  dispatch(addCodeFunction(Functions));
    } catch (err) {
      console.log("Redux Error In AddToCodeFunctions");
      return dispatch(addCodeFunction(Functions))
    }
  };
};




const RemoveFromCodeFunctions = (Functions, ElID) =>{
  if(Functions[ElID]){
    delete Functions[ElID]
  }
  return async dispatch => {
    try {
      return  dispatch(removeCodeFunction(Functions));
    } catch (err) {
      console.log("Redux Error In RemoveFromCodeFunctions");
      return  dispatch(removeCodeFunction(Functions));
    }
  };
};




export { AddToCodeFunctions, RemoveFromCodeFunctions};
