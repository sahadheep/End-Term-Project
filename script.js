// Variables to store movie data for comparison
let movieData1 = null, movieData2 = null;
// Function to fetch movie details from OMDB API based on user input
async function fetchMovie(num) {
    const title = document.getElementById(`movieTitle${num}`).value;
    if (!title) return;

    const apiKey = '2e5834c1'; // Your OMDB API key
    const response = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=${apiKey}`); // Fetch movie data
    const data = await response.json(); // Convert the response to JSON

    if (data.Response === "False") {
        // If the API doesn't find the movie, show an error message
        document.getElementById(`movieDetails${num}`).innerHTML = '<p>Movie not found</p>';
        return;
    }
    // Display the movie details in the respective movie box
    document.getElementById(`movieDetails${num}`).innerHTML = `
        <h2>${data.Title} (${data.Year})</h2>
        <img src="${data.Poster}" alt="Movie Poster">
        <p><strong>Genre:</strong> ${data.Genre}</p>
        <p><strong>Director:</strong> ${data.Director}</p>
        <p><strong>Cast:</strong> ${data.Actors}</p>
        <p><strong>IMDb Rating:</strong> ${data.imdbRating}</p>
    `;
    // Store the movie data for later comparison
    if (num === 1) movieData1 = data;
    else movieData2 = data;
}
// Function to compare the two movies based on IMDb rating
function compareMovies() {
    if (!movieData1 || !movieData2) {
        alert('Please enter two movies to compare.');
        return;
    }
    let rating1 = parseFloat(movieData1.imdbRating) || 0;
    let rating2 = parseFloat(movieData2.imdbRating) || 0;
    // Determine the winner based on the higher IMDb rating
    let winner = rating1 > rating2 ? movieData1.Title : movieData2.Title;
    // If both ratings are equal, it's a tie
    if (rating1 === rating2) {
        winner = 'Both movies are equally rated!';
    }
    document.getElementById('comparison').innerHTML = `<h2>Best Movie: ${winner}</h2>`;
}
