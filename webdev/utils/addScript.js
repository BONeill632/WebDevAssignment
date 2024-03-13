document.querySelector('form').addEventListener('submit', function (event) {
    const password = event.target.elements.userPassword.value;
    if (password) {
        const script = document.createElement('script');
        script.src = "../utils/validatePassword.js";
        document.head.appendChild(script);
    }
});