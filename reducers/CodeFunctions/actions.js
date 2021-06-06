const actions = {
    CODE_FUNCTION: 'CODE_FUNCTION',
    ADD_CODE_FUNCTION: 'ADD_CODE_FUNCTION',
    REMOVE_CODE_FUNCTION: 'REMOVE_CODE_FUNCTION',


    addCodeFunction: data => {
        return {
            type: actions.ADD_CODE_FUNCTION,
            data,
        };
    },

    removeCodeFunction: data => {
        return {
            type: actions.REMOVE_CODE_FUNCTION,
            data,
        };
    },




};

export default actions;
