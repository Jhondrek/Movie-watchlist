const searchForm = document.getElementById("search-form")
const movieTitle = document.getElementById("movie-title-input")
const mainContainer = document.getElementById("main-container")

searchForm.addEventListener("submit", function(e){
    e.preventDefault()
    fetch(`http://www.omdbapi.com/?apikey=b8a61dc6&s=${movieTitle.value}&page=1`)
    .then( res => res.json())
    .then( data => {
            console.log(data)
            getSearchResults(data)

    })


})

mainContainer.addEventListener("click", function(e){
    if(e.target.tagName=== "BUTTON"){
        saveMovieToWatchList(e.target.id)
    }else if(e.target.tagName === "I"){
        saveMovieToWatchList(e.target.parentElement.id)
    }
})


function getSearchResults(searchResult){
    let moviesHtml=""
    let movieId=0
    searchResult.Search.forEach(result => {

        movieId = result.imdbID
        fetch(`http://www.omdbapi.com/?apikey=b8a61dc6&i=${movieId}`)
            .then( res => res.json())
            .then( data => {
                moviesHtml += getMovieHtml(data)
                mainContainer.innerHTML = moviesHtml
            }
            
        )
    })
}

function getMovieHtml(data){

    let movieHtml = `
    <div class="movie-container" >
        <img src="${data.Poster}" alt="${data.Title} movie poster" class="movie-img">
    
        <div class="movie-info-container">
            
            <div class="title-evaluation-container">
                <h2>${data.Title}</h2>
                <div class="evaluation-container">
                    <i class="fa-solid fa-star fa-2xs star" ></i>
                    <p>${data.imdbRating}</p>
                </div>
            </div>

            <div class="information-watchlist-add-container">
                <p>${data.Runtime}</p>
                <p class="cathegories">${data.Genre}</p>
                <div class="watchlist-container">
                    <button id=${data.imdbID}> <i class="fa-solid fa-plus add-font"  ></i> watchlist</button>
                </div>
            </div>

            <p class="movie-description">${data.Plot}</p>

        </div>

    </div>
    `
     return movieHtml
}



function saveMovieToWatchList(movieId){
    localStorage.setItem(movieId, movieId)
}



