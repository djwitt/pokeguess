const pokemon = document.querySelector(".pokemon")
const showBtn = document.querySelector(".show")
const nextBtn = document.querySelector(".next-pokemon")
const pokeName = document.querySelector(".pokemon-name")
const pokeAPI = "https://pokeapi.co/api/v2/pokemon/"
const maxPokemon = 1010
let fullPokemonName

/**
 *
 * @param {string} action Sets the type of value return for css `filter`
 * @param {string} [text=undefined] Utilized to output values for text blocks only.
 * @returns {string} Value for `filter` property.
 */
function adjustFilter(action, text = undefined) {
    if (action === "show" && text === "text") {
        return "opacity(1)"
    }

    if (action === "next" && text === "text") {
        return "opacity(0)"
    }

    if (action === "show") {
        return "opacity(1) brightness(1)"
    }

    if (action === "hide") {
        return "opacity(1) brightness(0)"
    }

    if (action === "next") {
        return "opacity(0) brightness(0)"
    }
}

function randomPokemonID(size) {
    return Math.floor(Math.random() * size)
}

/**
 *
 * @param {string} imageURL Requires image URL from PokeAPI
 * @returns {void}
 */
function renderPokemon(imageURL) {
    pokemon.style.background = `url(${imageURL}) center/contain no-repeat`
    if (pokemon.style.background) {
        // Uneducated hack to smooth out transition between when the URL is called to when it is painted.
        setTimeout(() => {
            pokemon.style.filter = adjustFilter("hide")
        }, 200)
    }
}

/**
 *
 * @param {string} URL API URL
 * @returns Object
 */
async function fetchPokemon(URL) {
    try {
        const request = await fetch(URL)
        const json = await request.json()
        return json
    } catch (err) {
        throw new Error(err)
    }
}

/**
 *
 * @param {number} pokeID Accepts a number for grabbing a random pokemon index
 * @returns {void}
 */
async function getPokemon(pokeID) {
    const pokemonResponse = await fetchPokemon(`${pokeAPI}${pokeID}`)
    const pokemonURL = await pokemonResponse?.sprites.other["official-artwork"]
        .front_default
    fullPokemonName = pokemonResponse.name
    renderPokemon(pokemonURL)
}

showBtn.addEventListener("click", () => {
    pokemon.style.filter = adjustFilter("show")
    pokeName.innerHTML = fullPokemonName
    pokeName.style.filter = adjustFilter("show", "text")
})

nextBtn.addEventListener("click", () => {
    pokemon.style.filter = adjustFilter("next")
    pokeName.style.filter = adjustFilter("next", "text")
    setTimeout(() => {
        getPokemon(randomPokemonID(maxPokemon))
    }, 800)
})

document.addEventListener("DOMContentLoaded", () => {
    pokemon.style.setProperty("filter", adjustFilter("next"))
    getPokemon(randomPokemonID(maxPokemon))
})
