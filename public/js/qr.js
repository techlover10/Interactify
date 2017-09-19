var qr = new QCodeDecoder();
var video = document.getElementById('camera');

var elems = [{
    target: document.getElementById("camera-demo"),
    activator: document.getElementById("scanQR"),
    decoder: qr.decodeFromCamera
}];

//Ensures that Canvas is supported in the browser
    if (!qr.isCanvasSupported() || !qr.hasGetUserMedia()){
        alert("Your browser doesn't match the required specs.");
        throw new Error("Canvas and getUserMedia are required");
    }

function _decodeCallback(err, result, e) {
    if (err) {
        console.error(err);
    }

    if (!result) return;

    console.log(result)
}

//In case we have more than one stream
elems.forEach(function (e) {
    e.activator.onclick = function (r) {
        $("#camera-demo").show();
        $("#scanQR").hide();
        //Stop any default behavior associated with buttons
        r && r.preventDefault();
        //Attempt to decode
        e.decoder.call(qr, e.target, _decodeCallback, false)
    };
});