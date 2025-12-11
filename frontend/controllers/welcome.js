const API_URL = "http://localhost:3000/";

    // Función que se ejecuta apenas carga la página
    async function loadProtectedData() {
        const token = localStorage.getItem('authToken');

        // 1. Verificación básica: ¿Tengo token?
        if (!token) {
            window.location.href = 'index.html';
            return;
        }

        try {
            // 2. Petición al endpoint protegido (/me)
            const response = await fetch(`${API_URL}me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // AQUÍ ES DONDE ENVIAMOS EL TOKEN
                    'Authorization': `Bearer ${token}` 
                }
            });

            // 3. Si el token expiró o es inválido (401 o 403)
            if (!response.ok) {
                throw new Error("Token inválido");
            }

            const data = await response.json();

            // 4. Mostrar los datos en el HTML
            const firstName = localStorage.getItem('firstName');
            const lastName = localStorage.getItem('lastName');
            const mail = localStorage.getItem('mail');



            document.getElementById('loading').style.display = 'none';
            document.getElementById('content').style.display = 'block';
            document.getElementById('userName').innerText = firstName + ' ' + lastName;
            document.getElementById('userEmail').innerText = mail
        } catch (error) {
            // Si algo falla, borramos el token y mandamos al login
            console.error("Acceso denegado:", error);
            alert("Tu sesión ha expirado.");
            localStorage.removeItem('authToken');
            window.location.href = 'index.html';
        }
    }

    async function handleLogout() {
        const token = localStorage.getItem('authToken');
        
        // Opcional: Avisar al backend para ponerlo en lista negra
        try {
            await fetch(`${API_URL}/logout`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
        } catch (e) {
            console.log("Error avisando al backend, pero cerramos localmente");
        }

        // Borrar localmente y redirigir
        localStorage.removeItem('authToken');
        window.location.href = 'index.html';
    }

    // Ejecutar al inicio
    loadProtectedData();