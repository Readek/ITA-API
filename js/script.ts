const jokeTextDiv = document.getElementById("chistContent")!;
const nextJokeBtn = document.getElementById("chistNextBtn")!;

const urlApi = "https://icanhazdadjoke.com/";


// get joke on startup
getJoke().then((res) => {replaceJokeText(res)});

// get joke on button click
nextJokeBtn.addEventListener("click", () => {    
    getJoke().then((res) => {replaceJokeText(res)});
})


/**
 * Sends a request for a joke, and transforms it to a simple string
 * @returns the joke
 */
async function getJoke(): Promise<string> {
    
    const response = await fetch(urlApi, {
        headers: {
            "Accept" : "application/json",
            "User-Agent" : "ITA exercice (https://github.com/Readek/ITA-API)"
        }
    })

    if (!response.ok) return "Not found";
    
    const jokeJson = await response.json();

    return jokeJson.joke;

}

/**
 * Replaces previous joke with current one in the DOM
 * @param text - Joke text
 */
function replaceJokeText(text: string) {
    
    jokeTextDiv.innerHTML = text;

}

// compiled with "npx tsc --target ES2023 js/script.ts"