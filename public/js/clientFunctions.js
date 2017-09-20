var cards = [];
var idCounter = 0;

function addCard() {
    // adds a new card to the end of the deck
    var card = {
        "id": idCounter++,
        "isCard": true,
    };
    cards.push(card);

    document.getElementById("touchHandler").innerHTML +=
        `<div class="item">
            <div id="${card.id}" class="card cardH advertisement">
                <div class="face"/>
            </div>
        </div>`;
}

function removeCard(id, strength) {
    if (cards.length === 0) {
        return;
    }
    var card = cards[0];
    setTimeout(function () {
        document.getElementById(id).parentElement.remove();
        //addCard();
        var sentJSON = { 
            tableId: window.main.$data.requestedSID, 
            isCard: card.isCard, 
            suit: card.suit, 
            rank: card.rank, 
            angle: getCompassDirection(), 
            strength: strength, 
            custImg: card.custImg 
        };
        console.log(sentJSON)
        socket.emit('phone-throw-card', sentJSON);
    }, 500);
}

// SWIPE EVENTS

function touchStart(x, y) {
    // do nothing
}

function touchMove(evt, x, y, offsetX, offsetY) {
    evt.preventDefault();
}

function touchEnd(x, y, offsetX, offsetY, timeTaken) {
    console.log(offsetX)
    console.log(offsetY)

    // 10 pixels swipe up = min threshold
    //if (offsetY < 0) {
    //    return;
    //}

    // add class to animate
    var card = cards[0];
    var cardElement = document.getElementById(card.id);
    if (offsetY < 0){
        cardElement.classList.remove("moveBot");
        cardElement.classList += " moveTop";
    } else {
        cardElement.classList.remove("moveTop");
        cardElement.classList += " moveBot";
    }

    // calculate strength (2000+ pixels per second = 100% strength)
    var distanceY = offsetY;
    var pps = Math.trunc((distanceY * 1.0) / (timeTaken / 1000.0));
    var min = Math.min(2000, pps);
    var percentage = Math.trunc(min / 2000 * 100);

    //removeCard(card.id, percentage);
}


