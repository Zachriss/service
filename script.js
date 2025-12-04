// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });
});

// Comment System Functions (for comments.html)
function loadComments() {
    const comments = JSON.parse(localStorage.getItem('portfolioComments')) || [];
    const commentsContainer = document.getElementById('commentsContainer');
    
    if (commentsContainer) {
        commentsContainer.innerHTML = '';
        
        if (comments.length === 0) {
            commentsContainer.innerHTML = '<p class="no-comments">No comments yet. Be the first to comment!</p>';
            return;
        }
        
        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment';
            commentDiv.innerHTML = `
                <h4>${comment.name}</h4>
                <small>${comment.date}</small>
                <p>${comment.text}</p>
            `;
            commentsContainer.appendChild(commentDiv);
        });
    }
}

function submitComment() {
    const nameInput = document.getElementById('commentName');
    const textInput = document.getElementById('commentText');
    
    if (!nameInput.value.trim() || !textInput.value.trim()) {
        alert('Please fill in both name and comment fields.');
        return;
    }
    
    const comments = JSON.parse(localStorage.getItem('portfolioComments')) || [];
    
    const newComment = {
        name: nameInput.value.trim(),
        text: textInput.value.trim(),
        date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };
    
    comments.unshift(newComment); // Add new comment at the beginning
    localStorage.setItem('portfolioComments', JSON.stringify(comments));
    
    // Clear inputs
    nameInput.value = '';
    textInput.value = '';
    
    // Reload comments
    loadComments();
    alert('Thank you for your comment!');
}

// Login System (Simple - for demo only)
function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // DEMO ONLY - In real app, this would connect to a backend
    if (username && password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        alert('Login successful! You can now request services.');
        window.location.href = 'services.html';
        return false; // Prevent form submission
    } else {
        alert('Please enter both username and password.');
        return false;
    }
}

function checkLogin() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        return true;
    }
    return false;
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    alert('Logged out successfully.');
    window.location.href = 'index.html';
}

// Service Request Function
function requestService(serviceName) {
    if (!checkLogin()) {
        alert('Please login first to request services.');
        window.location.href = 'login.html';
        return;
    }
    
    const username = localStorage.getItem('username') || 'User';
    const requests = JSON.parse(localStorage.getItem('serviceRequests')) || [];
    
    const newRequest = {
        service: serviceName,
        user: username,
        date: new Date().toLocaleString(),
        status: 'Pending'
    };
    
    requests.push(newRequest);
    localStorage.setItem('serviceRequests', JSON.stringify(requests));
    
    alert(`Thank you, ${username}! Your request for "${serviceName}" has been submitted. I will contact you soon.`);
}

// Initialize comments on page load
if (document.getElementById('commentsContainer')) {
    loadComments();
}