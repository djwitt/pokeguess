const pokemon = document.querySelector(".pokemon");
const btn = document.querySelector("button");

btn.addEventListener("click", () => {
    pokemon.classList.add("reveal");
});

function randomPokemonID(size) {
    return Math.floor(Math.random() * size);
}

async function getPokemon(pokeID) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}`);
    const data = await response.json();

    // Uh, the API parameter for official artwork is `official-artwork`
    // We'll have to figure out how to handle this when converting the JSON in this function.
    const pokemonURL = data.sprites.other;
}
