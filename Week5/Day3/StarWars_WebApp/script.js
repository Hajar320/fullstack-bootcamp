const info = document.getElementById("info");
const btn = document.getElementById("btn");

async function fetchdata() {
    const Swapi = "https://www.swapi.tech/api/people";
    const randomId = Math.floor(Math.random() * 80) + 1;
    
    try {
        // Show loading
        info.innerHTML = `<div class="loading"><img src="images/refresh.png" class="spinning-img"></div>`;
        
        const char = await fetch(`${Swapi}/${randomId}`);
        if (!char.ok) {
            throw new Error("Character not found in Imperial records");
        }
        
        const chardata = await char.json();
        displayCharacter(chardata.result);
        
    } catch(error) {
        info.innerHTML = `<div class="error">${error.message}</div>`;
    }
}

async function displayCharacter(character) {
     const charp = character.properties;
    // Get homeworld data
    let homeworldName = "Unknown";
    try {
        const homeworldResponse = await fetch(charp.homeworld);
        if (homeworldResponse.ok) {
            const homeworldData = await homeworldResponse.json();
            homeworldName = homeworldData.result.properties.name;
        }
    } catch (error) {
        homeworldName = "Data unavailable";
    }
   
    info.innerHTML = `
        <div class="character-name">${charp.name}</div>
        <div class="character-details">
            <div class="detail-item"><strong>Height:</strong> ${charp.height} cm</div>
            <div class="detail-item"><strong>Birth Year:</strong> ${charp.birth_year}</div>
            <div class="detail-item"><strong>Gender:</strong> ${charp.gender}</div>
            <div class="detail-item"><strong>Mass:</strong> ${charp.mass} kg</div>
            <div class="detail-item"><strong>Hair Color:</strong> ${charp.hair_color}</div>
            <div class="detail-item homeworld"><strong>Home World:</strong> ${homeworldName}</div>        
        </div>
    `;
}

btn.addEventListener("click", fetchdata);
