// src/components/utils.js
export function checkPasswordStrength(password) {
    let strength = { score: 0, message: '' };
  
    if (!password) {
      strength.message = 'Password is required.';
      return strength;
    }
  
    // Check password length
    if (password.length >= 8) {
      strength.score++;
    } else {
      strength.message = 'Password should be at least 8 characters long.';
    }
  
    // Check for numbers
    if (/\d/.test(password)) {
      strength.score++;
    } else {
      strength.message = 'Password should contain at least one number.';
    }
  
    // Check for lowercase letters
    if (/[a-z]/.test(password)) {
      strength.score++;
    } else {
      strength.message = 'Password should contain at least one lowercase letter.';
    }
  
    // Check for uppercase letters
    if (/[A-Z]/.test(password)) {
      strength.score++;
    } else {
      strength.message = 'Password should contain at least one uppercase letter.';
    }
  
    // Check for special characters
    if (/[@$!%*?&#]/.test(password)) {
      strength.score++;
    } else {
      strength.message = 'Password should contain at least one special character (@$!%*?&#).';
    }
  
    // Update message based on strength score
    if (strength.score >= 4) {
      strength.message = 'Strong password';
    } else if (strength.score === 3) {
      strength.message = 'Moderate password';
    } else {
      strength.message = 'Weak password';
    }
  
    return strength;
  }
  