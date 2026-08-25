const API_URL = "https://www.demonslayer-api.com/api/v1/characters";
const charactersContainer = document.getElementById("characters-container");
//addEventListener("click", () => { window.location.href =`character-detail.html?id=${character.id}`;});

function createCharacterCard(character) {
    const card = document.createElement("article");
    card.classList.add("character-card");

    card.innerHTML = `
        <img
            src="${character.img}"
            alt="${character.name}"
        >

        <h3>${character.id}</h3>
        <h2>${character.name}</h2>

        <p>
            Edad: ${character.age}
        </p>
    `;


    addEventListener(
        "click", 
        () => { 
            window.location.href =`character-detail.html?id=${character.id}`;});

    return card;
}


async function getCharacters() {

    const response = await fetch(API_URL);

    const data = await response.json();

    console.log("Respuesta de la API:", data);

    charactersContainer.innerHTML = "";

    data.content.forEach(character => {
        const card = createCharacterCard(character);
        charactersContainer.appendChild(card);
    });
}

getCharacters();