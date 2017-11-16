var idCounter = 0;
var defaultContent = "";
var savedTime = 0;

// has displayed tutorial?
var hasDisplayedTutorial = false;

// Handle the YouTube embed
var tag = document.createElement('script');
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('ad', {
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(mode){
    if (mode.data == 0){
        player.loadVideoById(defaultContent.split('?v=')[1], savedTime);
        player.playVideo();
    }
}


function getAd() {
    // remove card from table
    var cardid = "sprite";
    console.log("getAd called, removing " + cardid);

    // little hack to trigger the animation
    setTimeout(function () {
        var cardElement = document.getElementById(cardid);
        var spriteBkgd = document.getElementById("spriteBkgd");
        var adText = document.getElementById("adBlurb");
        adText.style.marginRight = "0px";
        adText.style.innerHTML = "";
        adText.style.fontFamily = "";
        adText.style.minWidth="";
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

function sendAd(){
    $.get("/currentAdNoRefresh", function (currentAd){
        if (currentAd == null || currentAd.video == null){
            return;
        }

        player.pauseVideo();
        savedTime = player.getCurrentTime();
        player.loadVideoById(currentAd.video.split('?v=')[1]);
        player.playVideo();
    });
}

function phoneConnected() {
    // remove banner when a phone connects
    console.log("phoneConnected")
    //player.playVideo();

    let el = document.getElementById("waiting-for-device")
    if(el){
        el.remove();
    }
}
