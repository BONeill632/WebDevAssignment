// dateSelect.js
document.addEventListener('DOMContentLoaded', function () {
    var snapshotDateInput = document.getElementById('snapshotDate');

    snapshotDateInput.addEventListener('change', function () {
        var selectedDate = snapshotDateInput.value;
        console.log('Selected date:', selectedDate);

        // Reload the page with the selected date as a query parameter
        window.location.href = '/index/?dateLogged=' + encodeURIComponent(selectedDate);
    });
});
