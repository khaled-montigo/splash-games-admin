const actions = {
    ADD_UPLOAD_IMAGES_VALIDATION: 'ADD_UPLOAD_IMAGES_VALIDATION',
    REMOVE_UPLOAD_IMAGES_VALIDATION: 'REMOVE_UPLOAD_IMAGES_VALIDATION',


    addUploadImageValidationData: data => {
        return {
            type: actions.ADD_UPLOAD_IMAGES_VALIDATION,
            data,
        };
    },

    removeUploadImageValidationData: data => {
        return {
            type: actions.REMOVE_UPLOAD_IMAGES_VALIDATION,
            data,
        };
    },




};

export default actions;
