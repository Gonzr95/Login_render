//const API_URL = "http://gonzadev.tplinkdns.com:3000"; 
import { renderApiUrl, loginRoute, registerRoute } from './config.js';
const API_URL = "http://localhost:3000";


    // --- LÓGICA DE LOGIN ---
    async function handleLogin() {
        const mail = document.getElementById('loginEmail').value;
        const pass = document.getElementById('loginPass').value;
        const errorDiv = document.getElementById('loginError');

        try {
            const response = await fetch(`${renderApiUrl}${loginRoute}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mail, pass })
            });

            const data = await response.json();

            if (!response.ok) {
                // Si hay error (400, 401, etc), lo mostramos
                errorDiv.innerText = data.message || "Error al iniciar sesión";
                return;
            }

            // --- ÉXITO ---
            // 1. Guardamos el token en el "disco duro" del navegador
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('firstName', data.user.firstName);
            localStorage.setItem('lastName', data.user.lastName);
            localStorage.setItem('mail', data.user.mail);
            // 2. Redirigimos a la página protegida
            window.location.href = 'welcome.html';

        } catch (error) {
            console.error(error);
            errorDiv.innerText = "Error de conexión con el servidor";
        }
    }

    // --- LÓGICA DE REGISTRO ---
    async function handleRegister() {
        const firstName = document.getElementById('regName').value;
        const lastName = document.getElementById('regLastname').value;
        const mail = document.getElementById('regEmail').value;
        const pass = document.getElementById('regPass').value;
        const errorDiv = document.getElementById('regError');

        try {
            const response = await fetch(`${renderApiUrl}${registerRoute}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, mail, pass })
            });

            const data = await response.json();

            if (!response.ok) {
                // Si Zod devuelve errores detallados, mostramos el primero
                if(data.errors) {
                    errorDiv.innerText = data.errors[0].message;
                } else {
                    errorDiv.innerText = data.message;
                }
                return;
            }

            alert("Usuario registrado con éxito. Ahora puedes iniciar sesión.");
            // Limpiar formulario
            document.getElementById('regEmail').value = "";
            document.getElementById('regPass').value = "";

        } catch (error) {
            console.error(error);
            errorDiv.innerText = "Error de conexión";
        }
    }



const loginBtn = document.getElementById('login-btn');
loginBtn.addEventListener('click', handleLogin);

const registerBtn = document.getElementById('register-btn');
registerBtn.addEventListener('click', handleRegister);