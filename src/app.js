const pokemon = document.querySelector(".pokemon");
const showBtn = document.querySelector(".show");
const nextBtn = document.querySelector(".next-pokemon");
const pokeName = document.querySelector(".pokemon-name");
const pokeAPI = "https://pokeapi.co/api/v2/pokemon/";
const maxPokemon = 1010;
let fullPokemonName;

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
    return Math.floor(Math.random() * size);
}

function renderPokemon(imageURL) {
    pokemon.style.background = `url(${imageURL}) center/contain no-repeat`;
    pokemon.style.filter = adjustFilter("hide");
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
    pokeName.style.filter = adjustFilter("next", "text");
    pokemon.style.filter = adjustFilter("next");

    pokemon.addEventListener(
        "transitionend",
        (e) => {
            getPokemon(randomPokemonID(maxPokemon));
        },
        { once: true }
    );
});
