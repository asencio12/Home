const API_URL = "https://www.demonslayer-api.com/api/v1/characters";
const characterDetailContainer = document.getElementById("character-detail");
const params = new URLSearchParams(window.location.search); //Obtiene los parametros que decidamos enviar
const characterId = params.get("id");

async function getCharacterDetail() {
    
    const response = await fetch(API_URL + "?id=" + characterId);

    const data = await response.json();

    characterDetailContainer.innerHTML = "";

    data.content.forEach(character => {
        const card = createCharacterCard(character);
        characterDetailContainer.appendChild(card);
    });
}

function createCharacterCard(character) {
    const card = document.createElement("article");
    card.classList.add("character-card");

    card.innerHTML = `
        <img
            src="${character.img}"
            alt="${character.name}"
        >
        
        <h2>${character.id}</h2>
        <h2>${character.name}</h2>

        <p>
            Edad: ${character.age}
        </p>
    `;

    return card;
}

getCharacterDetail();