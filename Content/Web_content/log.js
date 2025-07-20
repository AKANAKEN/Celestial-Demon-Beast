// Fungsi untuk membuat card
        function createCard(website) {
            return `
                <div class="bg-gray-900 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 border border-gray-800">
                    <div class="h-48 bg-gray-800 flex items-center justify-center p-4">
                        <img src="${website.image}" alt="${website.title}" class="max-h-full max-w-full object-contain">
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold mb-2 text-white">${website.title}</h3>
                        <p class="text-gray-400 mb-4">${website.description}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-400">${website.url}</span>
                            <a href="${website.url}" target="_blank" rel="noopener noreferrer" class="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition duration-300">
                                Kunjungi
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }

        // Mengambil data dari file JSON eksternal
        async function loadData() {
            try {
                const response = await fetch('Content/Web_content/data.json');
                if (!response.ok) {
                    throw new Error('Gagal memuat data');
                }
                const websitesData = await response.json();
                
                const container = document.getElementById('cards-container');
                websitesData.forEach(website => {
                    container.innerHTML += createCard(website);
                });
            } catch (error) {
                console.error('Error:', error);
                document.getElementById('cards-container').innerHTML = 
                    '<p class="text-red-500">Gagal memuat data. Pastikan file data.json ada.</p>';
            }
        }

        // Memuat data saat halaman selesai dimuat
        document.addEventListener('DOMContentLoaded', loadData);