// $('.search-button').on('click', function(){
//     $.ajax({
//     url : 'http://www.omdbapi.com/?apikey=19b26eed&s=' + $('.input-keyword').val(),
//     success : results => {
//         const movies = results.Search;
//         let cards = '';
//         movies.forEach(m => {
//             cards += showMovie(m); 
//         });
//         $('.movie-container').html(cards);

//         //ketika tombol detail di klik
//         $('.modal-detail-button').on('click', function(){
//             $.ajax({
//                 url : 'http://www.omdbapi.com/?apikey=19b26eed&i=' + $(this).data('imdbid'),
//                 success : m => {
//                     const movieDetail = showMovieDetail(m);
//                     $('.modal-body').html(movieDetail);
//                 },
//                 error: (e) => {
//                     console.log(e.responseText);
//                 }
//             })
//         })
//     },
//     error: (e) => {
//         console.log(e.responseText);
//     }
// });
// });


// const searchButton = document.querySelector('.search-button');
// searchButton.addEventListener('click', function(){

//     const inputKeyword = document.querySelector('.input-keyword');
//     fetch('http://www.omdbapi.com/?apikey=19b26eed&s=' +inputKeyword.value)
//         .then(Response => Response.json())
//         .then(Response => {
//             const movies = Response.Search;
//             let cards = '';
//             movies.forEach(m => cards += showMovie(m));
//             const movieContainer = document.querySelector('.movie-container');
//             movieContainer.innerHTML = cards;

//             //show detail diklik
//             const modalDetailButton = document.querySelectorAll('.modal-detail-button');
//             modalDetailButton.forEach(btn => {
//                 btn.addEventListener('click', function(){
//                     const imdbid = this.dataset.imdbid;
//                     fetch('http://www.omdbapi.com/?apikey=19b26eed&i=' + imdbid)
//                         .then(Response => Response.json())
//                         .then(m => {
//                             const movieDetail = showMovieDetail(m);
//                             const modalBody = document.querySelector('.modal-body');
//                             modalBody.innerHTML = movieDetail;
//                         });
//                 });
//             });
//         });

// });



// ASYNC dan AWAIT
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function(){
    try{
        const inputKeyword = document.querySelector('.input-keyword');
    const movies = await getMovies(inputKeyword.value);
    updateUI(movies);
    }catch(err){
        alert(err);
    }
});

function getMovies(keyword){
    return fetch('http://www.omdbapi.com/?apikey=19b26eed&s=' + keyword)
        .then(Response =>{
            if( !Response.ok){
                throw new Error(Response.statusText)
            }
            return Response.json();
        })
        .then(responnya => {
            if( responnya.Response === 'False'){
                throw new Error(responnya.Error)
            }
            return responnya.Search;
        });
}

function updateUI(movies){
    let cards = '';
    movies.forEach(m => cards += showMovie(m));
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = cards;
}


//event binding
document.addEventListener('click', async function(e){
    if(e.target.classList.contains('modal-detail-button')){
        const imdbid = e.target.dataset.imdbid;
        const movieDetail = await getMovieDetail(imdbid);
        updateUIDetail(movieDetail);
    }
});

function getMovieDetail(imdbid){
    return fetch('http://www.omdbapi.com/?apikey=19b26eed&i=' + imdbid)
        .then(Response => Response.json())
        .then(m => m)
}

function updateUIDetail(m){
    const movieDetail = showMovieDetail(m);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetail;
}





function showMovie(m) {
    return `<div class="col-md-4 my-3">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top">
                    <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Detail</a>
                    </div>
                </div>
            </div>`;
}

function showMovieDetail(m) {
    return `<div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
            <img src="${m.Poster}" class="img-fluid">
        </div>
        <div class="col-md">
            <ul class="list-group">
                <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
                <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
                <li class="list-group-item"><strong>Plot : </strong>${m.Plot}</li>
            </ul>
        </div>
    </div>
</div>`;
}