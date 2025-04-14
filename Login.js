// Login.js
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    // Handle Registration
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            // Validate inputs
            if (!username || !email || !password) {
                alert('Please fill in all fields.');
                return;
            }

            // Simple email validation
            if (!email.includes('@') || !email.includes('.')) {
                alert('Please enter a valid email address.');
                return;
            }

            // Check if user already exists
            const existingUser = localStorage.getItem('user');
            if (existingUser) {
                if (confirm('An account already exists. Do you want to overwrite it?')) {
                    registerUser(username, email, password);
                }
            } else {
                registerUser(username, email, password);
            }
        });
    }

    // Handle Login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const inputUsername = document.getElementById('loginUsername').value.trim();
            const inputPassword = document.getElementById('loginPassword').value;
            const errorMessage = document.getElementById('errorMessage');

            // Validate inputs
            if (!inputUsername || !inputPassword) {
                showError('Please fill in both fields.', errorMessage);
                return;
            }

            try {
                const savedUser = JSON.parse(localStorage.getItem('user'));

                if (!savedUser) {
                    showError('No registered user found. Please register first.', errorMessage);
                    return;
                }

                if (inputUsername === savedUser.username && inputPassword === savedUser.password) {
                    // Successful login
                    alert('Login successful! Redirecting to homepage...');
                    window.location.href = 'homepage.html';
                } else {
                    showError('Invalid username or password.', errorMessage);
                }
            } catch (err) {
                showError('Error accessing user data. Please try again or register.', errorMessage);
                console.error('Login error:', err);
            }
        });
    }

    // Helper function to register user
    function registerUser(username, email, password) {
        const user = { username, email, password };
        localStorage.setItem('user', JSON.stringify(user));
        alert('Registration successful! Redirecting to login...');
        window.location.href = 'login.html';
    }

    // Helper function to show errors
    function showError(message, errorElement) {
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            setTimeout(() => {
                errorElement.style.display = 'none';
            }, 5000);
        } else {
            alert(message);
        }
    }
});
  
  
  

