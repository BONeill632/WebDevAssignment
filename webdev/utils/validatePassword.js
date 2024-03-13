document.querySelector('form').addEventListener('submit', function(event) {
    const password = event.target.elements.password.value;
    // Password requirements listed below
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    // test validation
    const isValidPassword = passwordRegex.test(password);

    // Alert user of password requirements
    if (!isValidPassword) {
        alert(`Password must contain the following:
        - Minimum 8 characters
        - At least one upper case letter
        - At least one lower case letter
        - At least one digit
        - At least one special character`);
        event.preventDefault(); // Prevent the form from being submitted
    }
});
