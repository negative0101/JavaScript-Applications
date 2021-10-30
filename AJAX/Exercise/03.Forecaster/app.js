// Does it work and cover all the requirements from the task? - Yes.
// Does it look terrible? - Absolutely yes.

function attachEvents() {
    let getWeatherBtn = document.querySelector("#submit")

    getWeatherBtn.addEventListener('click', displayInformation)
}
attachEvents();


async function displayInformation() {
    const conditions = {
        Sunny: '☀',
        "Partly sunny": '⛅',
        Overcast: '☁',
        Rain: '☂',
        Degrees: '°'
    }

    let userInput = document.querySelector("#location").value
    let forecastDisplay = document.querySelector("#forecast");
    const divCurrentElement = document.querySelector("#current")
    const upcomingDiv = document.querySelector("#upcoming")
    const country = await getWeather()
    const [today, upcoming] = await Promise.all([getWetherToday(country[0].code), getWetherUpcoming(country[0].code)])

    if (document.querySelector("#current > div.forecast")) {
        document.querySelectorAll('.forecast').forEach(e => e.remove());
    }
    if (document.querySelector("#upcoming > div:nth-child(2)")) {
        document.querySelectorAll('.forecast-info').forEach(e => e.remove());

    }

    document.querySelector("#current > div").textContent = 'Current conditions';
    document.querySelector("#upcoming > div").textContent = 'Three day forecast'
    forecastDisplay.style.display = 'block'

    const divElement = document.createElement("div");
    divElement.className = "forecast"
    let spanConditionSymbol = document.createElement("span")
    spanConditionSymbol.className = "condition symbol"
    spanConditionSymbol.textContent = `${conditions[today.forecast.condition]}`
    let spanClassCondition = document.createElement("span")
    spanClassCondition.className = 'condition'
    spanClassCondition.innerHTML = `<span class= "forecast-data">${today.name}</span>
    <span class= "forecast-data">${today.forecast.low}°/${today.forecast.high}°</span>
    <span class= "forecast-data">${today.forecast.condition}</span>`


    divElement.appendChild(spanConditionSymbol)
    divElement.appendChild(spanClassCondition)
    divCurrentElement.appendChild(divElement)
    // current conditions till here

    const divForecast = document.createElement('div')
    divForecast.className = 'forecast-info'
    // loop through here for future conditions
    upcoming.forecast.forEach(obj => {
        const upcomingSpan = document.createElement('span')
        upcomingSpan.className = 'upcoming'
        upcomingSpan.innerHTML = `<span class="symbol">${conditions[obj.condition]}</span>
        <span class="forecast-data">${obj.low}°/${obj.high}°</span>
        <span class="forecast-data">${obj.condition}</span>`
        divForecast.appendChild(upcomingSpan)
        upcomingDiv.appendChild(divForecast)
    })




}

async function getWeather() {
    let userInput = document.querySelector("#location").value
    let url = `http://localhost:3030/jsonstore/forecaster/locations/`
    const res = await fetch(url);
    const data = await res.json(); // get all JSON about countries
    const filtereddata = Object.values(data).filter(country => country.name == userInput)
    if (filtereddata.length > 0) {
        return filtereddata
    } else {
        let errorLabel = document.querySelector("#current > div")
        let errorLabel2 = document.querySelector("#upcoming > div")
        document.querySelector("#forecast").style.display = 'block';
        errorLabel.textContent = 'Error'
        errorLabel2.textContent = ''
        document.querySelector("#current > div.forecast").replaceChildren()
        document.querySelector("#upcoming > div.forecast-info").replaceChildren()
    }
}

async function getWetherToday(code) {

    let url = `http://localhost:3030/jsonstore/forecaster/today/` + code
    const res = await fetch(url);
    const data = await res.json();
    return data

}

async function getWetherUpcoming(code) {
    let url = `http://localhost:3030/jsonstore/forecaster/upcoming/` + code
    const res = await fetch(url);
    const data = await res.json();

    return data
}

