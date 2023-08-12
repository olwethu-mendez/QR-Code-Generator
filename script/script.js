const card = document.querySelector(".card"),
    generateBtn = card.querySelector(".form button"),
    qrImg = card.querySelector(".qr-code img"),
    qrInput = card.querySelector(".form input"),
    closeQr = card.querySelector(".close-qr"),
    qrDownload = document.querySelector(".downloadQr");

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
});

qrDownload.addEventListener("click", () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let MM = today.getMonth() + 1;
    let dd = today.getDate();
    let hh = today.getHours();
    let mm = today.getMinutes();
    let ss = today.getSeconds();

    if(ss < 10) ss = '0' + ss;
    if(mm < 10) mm = '0' + mm;
    if(hh < 10) hh = '0' + hh;
    if(dd < 10) dd = '0' + dd;
    if(MM < 10) MM = '0' + MM;

    const formattedTime = yyyy + '-' + MM + '-' + dd + '-' + hh + '-' + mm + '-' + ss;
   
    let imageName = "qr-image_" + formattedTime.toString() + ".png";
    
    function saveImage(imageLink, name) {
        fetch(imageLink).then((response) => {
            return response.blob().then((b) =>{
                const link = document.createElement('a');
                link.setAttribute("download", name);
                link.href = URL.createObjectURL(b);
                link.click();
            })
        })
    }
    saveImage(qrImg.src,imageName)
})
