var cards = [];
var idCounter = 0;
var currentClientAd = null;
var loadSite = null; // control the external site loader

function cancelLoading(){
    clearTimeout(loadSite);
    loadSite = null;
    $("#loadingScreen").css("display", "none");
    var card = cards[0];
    var cardElement = document.getElementById(card.id);
    cardElement.classList.remove("moveBot");
    cardElement.classList += " moveTop";
    cards.pop();
}

function addCard() {
    $.ajax({url: "/currentAdNoRefresh", 
        success: function (currentAd) {
            console.log("getting current ad");
            if (currentAd){
                console.log(currentAd);
                // adds a new card to the end of the deck
                var card = {
                    "id": idCounter++,
                    "isCard": true,
                };
                cards.push(card);

                currentClientAd = currentAd;
                document.getElementById("touchHandler").innerHTML +=
                    `<div class="item" style="z-index: 1">
                    <div id="${card.id}" class="card cardH" style="background-image: url(${currentAd.image})">
                    <div class="adContent"/>
                    </div>
                    </div>`;
            }
        },
        async: false});
}

function removeCard(id, strength, direction) {
    console.log("remove card called");
    //if (cards.length === 0) {
    //    console.log("no cards");
    //    return;
    //}
    var card = cards[0];
    if (direction == -1){

        // Placeholder code - right now, do nothing

        //console.log("phone throw");
        //setTimeout(function () {
        //    var sentJSON = { 
        //        tableId: window.main.$data.requestedSID, 
        //        isCard: card.isCard, 
        //        suit: card.suit, 
        //        rank: card.rank, 
        //        angle: getCompassDirection(), 
        //        strength: strength, 
        //        custImg: card.custImg 
        //    };
        //    console.log(sentJSON)
        //    socket.emit('phone-throw-sprite', sentJSON);
        //}, 500);
    } else {
        console.log("phone get");
        setTimeout(function () {
            var sentJSON = { 
                tableId: window.main.$data.requestedSID, 
                isCard: card.isCard, 
                suit: card.suit, 
                rank: card.rank, 
                //angle: getCompassDirection(), 
                strength: strength, 
                custImg: card.custImg,
                cID: idCounter--
            };
            console.log(sentJSON);
            socket.emit('phone-get-sprite', sentJSON);
        }, 500);
    }
}

// SWIPE EVENTs

function touchStart(x, y) {
    // do nothing
}

function touchMove(evt, x, y, offsetX, offsetY) {
    evt.preventDefault();
}

function touchEnd(x, y, offsetX, offsetY, timeTaken) {
    console.log(offsetX)
    console.log(offsetY)

    // add class to animate
    addCard();
    var card = cards[0];
    if (!card){
        console.log(cards);
        console.log("found no card");
        return
    }
    // calculate strength (2000+ pixels per second = 100% strength)
    var distanceY = offsetY;
    var pps = Math.trunc((distanceY * 1.0) / (timeTaken / 1000.0));
    var min = Math.min(2000, pps);
    var percentage = Math.trunc(min / 2000 * 100);
    var cardElement = document.getElementById(card.id);
    if (offsetY < 0){
        removeCard(card.id, percentage, -1);
        setTimeout(function() {
            cardElement.classList.remove("moveBot");
            cardElement.classList += " moveTop";
        }, 1000);
    } else {
        removeCard(card.id, percentage, 1);
        setTimeout(function() {
            cardElement.classList.remove("moveTop");
            cardElement.classList += " moveBot";
        }, 1000);
        setTimeout(function(){
            $('#loadingScreen').css("display", "block");
        }, 2000);
        $.ajax({
            url: '/currentAdTaken',
            success: function(){
                loadSite = setTimeout(function(){
                    window.open(currentClientAd.url, "_blank");
                    $('#loadingScreen').css("display", "none");
                    cardElement.classList.remove("moveBot");
                    cardElement.classList += " moveTop";
                    cards.pop();
                }, 5000);
            },
            async: false
        });
    }
}

