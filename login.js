// Cargar los datos del archivo usuarios.json en el LocalStorage
window.addEventListener('DOMContentLoaded', function() {
    fetch('usuarios.json')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('users', JSON.stringify(data));
        })
        .catch(error => console.error('Error al cargar los datos:', error));
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que se recargue la página

    const users = JSON.parse(localStorage.getItem('users'));
    const inputUsuario = document.getElementById('username').value;
    const inputContrasenya = document.getElementById('password').value;

    const user = users.find(u => u.usuario === inputUsuario && u.contrasenya === inputContrasenya); // Se ha cambiado a u.contrasenya

    if (user) {
        const regex = /^[a-zA-Z0-9]+$/;
        if (regex.test(inputContrasenya)) {
            window.location.href = 'index.html';
        } else {
            alert('La contraseña contiene caracteres no permitidos.');
        }
    } else {
        alert('Usuario o contraseña incorrectos.');
    }
});
