const mainContainer = document.getElementById("main-container")

getLocalStorageMoviesIds()

function getLocalStorageMoviesIds(){
    let moviesHtml = ""
    const moviesIdsArray= Object.values(localStorage)
    moviesIdsArray.forEach(id => {

        fetch(`http://www.omdbapi.com/?apikey=b8a61dc6&i=${id}`)
            .then( res => res.json())
            .then( data => {
                console.log(data)
                moviesHtml += getMovieHtml(data)
                console.log(moviesHtml)
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
                    <button id=${data.imdbID}> <i class="fa-solid fa-minus remove-item"></i> Remove</button>
                </div>
            </div>

            <p class="movie-description">${data.Plot}</p>

        </div>

    </div>
    `
     return movieHtml
}

mainContainer.addEventListener("click", function(e){
    console.log(e.target.tagName)
    if(e.target.tagName=== "BUTTON"){
        removeMovieFromWhatchList(e.target.id)
    }else if(e.target.tagName === "I"){
        removeMovieFromWhatchList(e.target.parentElement.id)
    }
})

function removeMovieFromWhatchList(movieId){
    localStorage.removeItem(movieId)
    if(localStorage.length === 0){
        mainContainer.innerHTML = 
            `<div class="no-movie-added">
                <p >Your watchlist is looking a little empty...</p>
                <div class="add-movies-container">
                    <a href="index.html"><i class="fa-solid fa-plus add-movies-font"></i></a>
                    <p>Let's add some movies!</p>
                </div>
            </div>`
    }
    getLocalStorageMoviesIds()
}