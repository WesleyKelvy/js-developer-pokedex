
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    // adição de novos atributos
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    const moves = pokeDetail.moves.slice(0, 3).map((movesSlot) => movesSlot.move.name).join(', ')
    const [move] = moves

    pokemon.moves = moves
    pokemon.move = move

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name).join(', ')
    const [ability] = abilities
    console.log(pokeDetail)

    pokemon.abilities = abilities
    pokemon.ability = ability

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)
        )
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

// Requisição para pegar detalhes do pokemon
pokeApi.getPokemonDetailById = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return fetch(url)
        .then((response) => response.json())
        .then((convertPokeApiDetailToPokemon));
}
