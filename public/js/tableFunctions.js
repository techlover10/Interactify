var idCounter = 0;

function removeCardFromTable(id, angle, suit, rank){
    //document.getElementById("card" + id).remove()

}

function getCard(card) {
    // remove card from table
    var cardid = "sprite";
    console.log("getCard called, removing " + cardid);
    if (card.isCard) {
    }

    // little hack to trigger the animation
    setTimeout(function () {
        var cardElement = document.getElementById(cardid);
        var spriteBkgd = document.getElementById("spriteBkgd");
        var adText = document.getElementById("adBlurb");
        adText.style.marginRight = "0px";
        // add 'thrown' class to start animation
        $("#sprite").removeClass("thrown");
        spriteBkgd.style.opacity = 0;
        cardElement.className += " taken";
        // set thrown strength
        //console.log("animating with " + "transform: translateY("+ (300) + "vh) scale(1)");
        //cardElement.style.transform = "translateY("+ (300) + "vh) scale(1)";
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
            var cardElement = document.getElementById("sprite");
            var spriteBkgd = document.getElementById("spriteBkgd");
            if (currentAd.text != null){
                var adText = document.getElementById("adBlurb");
                adText.innerHTML=currentAd.text;
                adText.style.marginRight = "120px";
            }
            // add 'thrown' class to start animation
            cardElement.className += " thrown";
            spriteBkgd.style.opacity = 1;
            // set thrown strength
            console.log("adding css: " + currentAd.image);
            cardElement.style.backgroundImage = "url(" + currentAd.image + ")";
            console.log("added css: " +  "background-image", "url(" + currentAd.image + ")");
            //allowMove(cardid)
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
