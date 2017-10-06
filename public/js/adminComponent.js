//var isCompassAttached = false;
//var compassDiff = 0;

window.main = new Vue({
    el: '#main',
    data: {
        client: false,
        requestedSID: 3000
    },
    created: function () {
        socket.emit('admin-connect', this.requestedSID);
    },
    methods: {
        sendAd: function () {
            socket.emit('send-ad', this.requestedSID);
        }
    }
})
