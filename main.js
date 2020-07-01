window.addEventListener('load', () => {
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    const generateClockDigits = function (amount) {
        let output = "";
        for (let i = 0; i < amount; i++){
            output += `<p>${i}</p>`;
        }
        return output;
    }

    let test = generateClockDigits(35);
    console.log(test);

    hoursElement.insertAdjacentHTML('afterbegin', generateClockDigits(24));
    minutesElement.insertAdjacentHTML('afterbegin', generateClockDigits(60));
    secondsElement.insertAdjacentHTML('afterbegin', generateClockDigits(60));

    const clockElements = [hoursElement, minutesElement, secondsElement];
    const elementHeight = hoursElement.querySelector("p").scrollHeight;

    const currentTimeColor = "rgba(255, 255, 255, 0.4)";
    const digits = document.querySelectorAll("p");

    let time = new Date();
    let currentTime = {
        "hours": time.getHours(),
        "minutes": time.getMinutes(),
        "seconds": time.getSeconds()
    }

    clockElements.forEach((element) => {
        element.style.transition = "all 1s";
    });

    const tick = () => {
        currentTime.seconds++;
        if (currentTime.seconds > 59) {
            currentTime.seconds = 0;
            currentTime.minutes++;
        }
        if (currentTime.minutes > 59) {
            currentTime.minutes = 0;
            currentTime.hours++;
        }
        setCurrentTime(currentTime);
    }

    const setCurrentTime = (currentTime) => {
        digits.forEach(element => {
            element.style.color = "";
        });

        hoursElement.style.transform = "translate(0 , " + currentTime.hours * elementHeight + "px)";
        minutesElement.style.transform = "translate(0 , " + currentTime.minutes * elementHeight + "px)";
        secondsElement.style.transform = "translate(0 , " + currentTime.seconds * elementHeight + "px)";

        hoursElement.children[currentTime.hours].style.color = currentTimeColor;
        minutesElement.children[currentTime.minutes].style.color = currentTimeColor;
        secondsElement.children[currentTime.seconds].style.color = currentTimeColor;
    }

    setCurrentTime(currentTime);
    window.setInterval(tick, 1000);
});