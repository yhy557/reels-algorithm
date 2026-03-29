const videoLabel = document.getElementById("videoLabel");
const btn = document.getElementById("btn");
const stopBtn = document.getElementById("stopBtn");
const timerLabel = document.getElementById("elapsedTime");
const videoFrame = document.getElementById("imagePlace")

const cntFruit = document.getElementById("counterFruit")
const cntCar = document.getElementById("counterCar")
const cntCountry = document.getElementById("counterCountry")

const pctFruitEl = document.getElementById("percentF")
const pctCarEl = document.getElementById("percentC")
const pctCountryEl = document.getElementById("percentCo")

const dataSet = {
    fruits: ["images/fruits.jpg", "images/fruits2.jpg", "images/fruits3.jpg"],
    cars: ["images/sportscar.jpg", "images/sportscar2.jpg", "images/sportscar3.jpg"],
    countries: ["images/country.jpg", "images/country2.jpg", "images/country3.jpg"]
};
const topics = Object.keys(dataSet);

let time = 0;
let interval = null;
let isRunning = false;

let fruitCount = 0;
let carCount = 0;
let countryCount = 0;

let pctFruit = 100;
let pctCar = 100;
let pctCountry = 100;

let totalWeight = 0;

let selectedTopic = "";
const updateTimer = () => {
    if (selectedTopic === "fruits") {
        fruitCount++;
        cntFruit.innerText = fruitCount;
        if (!(pctFruit > 100)) {
            pctFruit += 0.1;
            pctFruitEl.innerText = pctFruit
        }
        if (!(pctCar < 0 && pctCountry < 0)) {
            pctCar -= 0.1;
            pctCountry -= 0.1;
            pctCarEl.innerText = pctCar
            pctCountryEl.innerText = pctCountry
        }
        }
    else if (selectedTopic === "cars") {
        carCount++;
        cntCar.innerText = carCount;
        if (!(pctCar > 100)) {
            pctCar += 0.1;
            pctCarEl.innerText = pctCar
        }
        if (!(pctFruit < 0 && pctCountry < 0)) {
            pctFruit -= 0.1;
            pctCountry -= 0.1;
            pctFruitEl.innerText = pctFruit
            pctCountryEl.innerText = pctCountry
        }
    }
    else if(selectedTopic === "countries") {
        countryCount++;
        cntCountry.innerText = countryCount;
        if (!(pctCountry > 100)) {
            pctCountry += 0.1;
            pctCountryEl.innerText = pctCountry
        }
        if (!(pctCar < 0 && pctFruit < 0)) {
            pctCar -= 0.1;
            pctFruit -= 0.1;
            pctCarEl.innerText = pctCar
            pctFruitEl.innerText = pctFruit
        }
    }
}


btn.addEventListener("click", () => {
    totalWeight = pctCar + pctFruit + pctCountry
    if (isRunning == false) {
        isRunning = true;
        interval = setInterval(() => {
            time++;
            timerLabel.innerText = time;
            updateTimer()
        }, 1000);
    }
    else {
        time = 0
        timerLabel.innerText = time
    }
    
    let a = pctCountry
    let b = pctCountry + pctCar

    let randomVal = Math.floor(Math.random() * totalWeight);
    if (randomVal > b) {
        selectedTopic = "fruits"
        alert("FRUIT SELECTED")
    }
    else if (randomVal > a) {
        selectedTopic = "cars"
        alert("CAR SELECTED")
    }
    else {
        selectedTopic = "countries"
        alert("COUNTRY SELECTED")
    }
    let randomImage = dataSet[selectedTopic][Math.floor(Math.random() * dataSet[selectedTopic].length)]

    videoFrame.src = randomImage

});

stopBtn.addEventListener("click", () => {
    if (time > 0) {
        isRunning = false
        time = 0
        clearInterval(interval)
        timerLabel.innerText = time
        fruitCount = 0;
        carCount = 0;
        countryCount = 0;
    }
});
