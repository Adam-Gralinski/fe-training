"use strict"

var validateForm = {
    _params: [],

    create: function(parameters){
        return Object.create(this).init(parameters);
    },
    init: function(parameters){
        var self = this;
        this._params = parameters.items;
        var errorsArray = [];
        $(this._params).each(function(){
            var verify = $(this).data("filters");
            errorsArray.push(self.isValid(verify, $(this).val()));
        });
        return errorsArray;
    },

    isValid: function(verifyThis, value){
        switch(verifyThis){
            case "OnlyLetters":
                var letters = new RegExp("^[a-zA-Z]+\\s?[a-zA-Z]*$");
                return ((letters.test(value)) ? true : this.putMessage("Fields contain unexpected characters."));
                break;
            case "Email":
                var letters = new RegExp("^[a-zA-Z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$");
                return ((letters.test(value)) ? true : this.putMessage("Your email is wrong."));
                break;
            case "Website":
                var letters = new RegExp("^(http?:\/\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\/\\w \\.-]*)*\/?$");
                return ((letters.test(value)) ? true : this.putMessage("This isn't real website adress."));
                break;
        };
        // "If any of block above couldn't catch param to verify - return false" - The Ugly Red Book that Won’t Fit On a Shelf - 31:337
        return false;
    },
    putMessage: function(message){
        return message;
    }
};
