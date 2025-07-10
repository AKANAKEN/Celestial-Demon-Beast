class EnigmaMachine {
    constructor(model, reflector, rotors, positions, rings) {
        this.model = model;
        this.reflector = reflector;
        this.rotors = rotors;
        this.positions = positions.map(p => p.charCodeAt(0) - 65);
        this.rings = rings.map(r => r.charCodeAt(0) - 65);
        this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.wiring = {
            'I': 'EKMFLGDQVZNTOWYHXUSPAIBRCJ',
            'II': 'AJDKSIRUXBLHWTMCQGZNPYFVOE',
            'III': 'BDFHJLCPRTXVZNYEIWGAKMUSQO'
        };
        this.reflectors = {
            'UKW B': 'YRUHQSLDPXNGOKMIEBFZCWVJAT'
        };
    }

    rotateRotors() {
        this.positions[2] = (this.positions[2] + 1) % 26;
        if (this.positions[2] === 0) {
            this.positions[1] = (this.positions[1] + 1) % 26;
            if (this.positions[1] === 0) {
                this.positions[0] = (this.positions[0] + 1) % 26;
            }
        }
    }

    passThroughRotor(char, rotor, position, ring, reverse = false) {
        let index = (this.alphabet.indexOf(char) + position - ring + 26) % 26;
        char = reverse ? this.alphabet[this.wiring[rotor].indexOf(this.alphabet[index])] : this.wiring[rotor][index];
        index = (this.alphabet.indexOf(char) - position + ring + 26) % 26;
        return this.alphabet[index];
    }

    passThroughReflector(char) {
        return this.reflectors[this.reflector][this.alphabet.indexOf(char)];
    }

    encodeCharacter(char) {
        if (!this.alphabet.includes(char)) return char;
        this.rotateRotors();
        for (let i = 2; i >= 0; i--) {
            char = this.passThroughRotor(char, this.rotors[i], this.positions[i], this.rings[i]);
        }
        char = this.passThroughReflector(char);
        for (let i = 0; i < 3; i++) {
            char = this.passThroughRotor(char, this.rotors[i], this.positions[i], this.rings[i], true);
        }
        return char;
    }

    processText(text) {
        text = text.toUpperCase().replace(/[^A-Z]/g, '');
        return text.split('').map(char => this.encodeCharacter(char)).join('');
    }
}

function processEnigmaText(mode) {
    const model = document.getElementById("model").value;
    const reflector = document.getElementById("reflector").value;
    const rotors = [
        document.getElementById("rotor1").value,
        document.getElementById("rotor2").value,
        document.getElementById("rotor3").value
    ];
    const positions = [
        document.getElementById("position1").value.toUpperCase(),
        document.getElementById("position2").value.toUpperCase(),
        document.getElementById("position3").value.toUpperCase()
    ];
    const rings = [
        document.getElementById("ring1").value.toUpperCase(),
        document.getElementById("ring2").value.toUpperCase(),
        document.getElementById("ring3").value.toUpperCase()
    ];

    let enigma = new EnigmaMachine(model, reflector, rotors, positions, rings);
    let inputText = document.getElementById(mode === 'encode' ? "plaintext" : "ciphertext").value;
    document.getElementById(mode === 'encode' ? "ciphertext" : "plaintext").value = enigma.processText(inputText);
}
