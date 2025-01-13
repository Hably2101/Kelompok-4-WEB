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
    window.location.href = "index.html"; // Ganti "login.html" dengan lokasi file login Anda
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

const navLinks = document.querySelectorAll("nav ul li a");

// Tambahkan event listener pada semua tautan navbar
navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");

        if (href === "homepage-percobaan.html") {
            // Biarkan default untuk navigasi ke homepage.html
            return;
        }

        if (href.startsWith("#")) {
            event.preventDefault(); // Hentikan aksi default
            const targetSection = document.querySelector(href);
            if (targetSection) {
                // Gulir ke bagian yang ditargetkan
                targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    });
});

const homeLink = document.getElementById("home");

// Fungsi untuk memeriksa apakah kita berada di homepage.html
function isHomepage() {
    return window.location.pathname.includes("homepage-percobaan.html");
}

// Menambahkan event listener untuk tombol Home
homeLink.addEventListener("click", (event) => {
    if (isHomepage()) {
        // Jika kita di homepage.html, gulir ke atas halaman
        event.preventDefault();  // Mencegah aksi default (berpindah halaman)
        window.scrollTo({
            top: 0,   // Gulir ke atas
            behavior: "smooth"  // Gulir secara smooth
        });
    } else {
        // Jika kita tidak di homepage.html, arahkan ke homepage.html
        window.location.href = "homepage-percobaan.html";
    }
});


// Redirect to news URL
function goToNews(url) {
    window.location.href = url;
}

// Smooth scroll for About Us
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Daftar gambar profil (ganti dengan URL gambar Anda)
const profileImages = [
    "assets/language/kucing-1.jpg",
    "assets/language/kucing-2.jpeg",
    "assets/language/kucing-3.jpg",
    "assets/language/kucing-4.jpg",
    "assets/language/kucing-5.jpg",
    "assets/language/kucing-6.jpg",
    "assets/language/kucing-7.jpg",
    "assets/language/kucing-8.jpeg",
    "assets/language/kucing-9.jpg",
    "assets/language/kucing-10.jpg"
];

// Daftar warna latar belakang untuk komentar
const backgroundColors = [
    "#FFEBEE", "#E8F5E9", "#FFEB3B", "#FFF3E0", "#F3E5F5", "#E0F7FA", "#FFCDD2", "#F1F8E9", "#F9FBE7", "#ECEFF1"
];

// Daftar untuk menyimpan komentar
let comments = [];

// Fungsi untuk menambahkan atau mengedit komentar
function submitComment(commentId = null) {
    const name = document.getElementById("commentName").value;
    const content = document.getElementById("commentContent").value;

    if (name && content) {
        if (commentId) {
            // Jika ada commentId, artinya ini adalah edit komentar
            const comment = comments.find(comment => comment.id === commentId);
            comment.name = name;
            comment.content = content;
        } else {
            // Jika tidak ada commentId, artinya ini adalah komentar baru
            const newComment = {
                id: new Date().getTime(),
                name: name,
                content: content,
                image: profileImages[comments.length % profileImages.length], // Gambar bergantian
                backgroundColor: backgroundColors[comments.length % backgroundColors.length] // Warna latar belakang bergantian
            };
            comments.push(newComment);
        }

        // Menampilkan komentar yang baru saja ditambahkan atau diedit
        renderComments();
        
        // Reset form
        document.getElementById("commentName").value = '';
        document.getElementById("commentContent").value = '';
    }
}

// Fungsi untuk merender semua komentar
function renderComments() {
    const commentsList = document.getElementById("commentsList");
    commentsList.innerHTML = ''; // Clear comments

    comments.forEach(comment => {
        const commentCard = document.createElement("div");
        commentCard.classList.add("comment-card");

        // Menentukan warna teks berdasarkan latar belakang (terang atau gelap)
        const textColor = getTextColor(comment.backgroundColor);
        
        commentCard.innerHTML = `
            <img src="${comment.image}" alt="Profile Picture">
            <div class="comment-details">
                <h4 style="color: ${textColor};">${comment.name}</h4>
                <p id="content-${comment.id}" style="color: ${textColor};">${comment.content}</p>
                <input type="text" id="edit-${comment.id}" class="edit-input" style="display:none;" value="${comment.content}" />
                <input type="text" id="editName-${comment.id}" class="edit-input" style="display:none;" value="${comment.name}" />
            </div>
            <div class="actions">
                <button onclick="editComment(${comment.id})">
                    <i class="fas fa-edit"></i> <!-- Icon edit -->
                </button>
                <button onclick="deleteComment(${comment.id})">
                    <i class="fas fa-trash-alt"></i> <!-- Icon delete -->
                </button>
            </div>
        `;
        
        commentCard.style.backgroundColor = comment.backgroundColor;
        commentsList.appendChild(commentCard);
    });
}

// Fungsi untuk menentukan warna teks yang sesuai berdasarkan warna latar belakang
function getTextColor(backgroundColor) {
    // Menghitung luminansi warna latar belakang (metode sederhana)
    const color = hexToRgb(backgroundColor);
    const luminance = (0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b) / 255;
    return luminance > 0.5 ? "#333" : "#FFF"; // Teks gelap jika latar belakang terang, teks terang jika latar belakang gelap
}

// Fungsi untuk mengkonversi kode warna hex ke rgb
function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

// Fungsi untuk mengedit komentar
function editComment(id) {
    const comment = comments.find(comment => comment.id === id);
    if (comment) {
        // Tampilkan form input untuk mengedit nama dan komentar
        document.getElementById("commentName").value = comment.name;
        document.getElementById("commentContent").value = comment.content;

        // Tombol Kirim Komentar akan mengedit komentar yang dipilih
        const submitButton = document.querySelector(".submit-button");
        submitButton.setAttribute("onclick", `submitComment(${id})`);
    }
}

// Fungsi untuk menghapus komentar
function deleteComment(id) {
    comments = comments.filter(comment => comment.id !== id);
    renderComments();
}


