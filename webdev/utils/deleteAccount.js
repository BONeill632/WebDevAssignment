document.addEventListener('DOMContentLoaded', function () {
    const deleteButton = document.getElementById('deleteAccountButton');

    deleteButton.addEventListener('click', function (event) {
        event.preventDefault();

        // Display a confirmation dialog
        const isConfirmed = confirm('Are you sure you want to delete your account?');

        // If the user confirms, proceed to the deletion page
        if (isConfirmed) {
            window.location.href = '/deleteAccount';
        }
    });
});