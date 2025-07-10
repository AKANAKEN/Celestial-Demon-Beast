function generatePlayfairMatrix(key) {
    key = key.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
    let matrix = [];
    let seen = new Set();

    key += "ABCDEFGHIKLMNOPQRSTUVWXYZ";

    for (let char of key) {
        if (!seen.has(char)) {
            seen.add(char);
            matrix.push(char);
        }
    }

    let playfairMatrix = Array.from({ length: 5 }, (_, i) => matrix.slice(i * 5, i * 5 + 5));
    displayMatrix(playfairMatrix);
    return playfairMatrix;
}

function displayMatrix(matrix) {
    let matrixDiv = document.getElementById("matrix");
    matrixDiv.innerHTML = "";
    matrix.forEach(row => {
        row.forEach(letter => {
            let cell = document.createElement("div");
            cell.textContent = letter;
            matrixDiv.appendChild(cell);
        });
    });
}

function findPosition(matrix, letter) {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (matrix[i][j] === letter) return [i, j];
        }
    }
    return [-1, -1];
}

function prepareText(text) {
    text = text.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
    let prepared = "";

    for (let i = 0; i < text.length; i++) {
        if (i > 0 && text[i] === text[i - 1] && prepared.length % 2 === 1) {
            prepared += "X";
        }
        prepared += text[i];
    }

    if (prepared.length % 2 === 1) prepared += "X";
    return prepared;
}

function playfairCipher(text, key, encrypt = true) {
    let matrix = generatePlayfairMatrix(key);
    let preparedText = prepareText(text);
    let result = "";

    for (let i = 0; i < preparedText.length; i += 2) {
        let [r1, c1] = findPosition(matrix, preparedText[i]);
        let [r2, c2] = findPosition(matrix, preparedText[i + 1]);

        if (r1 === r2) {
            c1 = (c1 + (encrypt ? 1 : 4)) % 5;
            c2 = (c2 + (encrypt ? 1 : 4)) % 5;
        } else if (c1 === c2) {
            r1 = (r1 + (encrypt ? 1 : 4)) % 5;
            r2 = (r2 + (encrypt ? 1 : 4)) % 5;
        } else {
            [c1, c2] = [c2, c1];
        }

        result += matrix[r1][c1] + matrix[r2][c2];
    }
    return result;
}

function encryptText() {
    let text = document.getElementById("text").value;
    let key = document.getElementById("key").value;
    document.getElementById("result").value = playfairCipher(text, key, true);
}

function decryptText() {
    let text = document.getElementById("text").value;
    let key = document.getElementById("key").value;
    document.getElementById("result").value = playfairCipher(text, key, false);
}

function updateMatrix() {
    let key = document.getElementById("key").value;
    generatePlayfairMatrix(key);
}
