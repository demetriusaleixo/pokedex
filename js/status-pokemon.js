const identificadorPokemon = document.querySelector('.identificadorPokemon');
const imagemPokemon = document.querySelector('.imagemPokemon');
const listaStatus = document.querySelector('.statusPokemon');

const tipos = {
    normal: '#a6a877',
    grass: '#49d0b0',
    fire: '#ee7f30',
    water: '#678fee',
    electric: '#f7cf2e',
    ice: '#98d5d7',
    ground: '#dfbf69',
    flying: '#a98ff0',
    poison: '#a040a0',
    fighting: '#bf3029',
    psychic: '#f65687',
    dark: '#725847',
    rock: '#b8a137',
    bug: '#a8b720',
    ghost: '#6e5896',
    steel: '#b9b7cf',
    dragon: '#6f38f6',
    fairy: '#f9aec7',
};

function definirCorDeFundo(tipoPrincipal) {
    const cor = tipos[tipoPrincipal] || "#FFFFFF";
    const pokemon = document.querySelector('.pokemon');
    pokemon.style.backgroundColor = cor;
}

function identificarPokemon(pokemon) {
    return `
        <span class="nomePokemon">${pokemon.nome}</span>
        <span class="numeroPokemon">#${pokemon.numero}</span>
    `;
}

function alterarImagemPokemon(urlImagem) {
    imagemPokemon.src = urlImagem;
}

function converterListaStatusParaHtml(pokemon) {
    return `
        <li>Hp: ${pokemon.hp}</li>
        <li>Attack: ${pokemon.attack}</li>
        <li>Defense: ${pokemon.defense}</li>
        <li>Special-attack: ${pokemon.spAttack}</li>
        <li>Special-defense: ${pokemon.spDefense}</li>
        <li>Speed: ${pokemon.speed}</li>
    `;
}

function carregarIdentificadorPokemon(pokemon) {
    pokeApi.coletarDetalhesPokemons(pokemon).then((pokemonDetails) => {
        identificadorPokemon.innerHTML = identificarPokemon(pokemonDetails);
        alterarImagemPokemon(pokemonDetails.imagem);
        definirCorDeFundo(pokemonDetails.tipoPrincipal);
    });
}

function carregarStatus(pokemon) {
    pokeApi.coletarDetalhesPokemons(pokemon).then((pokemonDetails) => {
        listaStatus.innerHTML = converterListaStatusParaHtml(pokemonDetails);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const numero = urlParams.get('numero');

    if (numero) {
        const pokemon = { url: `https://pokeapi.co/api/v2/pokemon/${numero}/` };
        carregarIdentificadorPokemon(pokemon);
        carregarStatus(pokemon);
    } else {
        console.error('Número do Pokémon não fornecido!');
    }
});
