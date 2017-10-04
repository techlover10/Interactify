//var isCompassAttached = false;
//var compassDiff = 0;

window.main = new Vue({
    el: '#main',
    data: {
        client: true,
        requestedSID: 3000
    },
    created: function (){
        // init a deck of 10 cards
        init(10);

        // register phone connection
        socket.emit('phone-connect', this.requestedSID);
        this.clientLoop();
    },
    methods: {
        clientLoop: function () {
            // init touch events in phone
            var touchTrack = new TouchTrack();
            touchTrack.init(document.getElementById("touchHandler"), touchStart, touchMove, touchEnd);
        },
    }
})
