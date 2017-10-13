var cards = [];
var idCounter = 0;
var currentClientAd = null;
var loadSite = null; // control the external site loader

function cancelLoading(){
    clearTimeout(loadSite);
    loadSite = null;
    $("#loadingScreen").css("display", "none");
    var cardElement = document.getElementById('remoteAd');
    cardElement.classList.remove("moveBot");
    cardElement.classList += " moveTop";
}

function getAdClient() {
    $.ajax({url: "/currentAdNoRefresh", 
        success: function (currentAd) {
            console.log("getting current ad");
            if (currentAd){
                console.log(currentAd);
                currentClientAd = currentAd;
                document.getElementById('remoteAd').style.backgroundImage = "url(" + currentAd.image + ")";
            }
        },
        async: false});
}

function removeCard() {
    console.log("remove card called");
    console.log("phone get");
    setTimeout(function () {
        socket.emit('phone-get-sprite', window.main.$data.requestedSID);
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

    // add class to animate
    getAdClient();

    // calculate strength (2000+ pixels per second = 100% strength)
    var distanceY = offsetY;
    var pps = Math.trunc((distanceY * 1.0) / (timeTaken / 1000.0));
    var min = Math.min(2000, pps);
    var percentage = Math.trunc(min / 2000 * 100);
    var cardElement = document.getElementById("remoteAd");
    if (offsetY < -10){
        removeCard();
        setTimeout(function() {
            cardElement.classList.remove("moveBot");
            cardElement.classList += " moveTop";
        }, 1000);
    } else if (offsetY > 10){
        removeCard();
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
                }, 5000);
            },
            async: false
        });
    }
}

