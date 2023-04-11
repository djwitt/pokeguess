const pokemon = document.querySelector(".pokemon")
const mask = document.querySelector(".mask")
const btn = document.querySelector("button")
const maxPokemon = 1010

const stylesheet = document.styleSheets[0]
const findPokemon = [...stylesheet.cssRules].find(
	(rule) => rule.selectorText === ".pokemon"
)
const findMask = [...stylesheet.cssRules].find(
	(rule) => rule.selectorText === ".mask"
)

function randomPokemonID(size) {
	return Math.floor(Math.random() * size)
}

function renderPokemon(URL) {
	const pokeImage = `url(${URL}) center/contain no-repeat`
	const maskImage = `url(${URL}) center/contain no-repeat`
	findPokemon.style.setProperty("background", pokeImage)
	findMask.style.setProperty("mask", maskImage)
}

async function getPokemon(pokeID) {
	try {
		const response = await fetch(
			`https://pokeapi.co/api/v2/pokemon/${pokeID}`
		)
		const data = await response.json()
		const pokemonURL = await data.sprites.other["official-artwork"]
			.front_default
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
