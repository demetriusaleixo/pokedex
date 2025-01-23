const pokeApi = {};

function converterDetailsParaPokemon (pokemonDetail) {
    const pokemon = new Pokemon();

    pokemon.numero = pokemonDetail.id;
    pokemon.nome = pokemonDetail.name;

    const tipos = pokemonDetail.types.map((typeSlot) => typeSlot.type.name);
    const [tipo] = tipos;

    pokemon.tipoPrincipal = tipo;
    pokemon.tipos = tipos;
    pokemon.imagem = pokemonDetail.sprites.other.dream_world.front_default;
    
    const stats = pokemonDetail.stats;

    let hp = null;
    let attack = null;
    let spAttack = null;
    let defense = null;
    let spDefense = null;
    let speed = null;

    stats.forEach(stat => {
        if (stat.stat.name === 'hp') {
            hp = stat.base_stat;
        }
        if (stat.stat.name === 'attack') {
            attack = stat.base_stat;
        }
        if (stat.stat.name === 'defense') {
            defense = stat.base_stat;
        }
        if (stat.stat.name === 'special-attack') {
            spAttack = stat.base_stat;
        }
        if (stat.stat.name === 'special-defense') {
            spDefense = stat.base_stat;
        }
        if (stat.stat.name === 'speed') {
            speed = stat.base_stat;
        }
    })

    if (hp !== null && attack !== null && defense !== null && spAttack !== null && spDefense !== null && speed !== null) {
        pokemon.hp = hp;
        pokemon.attack = attack;
        pokemon.defense = defense;
        pokemon.spAttack = spAttack;
        pokemon.spDefense = spDefense;
        pokemon.speed = speed;
    }

    return pokemon;
}

pokeApi.coletarDetalhesPokemons = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(converterDetailsParaPokemon)
}

pokeApi.coletarPokemons = (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    
    return fetch(url)
        .then((resposta) => resposta.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.coletarDetalhesPokemons))
            .then((detailRequest) => Promise.all(detailRequest))
            .then((pokemonDetails) => pokemonDetails)
}
