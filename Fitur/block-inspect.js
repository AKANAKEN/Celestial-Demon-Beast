// Blokir Klik Kanan
document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});

// Blokir Shortcut Keyboard
document.addEventListener("keydown", function (event) {
    if (event.key === "F12" || 
        (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J")) || 
        (event.ctrlKey && event.key === "U")) {
        event.preventDefault();
    }
});

// Deteksi Developer Tools dan Kosongkan Halaman
(function() {
    let devtoolsOpen = false;
    
    const element = new Image();
    Object.defineProperty(element, 'id', {
        get: function() {
            devtoolsOpen = true;
            throw new Error("Developer Tools Detected!");
        }
    });

    setInterval(function() {
        devtoolsOpen = false;
        console.log('%c', element); // Memicu getter untuk mendeteksi DevTools

        if (devtoolsOpen) {
            document.body.innerHTML = ""; // Mengosongkan halaman
            alert("Inspect Element terdeteksi! Halaman ini dikosongkan.");
            window.location.href = "about:blank"; // Redirect ke halaman kosong
        }
    }, 1000);
})();

// Mencegah elemen dengan class tertentu dihapus dari Developer Tools
const protectElements = document.querySelectorAll('.protected');

protectElements.forEach(element => {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.removedNodes.length > 0) {
                mutation.removedNodes.forEach(node => {
                    if (node.classList && node.classList.contains('protected')) {
                        document.body.appendChild(node); // Mengembalikan elemen yang dihapus
                        alert("Elemen penting telah dihapus! Mengembalikannya...");
                    }
                });
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
});
