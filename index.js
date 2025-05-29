const circle = document.getElementById('progress');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
const input = document.getElementById("percent");

circle.style.strokeDasharray = `${circumference}`;
circle.style.strokeDashoffset = circumference;

input.addEventListener("change", () => {
    let value = input.value;

    if (value < 0) {
        value = 0;
        input.value = 0;
    } else if (value > 100) {
        value = 100;
        input.value = 100;
    }

    setProgress(value);
})

function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}