const pokemon = document.querySelector(".pokemon")
const show = document.querySelector(".show")
const next = document.querySelector(".next-pokemon")
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

show.addEventListener("click", () => {
	pokemon.classList.add("reveal")
})

next.addEventListener("click", () => {
	pokemon.classList.remove("reveal")
	setTimeout(() => {
		getPokemon(randomPokemonID(maxPokemon))
	}, 400)
})

document.addEventListener(
	"DOMContentLoaded",
	getPokemon(randomPokemonID(maxPokemon))
)
