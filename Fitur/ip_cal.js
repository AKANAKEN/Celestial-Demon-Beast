function ipToArray(ip) {
    return ip.split('.').map(num => parseInt(num, 10));
}

function arrayToIp(arr) {
    return arr.join('.');
}

function getNetmask(prefix) {
    let mask = Array(4).fill(0);
    for (let i = 0; i < prefix; i++) {
        mask[Math.floor(i / 8)] |= (1 << (7 - (i % 8)));
    }
    return mask;
}

function getClass(ip) {
    let firstOctet = ip[0];
    if (firstOctet >= 1 && firstOctet <= 126) return "A";
    if (firstOctet >= 128 && firstOctet <= 191) return "B";
    if (firstOctet >= 192 && firstOctet <= 223) return "C";
    if (firstOctet >= 224 && firstOctet <= 239) return "D (Multicast)";
    if (firstOctet >= 240 && firstOctet <= 255) return "E (Experimental)";
    return "Unknown";
}

function calculateSubnet() {
    let ip = ipToArray(document.getElementById("ip").value);
    let prefix = parseInt(document.getElementById("mask").value);
    let netmask = getNetmask(prefix);
    let wildcardMask = netmask.map(octet => 255 - octet);
    let network = ip.map((octet, i) => octet & netmask[i]);
    let broadcast = ip.map((octet, i) => octet | wildcardMask[i]);
    let hostMin = [...network];
    hostMin[3] += 1;
    let hostMax = [...broadcast];
    hostMax[3] -= 1;
    let totalHosts = Math.pow(2, 32 - prefix) - 2;
    let ipClass = getClass(ip);
    
    document.getElementById("network").innerText = arrayToIp(network);
    document.getElementById("netmask").innerText = arrayToIp(netmask);
    document.getElementById("wildcard").innerText = arrayToIp(wildcardMask);
    document.getElementById("broadcast").innerText = arrayToIp(broadcast);
    document.getElementById("hostmin").innerText = arrayToIp(hostMin);
    document.getElementById("hostmax").innerText = arrayToIp(hostMax);
    document.getElementById("hosts").innerText = totalHosts;
    document.getElementById("class").innerText = ipClass;
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        calculateSubnet();
    }
});