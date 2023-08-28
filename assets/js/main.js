const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonAppear = document.getElementById('pokemonAppear')



const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" data-id="${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function appearPokemonDetails(pokemon) {
    const pokemonsDetailsHTML = `
        <section class="detail-content ${pokemon.type}">
            <a class="close" onclick="closeDetailBtn()">
                <div >
                    <img src="assets/icons/close/close-icon-google.png" alt=""> <!-- COLOCAR IMG SETINHA -->
                </div>
            </a>
            <!-- Pokemon here! -->
            <li class="pokemonAppearLi">
                <h1 class="name">${pokemon.name}</h1>

                <span class="number">#${pokemon.number}</span>

                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            </li>
            <div class="pokePhoto">
                <img class="pokePhotoIMG"
                    src="${pokemon.photo}"
                    alt=""> <!-- COLOCAR IMG POKEMON -->
            </div>

            <div class="infos">
                <ol class="infos-pokemon">
                    <li class="list-Infos-pokemon">
                        <span class="about">About ${pokemon.name}</span>
                        <ul class="details-container">
                            <ul class="text">
                                <li>Moves:</li>
                                <li>Abilities:</li>
                                <li>Weight:</li>
                                <li>Height:</li>
                            </ul>
                            <ul class="text">
                                <li >${pokemon.moves}</li>
                                <li>${pokemon.abilities}</li>
                                <li>${pokemon.weight}</li>
                                <li>${pokemon.height}</li>
                            </ul>
                        </ul>
                    </li>
                </ol>

            </div>

        </section>
    `;
    return pokemonAppear.innerHTML = pokemonsDetailsHTML
}

pokemonList.addEventListener('click', (event) => {
    try {
        if (event.target.classList.contains('pokemon')) {
            const selectedPokemonId = event.target.dataset.id;
            pokeApi.getPokemonDetailById(selectedPokemonId).then((pokemon) => appearPokemonDetails(pokemon))
        }
    } catch (error) {
        console.error(error)
    }
});

function closeDetailBtn() {
    return pokemonAppear.innerHTML = `
        <ol id="pokemonAppear" class="">
        <!-- ..... Pokemons here ..... -->
        </ol>
    `
}