// Ambil elemen form dan input email
const forgotPasswordForm = document.getElementById('forgot-password-form');
const emailInput = document.getElementById('email');
const passwordDisplay = document.getElementById('password');

// Event listener untuk submit form
forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim(); // Ambil email yang diinput
    const users = JSON.parse(localStorage.getItem('users')) || []; // Ambil data dari Local Storage

    // Cari user berdasarkan email
    const user = users.find((u) => u.email === email);

    if (user) {
        // Tampilkan password di input field jika email ditemukan
        passwordDisplay.value = user.password;
    } else {
        // Kosongkan input field dan tampilkan pesan jika email tidak ditemukan
        passwordDisplay.value = '';
        alert("Email tidak ditemukan. Silakan periksa kembali.");
    }
});
