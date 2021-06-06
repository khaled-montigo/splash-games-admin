const actions = {
    isCoding: 'isCoding',
    isEditing: 'isEditor',

    setCoding: () => {
        return {
            type: actions.isCoding,
        };
    },

    setEditing: () => {
        return {
            type: actions.isEditing,
        };
    },

};

export default actions;
