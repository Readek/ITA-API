const jokeTextDiv = document.getElementById("chistContent");
const nextJokeBtn = document.getElementById("chistNextBtn");
const rateBtns = document.getElementsByClassName("ratingBtn");
const weatherIconEl = document.getElementById("weatherIcon");
const weatherTextDiv = document.getElementById("weatherTextDiv");
const currentJoke = {
    id: "None",
    score: 0,
    date: ""
};
const reportJokes = [];
// get joke on startup
getJokeJson().then((jokeJson) => {
    replaceJoke(jokeJson);
});
// get joke on button click
nextJokeBtn.addEventListener("click", () => {
    getJokeJson().then((jokeJson) => {
        replaceJoke(jokeJson);
    });
});
/**
 * Sends a request for a joke, and transforms it to a simple string
 * @returns the joke
 */
async function getJokeJson() {
    const urlApi = "https://icanhazdadjoke.com/";
    const response = await fetch(urlApi, {
        headers: {
            "Accept": "application/json",
            "User-Agent": "ITA exercice (https://github.com/Readek/ITA-API)"
        }
    });
    if (!response.ok)
        return { id: "None", joke: "Not Found" };
    const jokeJson = await response.json();
    return jokeJson;
}
function replaceJoke(jokeJson) {
    if (currentJoke.id != "None") {
        reportJokes.push(structuredClone(currentJoke));
    }
    currentJoke.id = jokeJson.id;
    currentJoke.score = 0;
    currentJoke.date = new Date().toISOString();
    for (let i = 0; i < rateBtns.length; i++) {
        rateBtns[i].classList.remove("ratingBtnActive");
    }
    console.log(reportJokes);
    replaceJokeText(jokeJson.joke);
}
/**
 * Replaces previous joke with current one in the DOM
 * @param text - Joke text
 */
function replaceJokeText(text) {
    jokeTextDiv.innerHTML = text;
}
for (let i = 0; i < rateBtns.length; i++) {
    rateBtns[i].addEventListener("click", () => { rateJoke(i + 1); });
}
/**
 * Gives a rating to the currently shown joke
 * @param rating Number of rating button clicked
 */
function rateJoke(rating) {
    currentJoke.score = rating;
    for (let i = 0; i < rateBtns.length; i++) {
        if (rating - 1 == i) {
            rateBtns[i].classList.add("ratingBtnActive");
        }
        else {
            rateBtns[i].classList.remove("ratingBtnActive");
        }
    }
}
getWeather();
/** Asks for weather data and updates weather DOM elements */
async function getWeather() {
    const loc = "Barcelona";
    const apiKey = "ece261d5aa7c6f2a90fafbde16808b33";
    const url = `https://api.weatherstack.com/current?access_key=${apiKey}&query=${loc}&units=m`;
    const options = { method: 'GET' };
    const response = await fetch(url, options);
    const result = await response.json();
    weatherIconEl.setAttribute("src", result.current.weather_icons[0]);
    weatherTextDiv.innerHTML = `${result.current.weather_descriptions[0]}`
        + ` | ${result.current.temperature}ºC | ${result.location.name}`;
}
