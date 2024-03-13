// REGEX FOR FORENAME & SURNAME
document.querySelector('form').addEventListener('submit', function(event) {

    // Get name fields
    const forename = event.target.elements.forename.value;
    const surname = event.target.elements.surname.value;

    // Name to have only characters
    const nameRegex = /^[a-zA-Z]+$/;

    // Validate names
    const isValidForename = nameRegex.test(forename);
    const isValidSurname = nameRegex.test(surname);

    // Check for valid names, prevent form post if not valid
    if (!isValidForename || !isValidSurname) {
        alert("Invalid name! Names should only contain letters.");
        event.preventDefault();
    }
});