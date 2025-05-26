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

            // Email validation
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Get existing users or create empty array
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Check if username or email already exists
            const userExists = users.some(user => 
                user.username === username || user.email === email
            );

            if (userExists) {
                alert('Username or email already registered.');
                return;
            }

            // Register new user
            registerUser(username, email, password);
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
                const users = JSON.parse(localStorage.getItem('users')) || [];
                
                // Find matching user (allows login with username or email)
                const matchedUser = users.find(user => 
                    (user.username === inputUsername || user.email === inputUsername) && 
                    user.password === inputPassword
                );

                if (!matchedUser) {
                    showError('Invalid credentials.', errorMessage);
                    return;
                }

                // Store current user session (without password)
                localStorage.setItem('currentUser', JSON.stringify({
                    username: matchedUser.username,
                    email: matchedUser.email
                }));

                alert('Login successful! Redirecting...');
                window.location.href = 'homepage.html';
            } catch (err) {
                showError('System error. Please try again.', errorMessage);
                console.error('Login error:', err);
            }
        });
    }

    // Helper function to register user
    function registerUser(username, email, password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        const newUser = {
            username,
            email,
            password, // Note: In production, always hash passwords!
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        alert('Registration successful! You can now login.');
        registerForm.reset(); // Clear the form
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
  
  
  

