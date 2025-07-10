function generateQRCode() {
    var input = document.getElementById("qrInput").value;
    if (input.trim() === "") {
        alert("Masukkan teks atau angka terlebih dahulu!");
        return;
    }
    document.getElementById("qrcode").innerHTML = "";
    new QRCode(document.getElementById("qrcode"), {
        text: input,
        width: 128,
        height: 128,
        correctLevel: QRCode.CorrectLevel.H 
    });
}

function downloadQRCode() {
    var qrCanvas = document.querySelector("#qrcode canvas");
    if (!qrCanvas) {
        alert("Buat QR Code terlebih dahulu!");
        return;
    }
    
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var size = qrCanvas.width + 20;
    canvas.width = size;
    canvas.height = size;
    
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, size, size);
    ctx.drawImage(qrCanvas, 10, 10);
    
    var qrImage = canvas.toDataURL("image/png");
    var link = document.createElement("a");
    link.href = qrImage;
    link.download = "qrcode.png";
    link.click();
}