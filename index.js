const circle = document.getElementById('progress');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
const input = document.getElementById("percent");

circle.style.strokeDasharray = `${circumference}`;
circle.style.strokeDashoffset = circumference;

input.addEventListener("change", () => {
    setProgress(input.value);
})

function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}