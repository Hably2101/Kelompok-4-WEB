const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// Event untuk tombol toggle
registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

let currentEditIndex = null;

/**
 * Ambil data pengguna dari localStorage
 * @returns {Array} Daftar pengguna
 */
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

/**
 * Simpan data pengguna ke localStorage
 * @param {Array} users Daftar pengguna
 */
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

/**
 * Tambahkan pengguna baru ke daftar
 * @param {Object} user Objek pengguna
 */
function addUser(user) {
    const users = getUsers();
    users.push(user);
    saveUsers(users);
}

/**
 * Temukan pengguna berdasarkan email dan password
 * @param {string} email Email pengguna
 * @param {string} password Password pengguna
 * @returns {Object|null} Data pengguna atau null jika tidak ditemukan
 */
function findUser(email, password) {
    const users = getUsers();
    return users.find(user => user.gmail === email && user.password === password) || null;
}

// Fungsi untuk menyimpan data pengguna (Sign Up)
function handleSignUp(name, email, password) {
    const users = getUsers();

    // Validasi: Apakah email sudah terdaftar
    const existingUser = users.find(user => user.gmail === email);
    if (existingUser) {
        alert('Email sudah terdaftar. Silakan gunakan email lain.');
        return;
    }

    // Tambahkan pengguna baru
    const newUser = { fullname: name, gmail: email, username: name, password };
    addUser(newUser);
    alert('Akun berhasil dibuat! Silakan login.');
}

/**
 * Fungsi untuk proses login
 * @param {string} email Email pengguna
 * @param {string} password Password pengguna
 */
function handleLogin(email, password) {
    // Admin Login
    if (email === 'admin@gmail.com' && password === 'admin123') {
        alert('Selamat datang, Admin!');
        setTimeout(() => {
            window.location.href = 'admin.html';
        }, 500);
        return;
    }

    // Validasi pengguna
    const user = findUser(email, password);
    if (user) {
        alert(`Selamat datang, ${user.fullname || user.username}!`);
        localStorage.setItem('currentUser', JSON.stringify(user)); // Simpan pengguna yang login
        setTimeout(() => {
            window.location.href = 'homepage-percobaan.html';
        }, 500);
    } else {
        alert('Email atau password salah!');
    }
}

// Event: Sign Up
document.querySelector('.sign-up form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.querySelector('input[placeholder="Nama"]').value;
    const email = e.target.querySelector('input[placeholder="Email"]').value;
    const password = e.target.querySelector('input[placeholder="password"]').value;

    if (name && email && password) {
        handleSignUp(name, email, password);
        document.getElementById('container').classList.remove('active'); // Pindah ke form login
    } else {
        alert('Harap isi semua data!');
    }
});

// Event: Sign In
document.querySelector('.sign-in form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[placeholder="Email"]').value;
    const password = e.target.querySelector('input[placeholder="password"]').value;

    if (email && password) {
        handleLogin(email, password);
    } else {
        alert('Harap isi email dan password!');
    }
});


console.log(users); // Cek data pengguna di localStorage
console.log(userData); // Cek data pengguna yang diambil saat login
console.log(localStorage.getItem('users')); // Periksa isi localStorage

