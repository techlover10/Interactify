var idCounter = 0;

function createEmbed(link){

}

function getAd(card) {
    // remove card from table
    var cardid = "sprite";
    console.log("getAd called, removing " + cardid);
    if (card.isCard) {
    }

    // little hack to trigger the animation
    setTimeout(function () {
        var cardElement = document.getElementById(cardid);
        var spriteBkgd = document.getElementById("spriteBkgd");
        var adText = document.getElementById("adBlurb");
        adText.style.marginRight = "0px";
        adText.style.innerHTML = "";
        adText.style.fontFamily = "";
        // add 'thrown' class to start animation
        $("#sprite").removeClass("thrown");
        spriteBkgd.style.opacity = 0;
        cardElement.className += " taken";
    }, 5);
    console.log("animation complete");

    setTimeout(function(){
        $("#sprite").removeClass("taken");
        $.get("/currentAdTaken", function (){
            $("#sprite").css( "background-image", "none");
        });
    }, 1500);
}

function sendSprite(card) {
    // add card to table
    console.log("sendSprite called")
    $.get("/currentAdNoRefresh", function (currentAd){
        if (currentAd == null){
            return;
        }
        // little hack to trigger the animation
        setTimeout(function () {

            $("#ad")[0].src += "&autoplay=1";

            var cardElement = document.getElementById("sprite");
            var spriteBkgd = document.getElementById("spriteBkgd");
            if (currentAd.text != null){
                var adText = document.getElementById("adBlurb");
                adText.innerHTML=currentAd.text;
                adText.style.marginRight = "120px";
                if (currentAd.font != null){
                    adText.style.fontFamily = currentAd.font;
                }
            }
            // add 'thrown' class to start animation
            cardElement.className += " thrown";
            spriteBkgd.style.opacity = 1;
            // set thrown strength
            console.log("adding css: " + currentAd.image);
            cardElement.style.backgroundImage = "url(" + currentAd.image + ")";
            console.log("added css: " +  "background-image", "url(" + currentAd.image + ")");
        }, 100);
    });
}

function sendAd(){
    sendSprite({"id": 0, "isCard": true});
}

function phoneConnected() {
    // remove banner when a phone connects
    console.log("phoneConnected")

    let el = document.getElementById("waiting-for-device")
    if(el){
        el.remove();
    }
}
