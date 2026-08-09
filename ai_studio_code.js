// Selecting elements from the HTML
const library = document.getElementById('game-library');
const player = document.getElementById('game-player');
const frame = document.getElementById('main-frame');
const titleDisplay = document.getElementById('current-game-title');
const closeBtn = document.getElementById('close-btn');

// 1. Load the game data from the JSON file
fetch('games.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(games) {
        // Loop through each game in the list
        games.forEach(function(game) {
            // Create a "Card" for the game
            const card = document.createElement('div');
            card.className = 'game-card';
            card.innerHTML = `
                <img src="${game.thumbnail}" alt="${game.title}">
                <h3>${game.title}</h3>
            `;

            // When a user clicks a game card...
            card.onclick = function() {
                titleDisplay.innerText = game.title; // Set the title
                frame.src = game.url;               // Load the game URL into iframe
                player.classList.remove('hidden');   // Show the player
                document.body.style.overflow = 'hidden'; // Stop the page from scrolling
            };

            // Add the card to the website grid
            library.appendChild(card);
        });
    })
    .catch(function(error) {
        console.error("Error loading the games.json file:", error);
    });

// 2. Close Game Logic
closeBtn.onclick = function() {
    player.classList.add('hidden');      // Hide the player
    frame.src = "";                      // Clear the iframe to stop game audio
    document.body.style.overflow = 'auto'; // Let the page scroll again
};