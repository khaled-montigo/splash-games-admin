import actions from './actions';

const {
  addUploadImageValidationData,
  removeUploadImageValidationData,
} = actions;




const AddToUploadImagesValidation = (ImagesValidations, ElID, NewValidationData) =>{
  ImagesValidations[ElID] = NewValidationData;
  return async dispatch => {
    try {

     return  dispatch(addUploadImageValidationData(ImagesValidations));
    } catch (err) {
      console.log("Redux Error In AddToUploadImagesValidation");
      return dispatch(addUploadImageValidationData(ImagesValidations))
    }
  };
};




const RemoveFromUploadImagesValidation = (ImagesValidations, ElID) =>{
  if(ImagesValidations[ElID]){
    delete ImagesValidations[ElID]
  }
  return async dispatch => {
    try {
      return  dispatch(removeUploadImageValidationData(ImagesValidations));
    } catch (err) {
      console.log("Redux Error In RemoveFromUploadImagesValidation");
      return  dispatch(removeUploadImageValidationData(ImagesValidations));
    }
  };
};




export { AddToUploadImagesValidation, RemoveFromUploadImagesValidation};
