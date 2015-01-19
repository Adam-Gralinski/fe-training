"use strict"

var sliderMain = {
    _slider: {},
    init: function(parameters){
        this._slider = parameters.parrent;
        this.initializeSlider(parameters);
        this.duplicateFirstSlide();
        this.createButtons();
        this.createIterator();
        this.addListeners();
        this.setNewInterval();
        return this;
    },

    duplicateFirstSlide: function(){
        var slide = this._slider.find('.slider__item:last').after(
            this._slider.find('.slider__item:first').clone().addClass('last-item')
        );
        this._slider.find('.slider__item:first').addClass('first-item');
        return slide;
    },

    createButtons: function(){
        this._slider.append(
            $("<span>").addClass("button--right").addClass("slider__button--next").addClass("arrow_button"),
            $("<span>").addClass("button--left").addClass("slider__button--prev").addClass("arrow_button")
        );
    },

    createIterator: function(){
        this._slider.after(
            $("<div>").addClass("slider__iterator")
        );
        this.addDotsToIterator();
        this.refreshIterator();
    },

    addDotsToIterator: function(){
        for (var i=1; i<=this.slide_items.length;i++){
            this._slider.parent().find('.slider__iterator').append(
                $("<span>").addClass("slider__iterator--item").addClass("icon--dot")
            );
        }
    },

    addListeners: function(){
        var self=this;
        this._slider.find(".slider__button--next").click(function(){
            self.moveRight();
            self.refreshIterator();
        });
        this._slider.find(".slider__button--prev").click(function(){
            self.moveLeft();
            self.refreshIterator();
        });
    }

};

var galleryMain = {
    _gallery: {},
    init : function(parameters){
        this._gallery = parameters.parrent;
        this.initializeGallery(parameters);
        this.addButtons();
        this.addListeners();
        return this;
    },
    addButtons: function(){
        var photo = this._gallery.find('.gallery__big_figure');
        photo.after(
            $('<span>').addClass('gallery__button--prev').addClass('button--left').addClass('arrow_button')
        );
        photo.after(
            $('<span>').addClass('gallery__button--next').addClass('button--right').addClass('arrow_button')
        );
    },
    addListeners: function(){
        var self=this;
        this.gallery_thumbs.map(function(){
            $(this).click(function(){
                self.switchIt(this);
            });
        });
        this._gallery.find(".gallery__button--next").click(function(){
            self.moveRight();
        });
        this._gallery.find(".gallery__button--prev").click(function(){
            self.moveLeft();
        });
    }
};

var formValidation = {
    _form : {},
    _errorBox: {},
    init: function(form, event){
        this._form = $(form);
        this._errorBox = this.addErrorBox();
        var self = this;
        var formValidationResult = validateForm.create({
            items: this.buildInputsArray()
        });

        formValidationResult.map(function(message){
            if(message !== true){
                self.showMessage(message);
                event.preventDefault();
            }
        })
    },
    addErrorBox : function(){
        var box = this._form.find(".errorBox");
        if(!box.length){
            var errorBox = this._form.prepend($("<ul>").addClass("errorBox").addClass("hide"));
            box = this._form.find(".errorBox");
        }else{
            $(box).html("");
        }
        return box;
    },

    buildInputsArray : function(){
        var parameters = [];
        this._form.find('.contact_form__input').each(function(){
            parameters.push(this);
        });
        return parameters
    },

    showMessage : function(message){
        $(this._errorBox).append($("<li>").html(message)).removeClass("hide");
    }
}


$(document).ready(function(){
    $.extend(slider, sliderMain );
    var sli = $(".slider");
    var sliderMainPage = slider.create({
        slide_ul : sli.find(".slider__slides"),
        slide_items : sli.find(".slider__item"),
        parrent: sli
    });
    $.extend(gallery, galleryMain );
    var gal = $('.gallery');
    var galleryMainPage = gallery.create({
        gallery_thumbs : gal.find('.gallery__image'),
        gallery_big : gal.find('.gallery__big_photo'),
        parrent: gal
    });

    $(".contact__contact_form").submit(function(event){
        var validation = Object.create(formValidation);
        validation.init(this, event);
    });

    //Add icons to Posts (only if post have a span with data-icon).
    $(".introduction_info__article").each(function(){
        var iconType = $(this).find(".article_icon__content").data("icon");
        $(this).find(".introduction_info__article_title").addClass(iconType);
    });

});