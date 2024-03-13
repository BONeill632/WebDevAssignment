const snapshot = async (emotionsData) => {

    // Get data from EJS
    var emotionsInfoElement = document.getElementById('emotions-info');

    // Parse data into string
    if (emotionsInfoElement) {
        var emotionsData = JSON.parse(emotionsInfoElement.getAttribute('data-emotions'));
    } else {
        // No data found
        console.error('Emotions info element not found');
    }

    // Check if emotionsData is a valid array before proceeding
    // Tidied up with ChatGPT
    if (Array.isArray(emotionsData) && emotionsData.length > 0) {
        // Define labels to extract
        const labelsToExtract = ['enjoyment', 'sadness', 'anger', 'contempt', 'disgust', 'fear', 'surprise'];

        // Initialize arrays to store values for each label
        const labelArrays = {};
        labelsToExtract.forEach(label => {
            labelArrays[label] = emotionsData.map(entry => entry[label]);
        });

        // Calculate averages for each label
        var columnAverages = {};
        Object.keys(labelArrays).forEach(label => {
            const values = labelArrays[label];
            const sum = values.reduce((acc, val) => acc + val, 0);
            columnAverages[label] = sum / values.length;
        });
    } else {
        console.error('Emotions data is not a valid array');
    }

    // SET X-AXIS LABELS
    const xlabels = ["Enjoyment", "Sadness", "Anger", "Contempt", "Disgust", "Fear", "Surprise"];

    const chartdata = {
        labels: xlabels,
        datasets: [{
            data: Object.values(columnAverages),
            lineTension: 0,
            pointRadius: 3
        }]
    };

    const chartconfig = {
        type: 'radar',
        data: chartdata,
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            responsive: true,
            animation: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: true },
                title: {
                    display: true,
                    text: `Today's snapshot`,
                    font: { size: 20 }
                }
            },
            scales: {
                r: {
                    min: 0,
                    max: 10,
                    ticks: {
                        beginAtZero: true
                    }
                }
            }
        }
    };


    const canvas = document.getElementById('snapshot');

    if (!canvas) {
    } else {
        const chart = new Chart('snapshot', chartconfig); // Pass context to Chart constructor
    }
}

snapshot();
