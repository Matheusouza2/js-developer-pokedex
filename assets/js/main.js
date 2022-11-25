const pokemonList = document.getElementById('pokemonList')
const loadNextButton = document.getElementById('loadNextButton')
const loadPreviewButton = document.getElementById('loadPreviewButton')
loadPreviewButton.disabled = true;

const maxRecords = 151
const limit = 12
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name" onclick="pokemonDetail(${pokemon.number})">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            
        </li>


        <div id="poke_${pokemon.number}" class="pokedex_draw" hidden>
            <div id="left">
              <div id="logo"></div>
              <div id="bg_curve1_left"></div>
              <div id="bg_curve2_left"></div>
              <div id="curve1_left">
                <div id="buttonGlass">
                  <div id="reflect"> </div>
                </div>
                <div id="miniButtonGlass1" class="close${pokemon.number}"></div>
                <div id="miniButtonGlass2"></div>
                <div id="miniButtonGlass3"></div>
              </div>
              <div id="curve2_left">
                <div id="junction">
                  <div id="junction1"></div>
                  <div id="junction2"></div>
                </div>
              </div>
              <div id="screen">
                <div id="topPicture">
                  <div id="buttontopPicture1"></div>
                  <div id="buttontopPicture2"></div>
                </div>
                <div id="picture" class="${pokemon.type}">
                    <img src="${pokemon.photo}" alt="${pokemon.name}" height="170">
                </div>
                <div id="buttonbottomPicture"></div>
                <div id="speakers">
                  <div class="sp"></div>
                  <div class="sp"></div>
                  <div class="sp"></div>
                  <div class="sp"></div>
                </div>
              </div>
              <div id="bigbluebutton"></div>
              <div id="barbutton1"></div>
              <div id="barbutton2"></div>
              <div id="cross">
                <div id="leftcross">
                  <div id="leftT"></div>
                </div>
                <div id="topcross">
                  <div id="upT"></div>
                </div>
                <div id="rightcross">
                  <div id="rightT"></div>
                </div>
                <div id="midcross">
                  <div id="midCircle"></div>
                </div>
                <div id="botcross">
                  <div id="downT"></div>
                </div>
              </div>
            </div>
            <div id="right">
              <div id="stats">
                <strong>Nome:</strong> ${pokemon.name}<br/>
                <strong>Tipo:</strong> ${pokemon.type}<br/>
                <strong>Experiência:</strong> ${pokemon.base_experience}<br/>
                <strong>Peso:</strong> ${pokemon.weight} lbs.<br/><br/>                
              </div>
              <div id="blueButtons1">
                <div class="blueButton"></div>
                <div class="blueButton"></div>
                <div class="blueButton"></div>
                <div class="blueButton"></div>
                <div class="blueButton"></div>
              </div>
              <div id="blueButtons2">
                <div class="blueButton"></div>
                <div class="blueButton"></div>
                <div class="blueButton"></div>
                <div class="blueButton"></div>
                <div class="blueButton"></div>
              </div>
              <div id="miniButtonGlass4"></div>
              <div id="miniButtonGlass5"></div>
              <div id="barbutton3"></div>
              <div id="barbutton4"></div>
              <div id="yellowBox1"></div>
              <div id="yellowBox2"></div>
              <div id="bg_curve1_right"></div>
              <div id="bg_curve2_right"></div>
              <div id="curve1_right"></div>
              <div id="curve2_right"></div>
            </div>
          </div>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML = newHtml
    })
}

function pokemonDetail(number){
    const pokedex = document.getElementById(`poke_${number}`)
    const closePokedex = document.getElementsByClassName(`close${number}`);
    closePokedex[0].addEventListener("click", () => {pokedex.hidden = true}, false);
    pokedex.hidden = false;
}

loadPokemonItens(offset, limit)

loadNextButton.addEventListener('click', () => {
    loadPreviewButton.disabled = false;
    
    offset += limit;
    
    if((offset + limit) >= maxRecords){
        loadNextButton.disabled = true;
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit)
    }else{
        loadNextButton.disabled = false;
        loadPokemonItens(offset, limit)
    }    
})

loadPreviewButton.addEventListener('click', () => {
    loadNextButton.disabled = false;
    (offset == limit) ? loadPreviewButton.disabled = true : loadPreviewButton.disabled = false;
    offset -= limit;
    
    loadPokemonItens(offset, limit)
    
})