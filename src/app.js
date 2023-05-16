const pokemon = document.querySelector(".pokemon");
const showBtn = document.querySelector(".show");
const nextBtn = document.querySelector(".next-pokemon");
const pokeName = document.querySelector(".pokemon-name");
const pokeball_loader = document.querySelector(".pokeball");
const pokeAPI = "https://pokeapi.co/api/v2/pokemon/";
const maxPokemon = 10;
let fullPokemonName;
let shownPokemon = new Array();

/**
 *
 * @param {string} action Sets the type of value return for css `filter`
 * @param {string} [text=undefined] Utilized to output values for text blocks only.
 * @returns {string} Value for `filter` property.
 */
function adjustFilter(action, text = undefined) {
    if (action === "show" && text === "text") {
        return "opacity(1)";
    }

    if (action === "next" && text === "text") {
        return "opacity(0)";
    }

    if (action === "show") {
        return "opacity(1) brightness(1)";
    }

    if (action === "hide") {
        return "opacity(1) brightness(0)";
    }

    if (action === "next") {
        return "opacity(0) brightness(0)";
    }
}

function randomPokemonID(size) {
    /**
     * It is likely that this will have to be refactored, and other concerns split
     * into other functions. One important issue is recursion for the last number in the array.
     */
    let pokeNum = Math.floor(Math.random() * size);

    if (pokeNum === 0) {
        pokeNum = 1;
    }

    if (shownPokemon.length === maxPokemon - 1) {
        return 132;
    }

    if (!shownPokemon.includes(pokeNum)) {
        shownPokemon.push(pokeNum);
        return pokeNum;
    }

    if (shownPokemon.includes(pokeNum)) {
        return randomPokemonID(size);
    }
}

function renderPokemon(imageURL) {
    pokemon.style.background = `url(${imageURL}) center/contain no-repeat`;
    pokemon.style.filter = adjustFilter("hide");
    togglePokeball(false);
    showBtn.disabled = false;
}

function togglePokeball(loaderState) {
    if (loaderState) {
        pokeball_loader.style.filter = adjustFilter("show");
        pokeball_loader.style.visibility = "visible";
    } else {
        pokeball_loader.style.filter = adjustFilter("hide");
        pokeball_loader.style.visibility = "hidden";
    }
}

async function fetchPokemon(URL) {
    try {
        const request = await fetch(URL);
        const json = await request.json();
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

async function getPokemon(pokeID) {
    const pokemonResponse = await fetchPokemon(`${pokeAPI}${pokeID}`);
    const pokemonURL = await pokemonResponse?.sprites.other["official-artwork"]
        .front_default;
    fullPokemonName = pokemonResponse.name;
    renderPokemon(pokemonURL);
}

document.addEventListener("DOMContentLoaded", () => {
    pokemon.style.filter = adjustFilter("next");
    getPokemon(randomPokemonID(maxPokemon));
});

showBtn.addEventListener("click", () => {
    pokemon.style.filter = adjustFilter("show");
    pokeName.innerHTML = fullPokemonName;
    pokeName.style.filter = adjustFilter("show", "text");
});

nextBtn.addEventListener("click", () => {
    console.log(shownPokemon);
    pokeName.style.filter = adjustFilter("next", "text");
    pokemon.style.filter = adjustFilter("next");

    showBtn.disabled = true;

    pokemon.addEventListener(
        "transitionstart",
        (e) => {
            togglePokeball(true);
        },
        { once: true }
    );

    pokemon.addEventListener(
        "transitionend",
        (e) => {
            getPokemon(randomPokemonID(maxPokemon));
        },
        { once: true }
    );
});
