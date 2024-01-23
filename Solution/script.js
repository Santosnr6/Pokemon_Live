'use strict';

window.addEventListener('load',() => {
    console.log('Window loaded');

    initPage();
});

function initPage() {
    let pokedexRef = document.querySelector('#pokedexContainer');
    let formRef = document.querySelector('#formContainer');
    let randomGenRef = document.querySelector('#randomContainer');

    pokedexRef.classList.add('d-none');
    formRef.classList.add('d-none');
    randomGenRef.classList.add('d-none');

    const btnRef = document.querySelector('#logInBtn');
    btnRef.addEventListener('click', handleLoginClick);

    let btnRefs = document.querySelectorAll('button');
    btnRefs.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const btnText = event.target.textContent;
            if(btnText === 'Pokedex') {
                pokedexRef.classList.remove('d-none');
                formRef.classList.add('d-none');
                randomGenRef.classList.add('d-none');

                pokemons.forEach(pokemon => {
                    pokedexRef.appendChild(renderCard(pokemon));
                });

            } else if(btnText === 'Search Pokemon') {
                pokedexRef.classList.add('d-none');
                formRef.classList.remove('d-none');
                randomGenRef.classList.add('d-none');

                let input = document.querySelector('#pokemonName');
                document.querySelector('#searchBtn').addEventListener('click', (event) => {
                    event.preventDefault();
                    searchPokemon(input.value);
                });
                
            } else if(btnText === 'Generate Pokemon') {
                pokedexRef.classList.add('d-none');
                formRef.classList.add('d-none');
                randomGenRef.classList.remove('d-none');

                let input = document.querySelector('#numberInput');
                document.querySelector('#genBtn').addEventListener('click', (event) => {
                    event.preventDefault();
                    generatePokemon(input.value);
                });
            }
        });
    });
}

function handleLoginClick(event) {
    event.preventDefault();
    if(validateForm()) {
        document.querySelector('#logInContainer').classList.add('d-none');
        document.querySelector('#contentContainer').classList.remove('d-none'); 
    }
}

function validateForm() {
    console.log('validateForm()');
}

function generatePokemon(input) {
    let generated = [];

    let divRef = document.querySelector('#randomCardContainer');
    divRef.innerHTML = '';

    for(let i = 0; i < input; i++) {
        let flag = false;
        while(!flag) {
            let randomPokemon = pokemons[Math.floor(Math.random() * pokemons.length)];
            if(!generated.includes(randomPokemon)) {
                generated.push(randomPokemon);
                flag = true;
            } else {
                console.log('Nu fick du en dubblett');
            }
        }
        console.log('Pokemon tillagd');
    }

    generated.forEach(pokemon => {
        divRef.appendChild(renderCard(pokemon));
    });
}

function searchPokemon(input) {
    let pokemon = null;

    let divRef = document.querySelector('#resultsContainer');
    divRef.innerHTML = '';

    pokemons.forEach(pokemon => {
        if(pokemon.name.toLowerCase().includes(input.toLowerCase())) {
            divRef.appendChild(renderCard(pokemon));
        }
    });
}

function renderCard(pokemon) {
    
    const cardRef = document.createElement('div');
    cardRef.classList.add('card');

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