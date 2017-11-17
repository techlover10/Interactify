var tinderPeople = [
     {image: "img/kindling/chris_rock.jpg",
     caption: "Chris Rock"},
     {image: "img/kindling/mona.jpg",
     caption: "Moana"},
     {image: "img/kindling/stockphoto_girl.jpg",
     caption: "Tonya Bae"},
    {image: "img/kindling/lisa.jpg",
        caption: "Lisa"},
]

function generateTinderObj(imgsrc, text, url){
    var wrapFront = "url(\"";
    var wrapBack = "\") no-repeat scroll center center";
    return {image: {background: wrapFront + imgsrc + wrapBack}, caption: text, link: url};
}

function genDefault(){
    return generateTinderObj("https://tse1.mm.bing.net/th?id=A1005a18fcdfb31abd1df72b79dd474ff&w=137&h=183&c=8&rs=1&qlt=90&dpr=1.3&pid=3.1&rm=2", "tree");
}

function TinderModel(){
    var self = this;
    self.matches = ko.observableArray();
    for (var i = 0; i < tinderPeople.length; i++){
        self.matches.push(generateTinderObj(tinderPeople[i].image, tinderPeople[i].caption));
    }
    $.ajax({url: "/currentAdNoRefresh", 
        success: function (currentAd) {
            console.log("getting current ad");
            if (currentAd){
                console.log(currentAd);
                stories.update(currentAd.storyObject);
                if (currentAd.tinderObject){
                    self.matches.push(generateTinderObj(currentAd.tinderObject.photo, currentAd.tinderObject.caption, currentAd.tinderObject.link));
                }
            }
        },
        async: false});

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
