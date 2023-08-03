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