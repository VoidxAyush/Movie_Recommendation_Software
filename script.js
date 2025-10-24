const apiKey = '2ee5e220'; // Your OMDb API key

async function searchMovies() {
    const query = document.getElementById('search-input').value.trim();
    if (!query) return;

    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "True") {
            displayMovies(data.Search);
        } else {
            displayError(data.Error || "No movies found.");
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
        displayError("Something went wrong while fetching data.");
    }
}

function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies');
    moviesContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        const poster = movie.Poster !== "N/A" ? movie.Poster : 'no-image.jpg';
        
        movieElement.innerHTML = `
            <img src="${poster}" alt="${movie.Title}">
            <div class="movie-title">${movie.Title} (${movie.Year})</div>
        `;

        moviesContainer.appendChild(movieElement);
    });
}

function displayError(message) {
    const moviesContainer = document.getElementById('movies');
    moviesContainer.innerHTML = `<p class="error">${message}</p>`;
}
