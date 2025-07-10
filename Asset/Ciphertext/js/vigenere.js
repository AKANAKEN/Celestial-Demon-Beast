function vigenereCipher(text, key, encrypt = true) {
    let result = "";
    text = text.toUpperCase();
    key = key.toUpperCase();
    
    let keyIndex = 0;
    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        if (char.match(/[A-Z]/)) {
            let shift = key.charCodeAt(keyIndex % key.length) - 65;
            let base = char.charCodeAt(0) - 65;

            let newChar = encrypt 
                ? String.fromCharCode((base + shift) % 26 + 65)
                : String.fromCharCode((base - shift + 26) % 26 + 65);

            result += newChar;
            keyIndex++;
        } else {
            result += char; // Biarkan karakter selain huruf tetap sama
        }
    }
    return result;
}

function encryptText() {
    let text = document.getElementById("text").value;
    let key = document.getElementById("key").value;
    document.getElementById("result").value = vigenereCipher(text, key, true);
}

function decryptText() {
    let text = document.getElementById("text").value;
    let key = document.getElementById("key").value;
    document.getElementById("result").value = vigenereCipher(text, key, false);
}
