const timeline = async () => {
    // Define the labels to extract
    const labelsToExtract = ['enjoyment', 'sadness', 'anger', 'contempt', 'disgust', 'fear', 'surprise'];

    // Get data from EJS
    const emotionsInfoElement = document.getElementById('emotions-info');
    let emotionsData;

    // Parse data into an array
    if (emotionsInfoElement) {
        emotionsData = JSON.parse(emotionsInfoElement.getAttribute('data-emotions'));

        // Check if emotionsData is an array
        if (!Array.isArray(emotionsData)) {
            console.error('Emotions data is not a valid array');
            return;
        }
    } else {
        // No data found
        console.error('Emotions info element not found');
        return;
    }

    // Group entries by date
    const groupedData = emotionsData.reduce((result, entry) => {
        const date = entry.dateLogged.split('T')[0];
        if (!result[date]) {
            result[date] = [];
        }
        result[date].push(entry);
        return result;
    }, {});

    // Extract unique dates into xlabels array
    const xlabels = Object.keys(groupedData);

    // Initialize arrays to store values for each label and calculate averages
    const labelArrays = {};
    const columnAverages = {};

    Object.keys(groupedData).forEach(date => {
        const entries = groupedData[date];

        // Initialize arrays for each label on each date
        labelsToExtract.forEach(label => {
            if (!labelArrays[label]) {
                labelArrays[label] = {};
            }

            labelArrays[label][date] = entries.map(entry => entry[label]);
        });

        // Calculate averages for each label on each date
        labelsToExtract.forEach(label => {
            const values = labelArrays[label][date];
            const sum = values.reduce((acc, val) => acc + val, 0);
            if (!columnAverages[date]) {
                columnAverages[date] = {};
            }
            columnAverages[date][label] = sum / values.length;
        });
    });

    // Create an array to store datasets for each emotion label
    const datasets = labelsToExtract.map(label => ({
        label: label,
        data: xlabels.map(date => columnAverages[date][label] || 0), // Use 0 if no data for the date
        lineTension: 0,
        pointRadius: 3,
    }));

    // CHART DATA
    const chartdata = {
        labels: xlabels,
        datasets: datasets
    };

    // CHART OPTIONS
    const chartconfig = {
        type: 'line',
        data: chartdata,
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            responsive: true,
            aspectRatio: 1, // Adjust this value as needed
            // maintainAspectRatio: true,
            animation: true,
            scales: {
                y: {
                    min: 0,
                    max: 10,
                    beginAtZero: true,
                },
            },
            plugins: {
                legend: { display: true },
                tooltip: { enabled: true },
                title: {
                    display: true,
                    text: `Emotions over time`,
                    font: { size: 20 }
                }
            }
        }
    };

    // Dynamically adjust aspect ratio based on screen size
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (screenWidth < 950) {
        chartconfig.options.aspectRatio = 1; // Set aspect ratio for small screens
    } else {
        chartconfig.options.aspectRatio = 2; // Set aspect ratio for larger screens
    }

    const canvas = document.getElementById('timeline');
    if (canvas) {
        const chart = new Chart('timeline', chartconfig);
    } else {
        console.error('Canvas element with ID "timeline" not found');
    }
}

timeline();
