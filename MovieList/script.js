// class Movie - For each movie
class Movie {
  constructor(title, link, status) {
    this.title = title;
    this.link = link;
    this.status = status;
  }
}

//class Store - For local storage
class Store {
  //If there is no array of movies in local storage then create a new one return.
  static getMovie() {
    let movies;
    if (localStorage.getItem("movies") === null) {
      movies = [];
    } else {
      movies = JSON.parse(localStorage.getItem("movies"));
    }
    return movies;
  }

  //Add movie to the movies array in local storage.
  static addMovie(movie) {
    const movies = Store.getMovie();

    movies.push(movie);
    localStorage.setItem("movies", JSON.stringify(movies));
  }

  //Remove movie from the movies array in local storage.
  static removeMovie(title) {
    const movies = Store.getMovie();

    movies.forEach(index => {
      movies.splice(index, 1);
    });

    localStorage.setItem("movies", JSON.stringify(movies));
  }
}

// class UI - For UI related tasks
class UI {
  //Display movies in the movies-list table
  static showMovie() {
    const movies = Store.getMovie();

    movies.forEach(movie => UI.addMovies(movie));
  }

  //Add movie to the movie-list table
  static addMovies(movie) {
    const list = document.getElementById("movies-list");

    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${movie.title} </td>
            <td><a href="#">${movie.link}</a></td>
            <td>${movie.status} </td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
            `;

    list.appendChild(row);
  }

  //Remove movie from the movie-list table
  static deleteMovie(target) {
    if (target.classList.contains("delete")) {
      target.parentElement.parentElement.remove();
    }
  }

  //Clear fields after movie gets added in the table
  static clearFields() {
    document.getElementById("movie-title").value = "";
    document.getElementById("movie-link").value = "";
    document.getElementById("watched").checked = false;
    document.getElementById("not-watched").checked = false;
  }
}

// Event Add Movies
document.getElementById("movie-form").addEventListener("submit", event => {
  event.preventDefault();
  const title = document.getElementById("movie-title").value;
  const link = document.getElementById("movie-link").value;
  const status = document.querySelector('input[name="rb"]:checked').value;

  if (title === "") {
    alert("Please enter a movie title");
  } else {
    const movie = new Movie(title, link, status);

    //Add movie to Ui
    UI.addMovies(movie);

    //Add book to local storage
    Store.addMovie(movie);

    UI.clearFields();
  }
});

// Event Display Movies
document.addEventListener("DOMContentLoaded", UI.showMovie);

//Event Remove Movies
document.getElementById("movies-list").addEventListener("click", event => {
  UI.deleteMovie(event.target);
  movieTitle =
    event.target.parentElement.previousElementSibling.previousElementSibling
      .previousElementSibling.textContent;
  Store.removeMovie(movieTitle);
});
