const menuIcon = document.getElementById("menu-icon");
const menuList = document.getElementById("menu-list");
const loginButton = document.getElementById("loginButton");
const darkModeToggle = document.getElementById("darkModeToggle");
const navMenu = document.querySelector('nav ul');

// Fungsi untuk membuka dan menutup menu
function toggleMenu() {
    if (navMenu.classList.contains('hidden')) {
        navMenu.classList.remove('hidden'); // Tampilkan menu
    } else {
        navMenu.classList.add('hidden'); // Sembunyikan menu
    }
}

// Menangani klik pada tombol hamburger untuk membuka menu
menuIcon.addEventListener('click', (event) => {
    event.stopPropagation(); // Menghindari klik area luar navbar
    menuIcon.style.display = 'none'; // Menyembunyikan tombol hamburger setelah diklik
    toggleMenu(); // Mengubah status menu
});

// Menangani klik di luar navbar untuk menutup menu
document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && !menuIcon.contains(event.target)) {
        navMenu.classList.add('hidden'); // Menutup menu
        menuIcon.style.display = 'block'; // Menampilkan kembali tombol hamburger
    }
});

// Handle login button click to navigate to login page
loginButton.addEventListener("click", () => {
    window.location.href = "login.html"; // Ganti "login.html" dengan lokasi file login Anda
});

const body = document.body; // Pastikan elemen body terakses dengan benar

// Cek preferensi dark mode pengguna dari localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun" style="color: white;"></i>'; // Ganti warna matahari menjadi putih
} else {
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Ikon bulan tetap normal
}

// Tambahkan event listener untuk tombol dark mode
darkModeToggle.addEventListener('click', () => {
    // Toggle dark mode
    body.classList.toggle('dark-mode');

    // Simpan preferensi pengguna di localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Ganti ikon ke matahari
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Ganti ikon ke bulan
    }
});

