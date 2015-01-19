/**
 * Created by gralinsa on 2014-12-08.
 */
var gallery = {
    _gallery_thumbs: '',
    _gallery_big: '',
    _position: -1,

    get gallery_thumbs() {
        return this._gallery_thumbs;
    },
    set gallery_thumbs(n) {
        return this._gallery_thumbs = n;
    },
    get gallery_big() {
        return this._gallery_big;
    },
    set gallery_big(n) {
        return this._gallery_big = n;
    },
    get position() {
        return this._position;
    },
    set position(n) {
        return this._position = n;
    },


    init: function (parameters) {
        return this;
    },
    create: function (parameters) {
        return Object.create(this).init(parameters);
    },

    initializeGallery: function (parameters) {
        if (typeof parameters.gallery_thumbs != 'undefined') {
            this.gallery_thumbs = parameters.gallery_thumbs;
        }else{
            throw new TypeError('gallery_thumbs should be defined');
        }

        if(typeof parameters.gallery_big != 'undefined') {
            this.gallery_big = parameters.gallery_big;
        }else{
            throw new TypeError('gallery_big should be defined');
        }
        return this;

        if(typeof parameters.parrent != 'undefined') {
            this.gallery = parameters.parrent;
        }else{
            throw new TypeError('gallery_big should be defined');
        }
        return this;
    },

    moveRight: function () {
        this.imageNext(1);
    },
    moveLeft: function () {
        this.imageNext(-1);
    },


    switchIt: function (item) {
        this.position = $(this.gallery_thumbs).index(item);
        var big = $(this.gallery_big);
        var parent = big.parent();
        var tmpSrc = big.attr('src');
        var tmpAlt = big.attr('alt');
        var tmpDsc = $(parent).find(".gallery__big_figcap").html();
        big.attr('src', $(item).attr('src')).attr('alt', $(item).attr('alt'));
        $(parent).find(".gallery__big_figcap").html($(item).data("desc"));
        $(item).attr('src', tmpSrc).attr('alt', tmpAlt).data("desc", tmpDsc);
        return this.position
    },

    imageNext: function (shift) {
        if ((this.position >= this.gallery_thumbs.length - 1) && shift > 0) {
            this.switchIt(this.gallery_thumbs[0]);
        } else if ((this.position <= 0) && shift < 0) {
            this.switchIt(this.gallery_thumbs[this.gallery_thumbs.length - 1]);
        } else {
            this.switchIt(this.gallery_thumbs[this.position + shift]);
        }
        return this.position
    }
};