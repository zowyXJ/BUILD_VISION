/**
 * Authentication Script for 3D Model Viewer
 * This script checks if the user is authenticated and redirects to login if not
 */

// Authentication functions
function isAuthenticated() {
    return localStorage.getItem('authToken') === 'authenticated' || 
           sessionStorage.getItem('authToken') === 'authenticated';
}

function logout() {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    window.location.href = 'login.html';
}

function addLogoutButton() {
    const navbar = document.querySelector('.navbar-nav');
    if (navbar) {
        const logoutItem = document.createElement('li');
        logoutItem.className = 'nav-item';
        logoutItem.innerHTML = `
            <a class="nav-link" href="#" onclick="logout()">
                <i class="fas fa-sign-out-alt"></i> Logout
            </a>
        `;
        navbar.appendChild(logoutItem);
    }
}

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    // If on login page and already authenticated, redirect to index
    if (currentPage === 'login.html' && isAuthenticated()) {
        window.location.href = 'index.html';
        return;
    }
    
    // If not on login page and not authenticated, redirect to login
    if (currentPage !== 'login.html' && !isAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }
    
    // If authenticated and not on login page, add logout button
    if (isAuthenticated() && currentPage !== 'login.html') {
        addLogoutButton();
    }
}); 