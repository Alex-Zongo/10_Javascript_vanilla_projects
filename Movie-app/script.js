const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=" +
  APIKEY +
  "&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w500";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?api_key=" + APIKEY + "&query=";

const mainEl = document.getElementById("main");
const form = document.getElementById("form");
const searchEl = document.getElementById("search");

//initially get fav movies
getMovies(APIURL);

async function getMovies(url) {
  const resp = await fetch(url);
  const data = await resp.json();

  showMovies(data.results);
  console.log(data);
}

function showMovies(movies) {
  // clear main
  mainEl.innerHTML = "";

  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
                <img 
                    src="${IMGPATH + poster_path}" alt="${title}"
                />
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getClassByRate(
                      vote_average
                    )}">${vote_average}</span>
                </div>
                <div class="overview">
                        <h3>Overview: </h3>
                        ${overview}
                </div>
            `;

    mainEl.appendChild(movieEl);
  });
}

function getClassByRate(rate) {
  if (rate >= 8) {
    return "green";
  } else if (rate >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = searchEl.value;

  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);
    searchEl.value = "";
  }
});
