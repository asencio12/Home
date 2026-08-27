const API_URL = "https://dragonball-api.com/api/characters";
const charactersContainer = document.getElementById("characters-container");
const paginationContainer = document.getElementById("paginationId");

function createCharacterCard(character) {
    const card = document.createElement("article");
    card.classList.add("character-card");

    card.innerHTML = `
        <img
            src="${character.image}"
            alt="${character.name}"
        >

        <h3>${character.id}</h3>
        <h2>${character.name}</h2>

        <p>
            Género: ${character.gender}
        </p>
    `;

    card.addEventListener(
        "click", 
        () => { 
            window.location.href = `character-detail.html?identifier=${character.id}`; });

    return card;
}


async function getCharacters(pageNumber) {

    const response = await fetch(API_URL+"?page=" + pageNumber);
    //https://dragonball-api.com/api/characters?page=1
    const data = await response.json();

    console.log("Respuesta de la API:", data);

    charactersContainer.innerHTML = ``;

    data.items.forEach(character => {
        const card = createCharacterCard(character);
        charactersContainer.appendChild(card);
    });
    createPagination(data.meta);
}

function createPagination(paginationData){
    paginationContainer.innerHTML = ``;

    const _previousButton = document.createElement("button")
    _previousButton.textContent = "Anterior";
    _previousButton.addEventListener("click", () => {
        if(paginationData.currentPage > 1){
            getCharacters(paginationData.currentPage - 1);
        }
     });
    if(paginationData.currentPage === 1){
        _previousButton.disabled = true;
    }
    paginationContainer.appendChild(_previousButton);



   



    for(let i = 1; i<= paginationData.totalPages; i++){
        const _paginationButton = document.createElement("button")
        _paginationButton.textContent = i;
        _paginationButton.addEventListener("click", () => {
            getCharacters(i);
         });
        paginationContainer.appendChild(_paginationButton);
    }


    const _nextButton = document.createElement("button")
    _nextButton.textContent = "Siguiente";
    _nextButton.addEventListener("click", () => {
        if(paginationData.currentPage < paginationData.totalPages){
            getCharacters(paginationData.currentPage + 1);
        }
     });

    
    if(paginationData.currentPage === paginationData.totalPages){
        _nextButton.disabled = true ;
    }
    paginationContainer.appendChild(_nextButton);

}

 
getCharacters(1);