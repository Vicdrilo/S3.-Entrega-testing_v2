// Exercise 1: Get the array of all directors.
function getAllDirectors(array) {
  let result =  array.map((movie)=>movie.director);
  console.log("EXERCICE 1 ->", result);
  return result;
}

// Exercise 2: Get the films of a certain director
function getMoviesFromDirector(array, director) {
  let arrayMoviesFromDirector = array.filter(function(movie){
    if(movie.director === director){
      return movie;
    }
  });
  let result = arrayMoviesFromDirector;
  console.log("EXERCICE 2 ->", result);
  return result;
}

// Exercise 3: Calculate the average of the films of a given director.
function moviesAverageOfDirector(array, director) {
  //creamos array mediante la funcion anterior.
  //Basandonos en el director, se forma el array con sus películas.
  let arrayMovies = getMoviesFromDirector(array, director);

  //Reducimos el array obteniendo la suma de todas sus cualificaciones.
  let totalScore = arrayMovies.reduce((acc, act)=>acc + act.score, 0);
  let totalMovies = arrayMovies.length;
  let average = totalScore/totalMovies;
  
  console.log("EXERCICE 3 ->"+
    'totalScore: '+totalScore+
    '. Número de peliculas en arrayMovies: '+totalMovies+
    '. Average: '+average);
  return average;
  
}

// Exercise 4:  Alphabetic order by title 
function orderAlphabetically(array) {
  let arrayOrdered = [];

  array.forEach(function(movie){
    arrayOrdered.push(movie.title);
  });
  arrayOrdered.sort();

  if(arrayOrdered.length>20){
    let array20thFirstMovies = [];
    for(let i=0; i<20; i++){
      array20thFirstMovies.push(arrayOrdered[i]);
    } 
    return array20thFirstMovies;
  }
  return arrayOrdered;

}

// Exercise 5: Order by year, ascending
function orderByYear(array) {
  let arrAux = [];


  //Si el array origen tiene o no tiene objetos con titulo. 
  //Aunque quizás no pasaría nada si se dejase como title:undefined
  
  
  array.forEach(function(film){
    if(Object.hasOwn(film, 'title')){
      arrAux.push({'title': film.title, 'year': film.year});
    }else{
      arrAux.push({'year': film.year});
    }
  });

  arrAux.sort(orderYear);

  
  console.log('EJERCICIO 5 ====> Resultado by year', arrAux);
  return arrAux;
 
}

function orderYear(a, b){
  let dif = a.year-b.year;
  if(dif === 0 && Object.hasOwn(a, 'title')){
    return (a.title).localeCompare(b.title);
  }
  return dif;
}

// Exercise 6: Calculate the average of the movies in a category
function moviesAverageByCategory(category) {
  const movies = require('../src/data');
  let arrayAux = [];

  for(let movie of movies){
    let sameGenre = false;
    for(let genre of movie.genre){
      if(genre === category){
        sameGenre = true;
      }
    }
    if(sameGenre){
      arrayAux.push(movie.score);
    }
  }

  let average = (arrayAux.reduce((acc, act) => acc + act, 0)) / arrayAux.length;

  console.log('EJERCICIO 6 ==========>', arrayAux , '| TotalScore: ', arrayAux.reduce((acc, act)=>acc + act, 0) , '| Length: ', arrayAux.length);
  
  return Number((average).toFixed(2));
}

// Exercise 7: Modify the duration of movies to minutes
function hoursToMinutes(array) {
  //let arMoviesMinute = [];
  let arMoviesMinute = array.map((obj)=>{return({...obj})});

  arMoviesMinute.forEach(function(movie){
    
    let time = movie.duration;
    
    //Recuperamos la hora y minutos y los pasamos a Number para poder cambiar horas a min y sumar el total de minutos
    let hour = Number(time.substr(0, 1));
    let min = 0;
    if(time.length === 8){ //tiene decenas en los minutos
      min = Number(time.substr(3, 2));
    }else if(time.length === 7){ //solo tiene unidades los minutos
      min = Number(time.substr(3, 1));
    }
    min += hour * 60;

    
    
    //Añadimos el objeto movie al nevo array y cambiamos el valor de duration a minutos
    movie.duration = min;
  });

  
  console.log("EJERCICIO 7 =>", arMoviesMinute, 'ORIGINAL =>', array);
  return arMoviesMinute;
  
}

// Exercise 8: Get the best film of a year
function bestFilmOfYear(array, year) {
  let arBestMovie = [];
  let arCopy = [];
  array.forEach(function (movie){
    if(movie.year === year){
      arCopy.push(movie);
    }
  });

  arCopy.sort(orderDescenByScore);
  arBestMovie = [{...arCopy[0]}];
  
  console.log('EJERCICIO 8 => ARRAY ARGUMENTO: ', array, 'ARRAY arCopy:================= ', arCopy, 'ARRAY arBestMovie:============== ', arBestMovie);
  return arBestMovie;
}

function orderDescenByScore(a, b){
  return b.score-a.score;
}


// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    getMoviesFromDirector,
    moviesAverageOfDirector,
    orderAlphabetically,
    orderByYear,
    moviesAverageByCategory,
    hoursToMinutes,
    bestFilmOfYear,
  };
}
