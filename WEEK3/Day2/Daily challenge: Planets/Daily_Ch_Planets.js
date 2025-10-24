document.addEventListener('DOMContentLoaded', function() {


 const planets = [
                {
                    name: "Mercury",
                    color: "pink",
                    moons: 0
                },
                {
                    name: "Venus",
                    color: "orange",
                    moons: 0
                },
                {
                    name: "Earth",
                    color: "lightblue",
                    moons: 1
                },
                {
                    name: "Mars",
                    color: "purple",
                    moons: 2
                },
                {
                    name: "Jupiter",
                    color: "brown",
                    moons: 4  // Reduced for visual clarity
                },
                {
                    name: "Saturn",
                    color: "green",
                    moons: 5  // Reduced for visual clarity
                },
                {
                    name: "Uranus",
                    color: "yellow",
                    moons: 3  // Reduced for visual clarity
                },
                {
                    name: "Neptune",
                    color: "darkblue",
                    moons: 2  // Reduced for visual clarity
                }
            ];

            // Get the section where we'll add the planets
            const listPlanetsSection = document.querySelector('.listPlanets');

            // Loop through each planet and create its element
            planets.forEach(planet => {
                // Create planet div
                const planetDiv = document.createElement('div');
                planetDiv.className = 'planet';
                planetDiv.style.backgroundColor = planet.color;
                
                // Add planet name
                const planetName = document.createElement('div');
                planetName.className = 'planet-name';
                planetName.textContent = planet.name;
                planetDiv.appendChild(planetName);
                
                // Create moons for this planet
                for (let i = 0; i < planet.moons; i++) {
                    const moon = document.createElement('div');
                    moon.className = 'moon';
                    moon.style.left = `calc(50% + ${(i + 1) * 40}px)`;
                    moon.style.top = '50%';
                    moon.style.transform = 'translateY(-50%)';
                   
                    
                    planetDiv.appendChild(moon);
                }
                
                // Add the planet to the section
                listPlanetsSection.appendChild(planetDiv);
});



})
