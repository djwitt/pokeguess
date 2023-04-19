const pokemon = document.querySelector(".pokemon")
const showBtn = document.querySelector(".show")
const nextBtn = document.querySelector(".next-pokemon")
const pokeName = document.querySelector(".pokemon-name")
const pokeAPI = "https://pokeapi.co/api/v2/pokemon/"
const maxPokemon = 1010
let pokemonName

/**
 *
 * @param {string} action Sets the type of string return for css filter
 * @param {string} text Allows only the opacity to change
 * @returns {string}
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

function renderPokemon(imageURL) {
    const pokeImage = `url(${imageURL}) center/contain no-repeat`
    pokemon.style.background = pokeImage
    if (pokemon.style.background) {
        pokemon.style.filter = adjustFilter("hide")
    }
}

async function fetchPokemon(URL) {
    try {
        const request = await fetch(URL)
        const json = await request.json()
        return json
    } catch (err) {
        throw new Error(err)
    }
}

async function getPokemon(pokeID) {
    const pokemonResponse = await fetchPokemon(`${pokeAPI}${pokeID}`)
    const pokemonURL = await pokemonResponse?.sprites.other["official-artwork"]
        .front_default
    pokemonName = pokemonResponse.name
    renderPokemon(pokemonURL)
}

showBtn.addEventListener("click", () => {
    pokemon.style.filter = adjustFilter("show")
    pokeName.innerHTML = pokemonName
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
