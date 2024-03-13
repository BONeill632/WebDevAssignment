
document.addEventListener('DOMContentLoaded', function () {
    // Get the current path from the URL
    var currentPath = window.location.pathname;

    // Select all navigation links
    var navLinks = document.querySelectorAll(".navbar a.nav-buttons");

    // Loop through each link and check if it matches the current path
    navLinks.forEach(function (link) {
        var linkPath = link.getAttribute("href");

        // Check if the link path matches the current path
        if (linkPath === currentPath) {
            link.classList.add("active");
        }
    });
});