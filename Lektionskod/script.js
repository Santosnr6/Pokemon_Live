'use strict';

window.addEventListener('load',() => {
    console.log('Window loaded');

    initPage();
});

function initPage() {
    console.log('initPage()');

    const pokedexRef = document.querySelector('#pokedexContainer');
    const searchRef = document.querySelector('#formContainer');
    const genRef = document.querySelector('#randomContainer');

    pokedexRef.classList.add('d-none');
    searchRef.classList.add('d-none');
    genRef.classList.add('d-none');

    document.querySelector('#logInBtn').addEventListener('click', handleLoginClick);

    const btnRefs = document.querySelectorAll('.choiceBtn');

    btnRefs.forEach(btn => {
        btn.addEventListener('click', (event) => {
            console.log(event.target.textContent);
            const btnClick = event.target.textContent;
            if(btnClick === 'Pokedex') {
                pokedexRef.classList.remove('d-none');
                searchRef.classList.add('d-none');
                genRef.classList.add('d-none');

                for(let i = 0; i < pokemons.length; i++) {
                    pokedexRef.appendChild(renderCard(pokemons[i]));
                }

                // for(let pokemon of pokemons) {

                // }

                // pokemons.forEach(pokemon => {
                //     pokedexRef.appendChild(renderCard(pokemon));
                // });
            } else if(btnClick === 'Search Pokemon') {
                pokedexRef.classList.add('d-none');
                searchRef.classList.remove('d-none');
                genRef.classList.add('d-none');

                const searchTerm = document.querySelector('#pokemonName');
                document.querySelector('#searchBtn').addEventListener('click', (event) => {
                    event.preventDefault();
                    searchPokemon(searchTerm.value);
                });

            } else if(btnClick === 'Generate Pokemon') {
                pokedexRef.classList.add('d-none');
                searchRef.classList.add('d-none');
                genRef.classList.remove('d-none');

                const searchTerm = document.querySelector('#numberInput');
                document.querySelector('#genBtn').addEventListener('click', (event) => {
                    event.preventDefault();
                    generatePokemon(searchTerm.value);
                });
            }
        });
    });
}

function handleLoginClick(event) {
    console.log('handleLoginClick()');
    event.preventDefault();

    if(validateForm()) {
       document.querySelector('#logInContainer').classList.add('d-none');
       document.querySelector('#contentContainer').classList.remove('d-none'); 
    }
}

function validateForm() {
    console.log('validateForm()');

    try {
        const username = document.querySelector('#uName');
        const password = document.querySelector('#pWord');

        if(!users.some(user => user.username === username.value)) {
            throw {
                'nodeRef' : username,
                'msg' : 'Användaren hittades inte i databasen!'
            }
        } else {
            const user = users.find(user => user.username === username.value)

            if(user.password !== password.value) {
                throw {
                    'nodeRef' : password,
                    'msg' : 'Fel angivet lösenord'
                }
            }
        }
        return true;
    } catch(error) {
        console.log(error);
        error.nodeRef.value = '';
        error.nodeRef.focus();
        return false;
    }
}

function generatePokemon(input) {
    console.log('generatePokemon()');

    const generated = [];

    const divRef = document.querySelector('#randomCardContainer');
    divRef.innerHTML = '';

    for(let i = 0; i < input; i++) {
        let flag = false;
        while(!flag) {
            const randomPokemon = pokemons[Math.floor(Math.random() * pokemons.length)];
            if(!generated.includes(randomPokemon)) {
                generated.push(randomPokemon);
                flag = true;
            } else {
                console.log('Nu fick du en dublett');
            }
        }
    }

    for(let pokemon of generated) {
        divRef.appendChild(renderCard(pokemon));
    }
}

function searchPokemon(input) {
    console.log('searchPokemon()');

    const divRef = document.querySelector('#resultsContainer');
    divRef.innerHTML = '';

    for(let pokemon of pokemons) {
        if(pokemon.name.toLowerCase().includes(input.toLowerCase())) {
            divRef.appendChild(renderCard(pokemon));
        }
    }
}

function renderCard(pokemon) {
    const containerRef = document.querySelector('#pokedexContainer');
    const cardRef = document.createElement('div');
    cardRef.classList.add('card');
    containerRef.appendChild(cardRef);

    let divRef = document.createElement('div');
    divRef.classList.add('image-container');
    cardRef.appendChild(divRef);
    
    const imgRef = document.createElement('img');
    imgRef.classList.add('card-image');
    imgRef.style.backgroundColor = pokemon.type[0].color;
    imgRef.src = pokemon.image;
    imgRef.alt = 'Bild på ' + pokemon.name;
    divRef.appendChild(imgRef);

    const spanRef = document.createElement('span');
    spanRef.classList.add('index-span');
    spanRef.textContent = '#' + pokemon.id;
    divRef.appendChild(spanRef);

    divRef = document.createElement('div');
    divRef.classList.add('card-info');
    cardRef.appendChild(divRef);

    let headingRef = document.createElement('h2');
    headingRef.textContent = pokemon.name;
    divRef.appendChild(headingRef);
    
    let textRef = document.createElement('p');
    if(pokemon.type.length === 1) {
        textRef.textContent = pokemon.type[0].name;
    } else {
        textRef.textContent = pokemon.type[0].name + ' / ' + pokemon.type[1].name;
    }
    divRef.appendChild(textRef);

    divRef = document.createElement('div');
    divRef.classList.add('card-stats');
    cardRef.appendChild(divRef);

    headingRef = document.createElement('h3');
    headingRef.textContent = 'Base Stats:';
    divRef.appendChild(headingRef);

    const tableRef = document.createElement('table');
    tableRef.classList.add('table');
    divRef.appendChild(tableRef);

    let rowRef = document.createElement('tr');
    tableRef.appendChild(rowRef);

    rowRef.appendChild(renderCell('HP', pokemon.stats.hp));
    rowRef.appendChild(renderCell('Speed', pokemon.stats.speed));

    rowRef = document.createElement('tr');
    tableRef.appendChild(rowRef);

    rowRef.appendChild(renderCell('Attack', pokemon.stats.attack));
    rowRef.appendChild(renderCell('Special Attack', pokemon.stats.specialAttack));
    
    rowRef = document.createElement('tr');
    tableRef.appendChild(rowRef);
    
    rowRef.appendChild(renderCell('Defense', pokemon.stats.defense));
    rowRef.appendChild(renderCell('Special Defense', pokemon.stats.specialDefense));
    
    rowRef = document.createElement('tr');
    tableRef.appendChild(rowRef);
    
    rowRef.appendChild(renderCell('Total', pokemon.stats.total));

    return cardRef;
}

function renderCell(statName, stat) {
    let cellRef = document.createElement('td');
    cellRef.classList.add('table-cell');
    cellRef.textContent = statName + ': ' + stat;
    return cellRef;
}