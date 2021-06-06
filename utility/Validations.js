'use strict';

const isExisty = function isExisty(value) {
    return value !== null && value !== undefined;
};

const _isEmpty = function _isEmpty(value) {
    if (value instanceof Array) {
        return value.length === 0;
    }
    return value === '' || !isExisty(value);
};

const isEmptyTrimed = function isEmptyTrimed(value) {
    if (typeof value === 'string') {
        return value.trim() === '';
    }
    return true;
};

const ValidationsClass = {
    matchRegexp: function matchRegexp(value, regexp, Message) {
        const validationRegexp = regexp instanceof RegExp ? regexp : new RegExp(regexp);
        if(_isEmpty(value)){
            return Message;
        }
        if( validationRegexp.test(value)){
            return Message
        }
        else{
            return true
        }
    },

    // eslint-disable-next-line
    isEmail: function isEmail(value, Message) {
        const ValidEmail =  ValidationsClass.matchRegexp(value, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i);
        if(ValidEmail){
            return Message;
        }
        else{
            return true
        }
    },

    isEmpty: function isEmpty(value) {
        return _isEmpty(value);
    },

    required: function required(value, Message) {
        if(_isEmpty(value)){
            return Message;
        }
        return true;
    },

    trim: function trim(value) {
        return !isEmptyTrimed(value);
    },

    isNumber: function isNumber(value,Message) {
        const ValidNumber =  ValidationsClass.matchRegexp(value, /^-?[0-9]\d*(\d+)?$/i);
        if(ValidNumber){
            return Message;
        }
        else{
            return true
        }
    },

    isFloat: function isFloat(value, Message) {
        const ValidFloat =  ValidationsClass.matchRegexp(value, /^(?:-?[1-9]\d*|-?0)?(?:\.\d+)?$/i);
        if(ValidFloat){
            return Message;
        }
        else{
            return true
        }
    },

    isPositive: function isPositive(value) {
        if (isExisty(value)) {
            return (ValidationsClass.isNumber(value) || ValidationsClass.isFloat(value)) && value >= 0;
        }
        return true;
    },

    maxNumber: function maxNumber(value, max) {
        return _isEmpty(value) || parseInt(value, 10) <= parseInt(max, 10);
    },

    minNumber: function minNumber(value, min) {
        return _isEmpty(value) || parseInt(value, 10) >= parseInt(min, 10);
    },

    maxFloat: function maxFloat(value, max) {
        return _isEmpty(value) || parseFloat(value) <= parseFloat(max);
    },

    minFloat: function minFloat(value, min) {
        return _isEmpty(value) || parseFloat(value) >= parseFloat(min);
    },

    isString: function isString(value, Message) {
        if(_isEmpty(value)){
            return Message;
        }
        if(value instanceof String){
            return Message;
        }
        if(typeof value === 'string'){
            return true;
        }

        return Message;

    },
    minStringLength: function minStringLength(value, length) {
        return ValidationsClass.isString(value) && value.length >= length;
    },
    maxStringLength: function maxStringLength(value, length) {
        return ValidationsClass.isString(value) && value.length <= length;
    },

    // eslint-disable-next-line no-undef
    isFile: function isFile(value) {
        return _isEmpty(value) || value instanceof File;
    },
    maxFileSize: function maxFileSize(value, max) {
        return _isEmpty(value) || ValidationsClass.isFile(value) && value.size <= parseInt(max, 10);
    },
    allowedExtensions: function allowedExtensions(value, fileTypes) {
        return _isEmpty(value) || ValidationsClass.isFile(value) && fileTypes.split(',').indexOf(value.type) !== -1;
    }
};

module.exports = ValidationsClass;