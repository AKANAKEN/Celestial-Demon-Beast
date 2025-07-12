
        // --- KONFIGURASI ---
        const API_URL = "https://webdevcdb.github.io/API_SERVER_303076/010000110100010001000010/Staff_data.json";
        const DEFAULT_AVATAR = "https://webdevcdb.github.io/API_SERVER_303076/010000110100010001000010/Foto/CDB.gif";

        // --- ELEMEN DOM ---
        const staffContainer = document.getElementById("staff-container");
        const modal = document.getElementById('staff-modal');
        const closeModalBtn = document.getElementById('close-modal');

        // --- FUNGSI UTAMA ---

        /**
         * Mengambil data staff dari API dan menampilkannya di halaman.
         */
        async function renderStaffCards() {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const staffData = await response.json();

                if (!Array.isArray(staffData)) {
                    console.error("Data dari API bukan array!");
                    staffContainer.innerHTML = `<p class="text-center col-span-full">Gagal memuat data. Format tidak sesuai.</p>`;
                    return;
                }
                
                staffContainer.innerHTML = ""; // Kosongkan container sebelum diisi

                staffData.forEach(staff => {
                    const card = document.createElement('div');
                    card.className = 'staff-card bg-gray-800 rounded-xl p-6 text-center cursor-pointer border border-transparent hover:border-purple-500';
                    card.innerHTML = `
                        <div class="relative mb-4 mx-auto w-32 h-32">
                            <img src="${staff.avatarUrl || DEFAULT_AVATAR}" alt="${staff.username}" class="w-full h-full rounded-full object-cover border-4 border-purple-600">
                        </div>
                        <h3 class="text-xl font-bold mb-1 truncate">${staff.username || 'Unknown'}</h3>
                        <p class="text-purple-400">${staff.position || 'N/A'}</p>
                    `;
                    
                    card.addEventListener('click', () => openStaffModal(staff));
                    staffContainer.appendChild(card);
                });

            } catch (error) {
                console.error("Gagal mengambil atau menampilkan data staff:", error);
                staffContainer.innerHTML = `<p class="text-center col-span-full text-red-500">Terjadi kesalahan saat mengambil data staff. Silakan coba lagi nanti.</p>`;
            }
        }

        /**
         * Membuka dan mengisi modal dengan detail staff yang dipilih.
         * @param {object} staff - Objek data staff.
         */
        function openStaffModal(staff) {
            document.getElementById('modal-staff-image').src = staff.avatarUrl || DEFAULT_AVATAR;
            document.getElementById('modal-staff-username').textContent = staff.username || 'N/A';
            document.getElementById('modal-staff-nickname').textContent = `Nickname: ${staff.nickame || 'N/A'}`;
            document.getElementById('modal-staff-position').textContent = staff.position || 'N/A';
            document.getElementById('modal-staff-skill').textContent = staff.skill || 'N/A';
            document.getElementById('modal-staff-country').textContent = staff.country || 'N/A';
            document.getElementById('modal-staff-status').textContent = staff.status || 'N/A';
            
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Mencegah scroll di background
        }

        /**
         * Menutup modal detail staff.
         */
        function closeStaffModal() {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto'; // Mengembalikan scroll di background
        }

        // --- EVENT LISTENERS ---

        // Event listener untuk tombol tutup modal
        closeModalBtn.addEventListener('click', closeStaffModal);

        // Event listener untuk menutup modal saat mengklik di luar area konten modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeStaffModal();
            }
        });

        // Event listener untuk menutup modal dengan tombol 'Escape'
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && !modal.classList.contains('hidden')) {
                closeStaffModal();
            }
        });

        // --- INISIALISASI ---
        // Memanggil fungsi untuk memuat data saat halaman selesai dimuat
        document.addEventListener('DOMContentLoaded', renderStaffCards);

 