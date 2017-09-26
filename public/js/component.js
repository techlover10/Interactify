//var isCompassAttached = false;
//var compassDiff = 0;

window.main = new Vue({
    el: '#main',
    data: {
        client: null,
        requestedSID: getRandomNumber(0, 10000)
    },
    methods: {
        setUser: function (isClient) {
            this.client = isClient;

            document.getElementById("start").remove();
            document.getElementById(isClient ? "table" : "deck").remove();
            $(isClient ? "#deck" : "#table").show();
            if (isClient) {
                // init a deck of 10 cards
                init(10);

                // register phone connection
                socket.emit('phone-connect', this.requestedSID);
                this.clientLoop();
            }
            else {

                socket.emit('table-connect', this.requestedSID);
                // and the URL
                document.getElementById("url").innerHTML = this.requestedSID;
                this.tableLoop();
            }
        },
        clientLoop: function () {
            // init touch events in phone
            var touchTrack = new TouchTrack();
            touchTrack.init(document.getElementById("touchHandler"), touchStart, touchMove, touchEnd);

        },
        tableLoop: function () {
            socket.on('phone-connect', phoneConnected);
            socket.on('phone-throw-sprite', throwCard);
            socket.on('phone-get-sprite', getCard);
        }
    }
})
