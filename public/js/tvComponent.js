//var isCompassAttached = false;
//var compassDiff = 0;

window.main = new Vue({
    el: '#main',
    data: {
        client: false,
        requestedSID: 3000
    },
    created: function () {
        socket.emit('table-connect', this.requestedSID);
        this.tableLoop();
    },
    methods: {
        tableLoop: function () {
            socket.on('phone-connect', phoneConnected);
            socket.on('phone-throw-sprite', sendSprite);
            socket.on('phone-get-sprite', getAd);
            socket.on('send-ad', sendAd);
        }
    }
})
