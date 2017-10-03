var idCounter = 0;

function removeCardFromTable(id, angle, suit, rank){
    //document.getElementById("card" + id).remove()

}

function addImageToTable(id, custImg, angle) {
    $.get("/currentAd", function (currentAd){
    document.body.innerHTML +=
        `<div class="path" style="transform: rotate(${angle}deg)">
            <div id="${id}" class="cardT custom ${currentAd.name}">
                <img class="customImg" src="` + custImg+`" >
            </div>
        </div>`;
    });
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
        console.log("animating with " + "transform: translateY("+ (300) + "vh) scale(1)");
        cardElement.style = "transform: translateY("+ (300) + "vh) scale(1)";
        allowMove(cardid)
    }, 5);
    console.log("animation complete");

    setTimeout(function(){
        $("#sprite").removeClass("taken");
        $.get("/currentAd", function (currentAd){
            $("#sprite").removeClass(currentAd);
        });
        removeCardFromTable(cardid, card.angle, card.suit, card.rank);
    }, 1500);
}

function throwCard(card) {
    // add card to table
    console.log("throwCard called")

    // little hack to trigger the animation
    setTimeout(function () {
        var cardElement = document.getElementById("sprite");
        $.get("/currentAd", function (currentAd){
            $("#sprite").addClass(currentAd.name);
        });
        // add 'thrown' class to start animation
        cardElement.className += " thrown";
        // set thrown strength
        console.log("throwing with " + "transform: translateX(" + (100 - card.strength) + "vw) scale(1)");
        cardElement.style = "transform: translateX(" + (100 - card.strength) + "vw) scale(1)";
        //allowMove(cardid)
    }, 100);

    //setTimeout(function(){
    //    $("#"+cardid).removeClass("thrown");
    //}, 1500);
}

function phoneConnected() {
    // remove banner when a phone connects
    console.log("phoneConnected")
    throwCard({"id": 0, "isCard": true});

    let el = document.getElementById("waiting-for-device")
    if(el){
        el.remove();
    }
    //$("#qr2").show();
}
