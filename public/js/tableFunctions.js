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
        // add 'thrown' class to start animation
        $("#sprite").removeClass("thrown");
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

function throwCard(card) {
    // add card to table
    console.log("throwCard called")
    $.get("/currentAdNoRefresh", function (currentAd){
        if (currentAd == null){
            return;
        }

        // little hack to trigger the animation
        setTimeout(function () {
            var cardElement = document.getElementById("sprite");
            // add 'thrown' class to start animation
            cardElement.className += " thrown";
            // set thrown strength
            console.log("adding css: " + currentAd.image);
            cardElement.style.backgroundImage = "url(" + currentAd.image + ")";
            console.log("added css: " +  "background-image", "url(" + currentAd.image + ")");
            //allowMove(cardid)
        }, 100);
    });

}

function sendAd(){
    throwCard({"id": 0, "isCard": true});
}


function phoneConnected() {
    // remove banner when a phone connects
    console.log("phoneConnected")
    //throwCard({"id": 0, "isCard": true});

    let el = document.getElementById("waiting-for-device")
    if(el){
        el.remove();
    }
    //$("#qr2").show();
}
