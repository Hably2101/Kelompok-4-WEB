let currentEditIndex = null;

function fetchUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userTableBody = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    userTableBody.innerHTML = '';
    users.forEach((user, index) => {
        const row = userTableBody.insertRow();
        row.insertCell(0).innerText = user.fullname;
        row.insertCell(1).innerText = user.gmail;
        row.insertCell(2).innerText = user.username;
        const actionCell = row.insertCell(3);
        
        // Tombol Edit dengan ikon
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-edit"></i>';  // Menambahkan ikon Edit
        editButton.onclick = () => loadUserToForm(index);
        actionCell.appendChild(editButton);
        
        // Tombol Hapus dengan ikon
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';  // Menambahkan ikon Hapus
        deleteButton.onclick = () => deleteUser(index);
        actionCell.appendChild(deleteButton);
    });
}

function deleteUser(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    fetchUsers();
    clearForm();
}

function loadUserToForm(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users[index];
    document.getElementById('fullname').value = user.fullname;
    document.getElementById('gmail').value = user.gmail;
    document.getElementById('username').value = user.username;
    document.getElementById('password').value = user.password;
    currentEditIndex = index;
}

function saveUser() {
    const fullname = document.getElementById('fullname').value;
    const gmail = document.getElementById('gmail').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!fullname || !gmail || !username || !password) {
        alert("Semua field harus diisi!");
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (currentEditIndex !== null) {
        users[currentEditIndex] = { fullname, gmail, username, password };
    } else {
        users.push({ fullname, gmail, username, password });
    }
    localStorage.setItem('users', JSON.stringify(users));
    fetchUsers();
    clearForm();
}

function clearForm() {
    document.getElementById('fullname').value = '';
    document.getElementById('gmail').value = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    currentEditIndex = null;
}

window.onload = () => {
    fetchUsers();
    document.getElementById('saveButton').onclick = saveUser;
};

console.log(localStorage.getItem('users')); // Periksa apakah formatnya sesuai
