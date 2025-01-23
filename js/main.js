const listaPokemonsHtml = document.querySelector('#listaPokemons');
const botaoMostrarMais = document.querySelector('.mostrarMais');
let offset = 0;
const limit = 20;

function converterListaPokemonsParaLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.tipoPrincipal}" onclick="abrirDetalhesPokemon(${pokemon.numero})">
            <div class="identificador">
                <span class="numero">#${pokemon.numero}</span>
                <span class="nome">${pokemon.nome}</span>
            </div>

            <div class="detalhes">
                <div class="tipos">
                    ${pokemon.tipos.map((tipo) => `<span class="tipo">${tipo}</span>`).join('')}
                </div>

                <img src="${pokemon.imagem}" alt="${pokemon.nome}">
            </div>
        </li>
    `;
}

function abrirDetalhesPokemon(numero) {
    const url = `detalhes.html?numero=${numero}`;
    window.open(url, '_blank');
}

function carregarPokemons(offset, limit) {
    pokeApi.coletarPokemons(offset, limit).then((pokemons) => {
        listaPokemonsHtml.innerHTML += pokemons.map(converterListaPokemonsParaLi).join('');
    });
}

carregarPokemons(offset, limit);

botaoMostrarMais.addEventListener('click', () => {
    offset += limit;
    carregarPokemons(offset, limit);
});
