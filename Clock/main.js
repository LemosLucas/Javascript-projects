const hourPointer = document.querySelector('.hour-pointer');
const minutePointer = document.querySelector('.min-pointer');
const secondPointer = document.querySelector('.sec-pointer');
const offsetAngle = 90;

(function updateClockTime() {
    setInterval(() => {
        // Get current hour, minute and second
        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();
        const seconds = new Date().getSeconds();

        // Convert time to degrees
        const hoursToDeg = hours < 12 ? map(hours, 0, 12, 0, 360) : map(hours, 12, 24, 0, 360);
        const minutesToDeg = map(minutes, 0, 59, 0, 359);
        const secondsToDeg = map(seconds, 0, 59, 0, 359);

        // Update
        hourPointer.style.transform = `rotate(${hoursToDeg - offsetAngle}deg)`;
        minutePointer.style.transform = `rotate(${minutesToDeg - offsetAngle}deg)`;
        secondPointer.style.transform = `rotate(${secondsToDeg - offsetAngle}deg)`;

    }, 1000);
})();

function map(number, minA, maxA, minB, maxB) {
    return (number - minA) / (maxA - minA) * (maxB - minB) + minB;
}