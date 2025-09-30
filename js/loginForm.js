export const handleLoginForm = () => {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('error-message');

        if (email === '123@gmail.com' && password === '123') {
            const loginBox = document.querySelector('.login-box');
            loginBox.classList.add('slide-up');
            setTimeout(() => { window.location.href = 'index.html'; }, 500);
        } else {
            errorMessage.textContent = 'Correo o contraseña incorrectos.';
        }
    });
};