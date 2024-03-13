
// REGEX FOIR EMAIL
document.querySelector('form').addEventListener('submit', function(event) {
    const email = event.target.elements.emailAddress.value;

    // email regex to match 'something + @something + com
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(email);

// If its not valid, don't submit the form
    if (!isValidEmail) {
        alert("Invalid email address!");
        event.preventDefault();
    }
});

