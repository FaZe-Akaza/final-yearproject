document.addEventListener('DOMContentLoaded', function() {
    // Function to show feedback message
    function showFeedback(message, isSuccess) {
      const feedback = document.getElementById('feedbackMessage');
      const feedbackText = document.getElementById('feedbackText');
      
      // Set message content and style
      feedbackText.textContent = message;
      feedback.className = `feedback-message ${isSuccess ? 'success' : 'error'}`;
      
      // Update icon based on message type
      const icon = feedback.querySelector('i');
      icon.className = isSuccess ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
      
      // Show the message
      feedback.style.display = 'flex';
      setTimeout(() => feedback.classList.add('show'), 10);
      
      // Hide after 5 seconds
      setTimeout(() => {
        feedback.classList.remove('show');
        setTimeout(() => feedback.style.display = 'none', 300);
      }, 5000);
    }
  
    // Registration form handler
    document.getElementById('registerForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const username = document.getElementById('username').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const confirmPassword = document.getElementById('confirmPassword')?.value.trim();
      
      // Basic validation
      if (!username || !email || !password) {
        showFeedback('Please fill in all fields', false);
        return;
      }
      
      // Check if confirm password exists and matches
      if (confirmPassword && password !== confirmPassword) {
        showFeedback('Passwords do not match', false);
        return;
      }
      
      // Simple email validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFeedback('Please enter a valid email address', false);
        return;
      }
      
      // Password length check
      if (password.length < 6) {
        showFeedback('Password must be at least 6 characters', false);
        return;
      }
      
      // Create user object with hashed password
      const user = {
        id: Date.now().toString(), // Unique ID
        username: username,
        email: email,
        password: simpleHash(password), // Simple hashing (not secure for production)
        createdAt: new Date().toISOString()
      };
      
      // Get existing users
      let users = JSON.parse(localStorage.getItem('users')) || [];
      
      // Check if email or username exists
      if (users.some(u => u.email === email)) {
        showFeedback('This email is already registered', false);
        return;
      }
      
      if (users.some(u => u.username === username)) {
        showFeedback('This username is already taken', false);
        return;
      }
      
      // Add new user
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Show success message
      showFeedback('Registration successful! Redirecting to login...', true);
      
      // Clear form
      this.reset();
      
      // Redirect after delay
      setTimeout(() => {
        window.location.href = 'login page .html';
      }, 2000);
    });
  
    // Simple hashing function (not cryptographically secure)
    function simpleHash(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
      }
      return hash.toString();
    }
  });
  