var tinderPeople = [
    {image: "https://tse1.mm.bing.net/th?id=A1005a18fcdfb31abd1df72b79dd474ff&w=137&h=183&c=8&rs=1&qlt=90&dpr=1.3&pid=3.1&rm=2",
     caption: "tree"},
    {image: "img link",
     caption: "caption text"}
     {image: "img/kindling/chris_rock.jpg",
     caption: "Chris Rock"},
     {image: "img/kindling/mona.jpg",
     caption: "Moana"},
     {image: "img/kindling/stockphoto_girl.jpg",
     caption: "Tonya Bae"},
]

function generateTinderObj(imgsrc, text){
    var wrapFront = "url(\"";
    var wrapBack = "\") no-repeat scroll center center";
    return {image: {background: wrapFront + imgsrc + wrapBack}, caption: text};
}

function genDefault(){
    return generateTinderObj("https://tse1.mm.bing.net/th?id=A1005a18fcdfb31abd1df72b79dd474ff&w=137&h=183&c=8&rs=1&qlt=90&dpr=1.3&pid=3.1&rm=2", "tree");
}

function TinderModel(){
    var self = this;
    self.matches = ko.observableArray();
    for (i = 0; i < tinderPeople.length; i++){
        self.matches.push(generateTinderObj(tinderPeople[i].image, tinderPeople[i].caption));
    }
}
var pageModel = new TinderModel();
ko.applyBindings(pageModel);

/**
 * jTinder initialization
 */
function activateSliders(){
    console.log("Activating sliders");
    $("#tinderslide").jTinder({
        // dislike callback
        onDislike: function (item) {
            // set the status text
            $('#status').html('Liked!');
        },
        // like callback
        onLike: function (item) {
            // set the status text
            $('#status').html('Disliked!');
        },
        animationRevertSpeed: 200,
        animationSpeed: 400,
        threshold: 1,
        likeSelector: '.like',
        dislikeSelector: '.dislike'
    });

    /**
     * Set button action to trigger jTinder like & dislike.
     */
    $('.actions .like, .actions .dislike').click(function(e){
        e.preventDefault();
        $("#tinderslide").jTinder($(this).attr('class'));
    });
}

activateSliders();
