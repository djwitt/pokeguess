const pokemon = document.querySelector(".pokemon")
const btn = document.querySelector("button")
const pokeAPI = "https://pokeapi.co/api/v2/pokemon/"
const maxPokemon = 1010
let pokemonName = undefined

function randomPokemonID(size) {
	return Math.floor(Math.random() * size)
}

function renderPokemon(imageURL) {
	const pokeImage = `url(${imageURL}) center/contain no-repeat`
	pokemon.style.setProperty("background", pokeImage)
}

async function fetchPokemon(URL) {
	const request = await fetch(URL)
	const json = await request.json()
	return json
}

async function getPokemon(pokeID) {
	try {
		const pokemon = await fetchPokemon(`${pokeAPI}${pokeID}`)
		const pokemonURL = await pokemon.sprites.other["official-artwork"]
			.front_default
		pokemonName = pokemon.name
		renderPokemon(pokemonURL)
	} catch (error) {
		throw new Error(error)
	}
}

btn.addEventListener("click", () => {
	pokemon.classList.add("reveal")
})

document.addEventListener(
	"DOMContentLoaded",
	getPokemon(randomPokemonID(maxPokemon))
)
