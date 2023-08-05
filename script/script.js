const card = document.querySelector(".card"),
    generateBtn = card.querySelector(".form button"),
    qrImg = card.querySelector(".qr-code img"),
    qrInput = card.querySelector(".form input"),
    closeQr = card.querySelector(".close-qr");

generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value;
    if(!qrValue) return;
    generateBtn.innerText = "Generating QR Code...";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${qrValue}`;
    qrImg.addEventListener("load", () => {
        card.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
    });
});

closeQr.addEventListener("click", () => {
    card.classList.remove("active");
    qrInput.value = null;
});

qrInput.addEventListener("keyup", () => {
    if(!qrInput.value){
        card.classList.remove("active");
    }
})

{
    // Getting video feed from back camera
    navigator.mediaDevices.getUserMedia({ video: {facingMode: 'environment'} })
    .then(function(stream) {
        var video = document.getElementById('video');
        video.srcObject = stream;
        video.onloadedmetadata = function() {
            video.play();
        };
    }).catch(function(err) {
        console.log("An error occurred: " + err);
    });

    document.getElementById('capture').addEventListener('click', function() {
        var video = document.getElementById('video');
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        
        // Draw a frame from the video onto the canvas
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

        // converting image on canvas to data url
        var dataUrl = canvas.toDataURL('image/png');

        var xhr = new XMLHttpRequest();

        xhr.open('GET', 'http://api.qrserver.com/v1/read-qr-code/?fileurl=' + encodeURIComponent(dataUrl), true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200){
                var result = JSON.parse(xhr.responseText);

                // Checking if QR code was successfully decoded
                if (result[0].type === "qrcode" && result[0].symbol[0].error == null) {
                    document.getElementById('result').textContent = "QR code text: " + result[0].symbol[0].data;
                } else {
                    document.getElementById('result').textContent = "Could not read QR code.";
                }
            }
        };
        xhr.send();
    });
}