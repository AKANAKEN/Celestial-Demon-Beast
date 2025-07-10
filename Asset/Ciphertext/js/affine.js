function modInverse(a, m) {
    for (let i = 1; i < m; i++) {
        if ((a * i) % m === 1) return i;
    }
    return null; // No modular inverse
}

function affineEncrypt(text, a, b) {
    text = text.toUpperCase().replace(/[^A-Z]/g, "");
    let encryptedText = "";

    for (let char of text) {
        let x = char.charCodeAt(0) - 65;
        let encryptedChar = ((a * x + b) % 26) + 65;
        encryptedText += String.fromCharCode(encryptedChar);
    }
    return encryptedText;
}

function affineDecrypt(text, a, b) {
    let a_inv = modInverse(a, 26);
    if (a_inv === null) {
        alert("Invalid A value! It must be coprime with 26.");
        return "";
    }

    text = text.toUpperCase().replace(/[^A-Z]/g, "");
    let decryptedText = "";

    for (let char of text) {
        let y = char.charCodeAt(0) - 65;
        let decryptedChar = (a_inv * (y - b + 26) % 26) + 65;
        decryptedText += String.fromCharCode(decryptedChar);
    }
    return decryptedText;
}

function calculateCipher() {
    let text = document.getElementById("text").value;
    let a = parseInt(document.getElementById("a").value);
    let b = parseInt(document.getElementById("b").value);
    let mode = document.querySelector('input[name="mode"]:checked').value;
    let result = "";

    if (mode === "encrypt") {
        result = affineEncrypt(text, a, b);
    } else {
        result = affineDecrypt(text, a, b);
    }

    document.getElementById("result").innerText = result;
}
