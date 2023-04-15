const pokemon = document.querySelector(".pokemon")
const showBtn = document.querySelector(".show")
const nextBtn = document.querySelector(".next-pokemon")
const pokeAPI = "https://pokeapi.co/api/v2/pokemon/"
const showPoke = "opacity(1) brightness(1)"
const hidePoke = "opacity(1) brightness(0)"
const nextPoke = "opacity(0) brightness(0)"
const maxPokemon = 1010
let pokemonName = undefined

function randomPokemonID(size) {
    return Math.floor(Math.random() * size)
}

function renderPokemon(imageURL) {
    const pokeImage = `url(${imageURL}) center/contain no-repeat`
    pokemon.style.setProperty("background", pokeImage)
    if (pokemon.style.background) {
        pokemon.style.setProperty("filter", hidePoke)
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
    const pokemon = await fetchPokemon(`${pokeAPI}${pokeID}`)
    const pokemonURL = await pokemon.sprites.other["official-artwork"]
        .front_default
    pokemonName = pokemon.name
    renderPokemon(pokemonURL)
}

showBtn.addEventListener("click", () => {
    pokemon.style.setProperty("filter", showPoke)
})

nextBtn.addEventListener("click", () => {
    pokemon.style.setProperty("filter", nextPoke)
    setTimeout(() => {
        getPokemon(randomPokemonID(maxPokemon))
    }, 900)
})

document.addEventListener(
    "DOMContentLoaded",
    getPokemon(randomPokemonID(maxPokemon))
)
