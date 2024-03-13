const tableLabels = (className) => {
    const tableColumns = document.getElementsByClassName(className);

    Array.from(tableColumns).forEach((tableColumn) => {
        if (window.innerWidth > 960) {
            // Remove the label if it exists
            const labelElement = tableColumn.querySelector('.tableLabel');
            if (labelElement) {
                labelElement.remove();
                if (className === "Triggers" || className === "Date logged") {
                    tableColumn.classList.remove("number");
                }
            }
        } else {
            // Add the label if it doesn't exist
            if (!tableColumn.querySelector('.tableLabel')) {
                const label = document.createElement('label');
                label.className = 'tableLabel';
                label.textContent = `${className}: `;
                tableColumn.prepend(label); // Append label as the last child
                if (className === "Triggers" || className === "Date logged") {
                    tableColumn.classList.add("number");
                }
            }
        }
    });
};

const handleResponsive = () => {
    const emotions = ["Date logged", "Enjoyment", "Sadness", "Anger",
        "Contempt", "Disgust", "Fear", "Surprise", "Triggers"];

    emotions.forEach(emotion => {
        tableLabels(emotion);
    });
};

document.addEventListener("DOMContentLoaded", () => {
    // Initial call to set up the initial state
    handleResponsive();

    // Event listener to handle window resize
    window.addEventListener('resize', handleResponsive);
});
