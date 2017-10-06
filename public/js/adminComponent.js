//var isCompassAttached = false;
//var compassDiff = 0;

window.main = new Vue({
    el: '#main',
    data: {
        client: false,
        requestedSID: 3000,
        adsOptions: null,
        adSelected: null
    },
    created: function () {
        var self = this;
        $.ajax({
            url: '/adsList', 
            success: function(data){
            self.adsOptions = data;
            },
            ajax: false
        });
        socket.emit('admin-connect', this.requestedSID);
    },
    methods: {
        sendAd: function () {
            var self = this;
            $.ajax({
                url: '/currentAd',
                type: 'POST',
                data: {"data": self.adSelected},
                dataType: "application/json",
                ajax: false
            });
            socket.emit('send-ad', this.requestedSID);
        }
    }
})
