const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const movieSection = document.getElementById("movie-section");

searchButton.addEventListener("click", function () {
  const searchTerm = searchInput.value.trim();
  if (!searchTerm) return; 

  fetch(`http://www.omdbapi.com/?apikey=1c5f675e&s=${searchTerm}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.Search) {
        render(data.Search);
      } else {
        movieSection.innerHTML = `<p class="text">No movies found.</p>`;
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
    searchInput.value = ""
});

function render(movies) {
  let movieList = "";
  movies.forEach((movie) => {
    movieList += `
      <div class="movie" id="${movie.imdbID}">
          <div class="movie-img">
              <img src="${movie.Poster}" alt="${movie.Title}">
          </div>
          <div class="movie-info">
              <div class="movie-name-rating">
                  <h2>${movie.Title}</h2>
                  <span class="movie-year">${movie.Year}</span>
              </div>
              <div class="movie-type">
                  <p>${movie.Type}</p>
              </div>
              <div class="movie-text">
                  <!-- Additional movie details can go here -->
              </div>
          </div>
      </div>
    `;
  });
  movieSection.innerHTML = movieList;
}
