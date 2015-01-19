/**
 * Created by gralinsa on 2014-12-08.
 */
var slider = {
    _current_slide : 0,
    _slide_ul : '',
    _slide_items : '',
    _interval: 0,

    get current_slide(){
        return this._current_slide;
    },
    set current_slide(n){
        return this._current_slide = n;
    },
    get slide_ul(){
        return this._slide_ul;
    },
    set slide_ul(n){
        return this._slide_ul = n;
    },
    get slide_items(){
        return this._slide_items;
    },
    set slide_items(n){
        return this._slide_items = n;
    },
    get interval(){
        return this._interval;
    },
    set interval(n){
        return this._interval = n;
    },

    create: function(parameters){
        return Object.create(this).init(parameters);
    },

    init: function(){
        return this.initializeSlider(parameters);
    },

    initializeSlider: function(parameters){
        if(typeof parameters.slide_ul !='undefined'){
            this.slide_ul = parameters.slide_ul;
        }else{
            throw new TypeError('slider_ul should be defined')
        }
        if(typeof parameters.slide_items !='undefined'){
            this.slide_items = parameters.slide_items;
        }else{
            throw new TypeError('slide_items should be defined')
        }
        return this;
    },


    change: function(shift){
        var margin = parseInt(this.slide_ul.css("margin-left"));
        if ((this.current_slide == this.slide_items.length) && (shift == -1 )) {
            this.slide_ul.css("margin-left", 0);
            this.current_slide = 0;
            this.change(-1);
        } else if ((this.current_slide <= 0) && (shift == 1 ) || margin>0) {
            this.slide_ul.css("margin-left", (this.slide_items.length) * -100 + "%");
            this.current_slide = this.slide_items.length;
            this.change(1);
        } else {
            this.slide_ul.animate({"margin-left": "+=" + (shift * 100) + '%'}, 500);
            this.current_slide += -1 * shift;
        }

    },

    moveRight: function(){
        return this.change(-1);
    },

    moveLeft: function(){
        return this.change(1);
    },

    refreshIterator: function(){
        var items = $('.slider__iterator--item');
        items.each(function(){
            $(this).removeClass('iterator__active');
        });
        (this.current_slide == this.slide_items.length) ? item_position = 0 : item_position = this.current_slide;
        $(items[item_position]).addClass('iterator__active');
    },

    setNewInterval: function(){
        var self=this;
        this.interval = setInterval(function(){
            self.moveRight();
        }, 7000);
        return this.interval
    }
};
