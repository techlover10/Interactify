//var isCompassAttached = false;
//var compassDiff = 0;

window.main = new Vue({
    el: '#main',
    data: {
        client: false,
        requestedSID: 3000,
        adsOptionsView: null,
        adSelected: null
    },
    created: function () {
        var self = this;
        $.ajax({
            url: '/contentList', 
            success: function(data){
                self.adsOptionsView = Object.keys(data);
            },
            ajax: false
        });
        socket.emit('phone-connect', this.requestedSID);
    },
    methods: {
        sendAd: function () {
            var self = this;
            console.log({"id": self.adSelected});
            $.ajax({
                url: '/currentAd',
                type: 'POST',
                data: JSON.stringify({"id": self.adSelected}),
                contentType: "application/json",
                ajax: false
            });
            socket.emit('send-ad', this.requestedSID);
        }
    }
})
