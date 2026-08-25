const API_URL = "https://www.demonslayer-api.com/api/v1/characters"
const sectionContainer = document.getElementById("characters-container");

 async function getCharacter(){
    const response = await fetch(API_URL)
    console.log("Valor de response:",response)

    const characterslist = await response.json()
    console.log("Esta es la respuesta de personajes:", characterslist)

    characterslist.content.forEach(element => {
        console.log('Nombre del personaje: ', element.name);
        console.log('Imagen del personaje: ', element.img);

        const newTag = document.createElement("article");
        newTag.className = "article-container";
        newTag.innerHTML =`<img src="${element.img}">`;
        sectionContainer.appendChild(newTag);
    });

}                   
getCharacter();