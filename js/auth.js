// js/auth.js

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('yh_active_user')) || null;
}

function login(username, password) {
    if (username === "admin" && password === "admin123") {
        const adminSession = { username: "admin", role: "admin", name: "System Administrator" };
        localStorage.setItem('yh_active_user', JSON.stringify(adminSession));
        window.location.href = "admin/dashboard.html";
        return true;
    } else if (username === "user" && password === "user123") {
        const userSession = { username: "user", role: "user", name: "Jane Doe", email: "user@yourhope.org" };
        localStorage.setItem('yh_active_user', JSON.stringify(userSession));
        window.location.href = "user/dashboard.html";
        return true;
    }
    return false;
}

function logout() {
    localStorage.removeItem('yh_active_user');
    // Relative fallback execution depending on execution folder Depth
    if (window.location.pathname.includes('/user/') || window.location.pathname.includes('/admin/')) {
        window.location.href = "../login.html";
    } else {
        window.location.href = "login.html";
    }
}

// Guard Route Interceptor Execution
function enforceAccess(requiredRole) {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = "../login.html";
        return;
    }
    if (requiredRole && user.role !== requiredRole) {
        window.location.href = user.role === 'admin' ? "../admin/dashboard.html" : "../user/dashboard.html";
    }
}

// Dynamic Navigation Element Rendering Core
function renderGlobalHeaderFooter(relativePrefix = "") {
    const headerEl = document.getElementById('global-header');
    const footerEl = document.getElementById('global-footer');
    const user = getCurrentUser();

    if(headerEl) {
        let dynamicNavOptions = '';
        if(!user) {
            dynamicNavOptions = `
                <a href="${relativePrefix}login.html">Login</a>
                <a href="${relativePrefix}register.html" class="btn">Register</a>
            `;
        } else {
            const dashLink = user.role === 'admin' ? `${relativePrefix}admin/dashboard.html` : `${relativePrefix}user/dashboard.html`;
            dynamicNavOptions = `
                <a href="${dashLink}" style="font-weight:bold; color:var(--primary);">Dashboard</a>
                <a href="#" onclick="logout()" class="btn btn-secondary">Logout (${user.username})</a>
            `;
        }

        headerEl.innerHTML = `
            <nav class="navbar">
                <div class="logo"><a href="${relativePrefix}index.html">Your<span>Hope</span></a></div>
                <div class="nav-links">
                    <a href="${relativePrefix}index.html">Home</a>
                    <a href="${relativePrefix}about.html">About</a>
                    <a href="${relativePrefix}services.html">Services</a>
                    <a href="${relativePrefix}donate.html">Donate</a>
                    <a href="${relativePrefix}transparency.html">Transparency</a>
                    <a href="${relativePrefix}contact.html">Contact</a>
                    ${dynamicNavOptions}
                </div>
            </nav>
        `;
    }

    if(footerEl) {
        footerEl.innerHTML = `
            <div class="footer-grid">
                <div>
                    <h4>YourHope NGO</h4>
                    <p>Empowering lives, restoring dignity, and creating resilient eco-spaces for global sustainable growth.</p>
                </div>
                <div>
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="${relativePrefix}about.html">Our Story</a></li>
                        <li><a href="${relativePrefix}services.html">Sector Operations</a></li>
                        <li><a href="${relativePrefix}transparency.html">DARPAN Statistics</a></li>
                    </ul>
                </div>
                <div>
                    <h4>Contact Desk</h4>
                    <p>Email: contact@yourhope.org<br>Phone: +1 (555) 019-2831<br>HQ: 104 Hope Street, Sector 4</p>
                </div>
            </div>
            <div class="footer-bottom">
                &copy; 2026 YourHope Social Welfare Organization. All Rights Reserved. Prototype Deployment.
            </div>
        `;
    }
}