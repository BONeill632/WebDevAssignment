document.addEventListener('DOMContentLoaded', function () {
    var menuToggle = document.getElementById('menuToggle');

    function toggleMenu() {
        var menu = document.querySelector('.menu');
        menu.classList.toggle('show');
        menuToggle.classList.toggle('show'); // Use menuToggle directly here
    }

    if (menuToggle) {
        menuToggle.onclick = function () {
            toggleMenu();
            // Check if the menu has 'show' class and reset onclick accordingly
            if (menuToggle.classList.contains('show')) {
                menuToggle.onclick = function () {
                    toggleMenu();
                };
            } else {
                menuToggle.onclick = null;
            }
        };
    }
});