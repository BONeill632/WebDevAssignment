const slider = (sliderId, outputId) => {
    const slider = document.getElementById(sliderId);
    const output = document.getElementById(outputId);

    if(slider && output){
        output.innerHTML = slider.value;

        slider.addEventListener("input", () => {
            output.innerHTML = slider.value;
        });
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const emotions = ["enjoyment", "sadness", "anger", "contempt", "disgust", "fear", "surprise"];

    emotions.forEach(emotion => {
        slider(`${emotion}-range`, `${emotion}-value`);
    });
});
