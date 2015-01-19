/*
    First Task : Wordpress.
    This is how not to write a code. :D

    HINT: Next time use jQuery instead.
*/


(function() {
    window.onload = function(){
        var slider = new Slider();
        slider.init(5000);

        var gallery = new Gallery();
        gallery.init();

        window.onresize = function(){
            slider.resize();
        };

    };




    function Slider(){
        var slider = document.getElementsByClassName("slider")[0];
        var slides = document.getElementsByClassName("slider__slides")[0];
        var slideIMG = slider.getElementsByTagName("img");
        var slideWidth = 0;
        var iterator = 1;

        // Initialize size of slider
        this.init = function(interval){
            if(!document.getElementById("slider__iterator")) {
                addButtons();
                addIterator();
            }
            calc();
            setInterval(function(){right();},interval);
            refreshIterator();
        };

        // Call on resize - update slider properites
        this.resize = function(){
            calc();
        };

        // Calculate margins, width etc.
        var calc = function(){
            slideIMG = slider.getElementsByTagName("img");
            slideWidth = slider.clientWidth;

            // Set img width equal to slider client width
            for (i=1; i<=slideIMG.length; i++){
                slideIMG[i-1].style.maxWidth = slider.clientWidth+"px";
            }
            //add margin to img
            for (i=0; i<slideIMG.length; i++){
                var marg = ((slideWidth - slideIMG[i].width)/2)+"px";
                slideIMG[i].style.margin = "auto "+marg;
            }
            // set full slider width
            slides.style.width = (((slideWidth)*slideIMG.length)+1)+"px";
        };

        // Functions to move img.
        var change = function(shift) {
            var currentPos = parseInt(slides.style.marginLeft);
            (isNaN(currentPos))? currentPos=0 : {};
            move = (shift * slideWidth) + currentPos;

            if((shift*move) >= parseInt(slides.style.width)-slideWidth){
                //animate(currentPos,0,shift)
                slides.style.marginLeft = "0px";
                iterator = 1;
            }else {
                if ((move >= 0)&&(shift >0)) {
                   // animate(currentPos,((-1)*(parseInt(slides.style.width)-slideWidth)),shift);
                    slides.style.marginLeft = ((-1)*(parseInt(slides.style.width)-slideWidth))+"px";
                    iterator = slideIMG.length;
                }else{
                    iterator += shift*(-1);
                    //animate(currentPos,move,shift);
                    slides.style.marginLeft = move + "px";
                }
            }
            refreshIterator();
        };

        // animate shift
        /*var animate = function(currPos, destPos,shift){
            if(destPos != 0) {
                if(destPos = (-1)*slides.clientWidth-slideWidth){
                    //shift = 1;
                    console.log(destPos);
                    var move = destPos / 40;
                    for (i = 1; i <= 40; i++) {
                        setTimeout(function () {
                            currPos += shift * move;
                            slides.style.marginLeft = currPos + "px";
                        }, (15 * i));
                    }
                }else {
                    var move = slideWidth / 40;
                    for (i = 1; i <= 40; i++) {
                        setTimeout(function () {
                            currPos += shift * move;
                            slides.style.marginLeft = currPos + "px";
                        }, (15 * i));
                    }
                }
            }else{

                var move = (currPos+1) / 40;
                for(i=1;i<=40;i++){
                    setTimeout(function(){
                        currPos -= move;
                        slides.style.marginLeft = currPos + "px";
                    }, (15*i));
                }
            }

        };*/

        // call change() with shift value
        var right = function(){
           change(-1);
        };

        var left = function(){
           change(1);
        };

        // Defines bahaviors of buttons and iterator
        var addButtons = function(){
            // inside-Border
            var node=document.createElement("div");
            node.id = "slider__border";
            slider.appendChild(node);

            // Buttons
            node=document.createElement("SPAN");
            node.id = "slider__button_right";
            slider.appendChild(node);

            node=document.createElement("SPAN");
            node.id = "slider__button_left";
            slider.appendChild(node);

            // Listeners
            document.getElementById("slider__button_right").addEventListener("click",right);
            document.getElementById("slider__button_left").addEventListener("click",left);


        };
        var addIterator = function(){
            var node=document.createElement("div");
            node.id = "slider__iterator";
            slider.parentElement.insertBefore(node, slider.nextElementSibling);

            for (i=1; i<=slideIMG.length; i++){
                node=document.createElement("span");
                node.id = "slider__iterator_id";
                node.className = "";
                var textnode=document.createTextNode(i);
                node.appendChild(textnode);
                document.getElementById("slider__iterator").appendChild(node);
            }
        };

        // Call on img change - set right iterator
        var refreshIterator = function(){
            for (i=1; i<=slideIMG.length; i++){
                document.getElementById("slider__iterator").children[i-1].className = "";
            }
            document.getElementById("slider__iterator").children[iterator-1].className = "iterator__active";
        }

    };

    function Gallery(){
        var gallery = document.getElementsByClassName("gallery")[0];
        var gallery_thumbs = gallery.getElementsByClassName("gallery-thumbs")[0].getElementsByTagName("img");
        var gallery_big = gallery.getElementsByClassName("gallery-big")[0].getElementsByTagName("img")[0];
        var iterator = 0;
        var img_array = [];


        this.init = function(){
            fillImgArray();
            addButtons();
            for (var i=0; i< gallery_thumbs.length; i++) {
                var td = gallery_thumbs[i];
                td.addEventListener("click", function () {
                    switchIt(this)
                });
            }
        };

        // switch img with another
        var switchIt = function(gImage){
            var tmp = gImage.src;
            var height = gImage.clientHeight;
            var desc = gImage.getAttribute("data-desc");
            gImage.src = gallery_big.src;
            gImage.style.height = height+"px";
            gImage.setAttribute("data-desc",gallery.getElementsByClassName("gallery-big-photo-desc")[0].innerHTML );
            // Look of img in array - set iterator
            iterator = img_array.indexOf(tmp);
            gallery_big.src = tmp;
            gallery.getElementsByClassName("gallery-big-photo-desc")[0].innerHTML = desc;
            fillImgArray();
        };

        // Fill array with img.src element.
        var fillImgArray = function(){
            img_array=[];
            for (var i=0; i< gallery_thumbs.length; i++) {
                img_array.push(gallery_thumbs[i].src);
            }
        };

        var rightg = function(){
            change(1);
        };

        var leftg = function(){
            change(-1)
        };

        // Behavior of right/left buttons - change next/prev of iterator
        var change = function(shift){
            if ((iterator>=gallery_thumbs.length-1)&&(shift>0)){
                switchIt(gallery_thumbs[0]);
            }else{
                if((iterator==0) &&(shift<0)){
                    switchIt(gallery_thumbs[gallery_thumbs.length-1]);
                }
                switchIt(gallery_thumbs[iterator+shift]);
            }
        };
        var addButtons = function(){
            var node=document.createElement("SPAN");
            node.id = "gallery__button_right";
            gallery.getElementsByClassName("gallery-big")[0].getElementsByTagName("figcaption")[0].appendChild(node);

            node=document.createElement("SPAN");
            node.id = "gallery__button_left";
            gallery.getElementsByClassName("gallery-big")[0].getElementsByTagName("figcaption")[0].appendChild(node);

            // Listeners
            document.getElementById("gallery__button_right").addEventListener("click",rightg);
            document.getElementById("gallery__button_left").addEventListener("click",leftg);
        }

    }
})();
