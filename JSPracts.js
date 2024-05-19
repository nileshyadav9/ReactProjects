const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: [
      "fantasy",
      "high-fantasy",
      "adventure",
      "fiction",
      "novels",
      "literature",
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: [
      "science fiction",
      "humor",
      "speculative fiction",
      "short stories",
      "fantasy",
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}

//--------------- Console.Log needs to be uncommented to see results---------------

/*
 Use of Spread Operator 
It is used to add a new element to an existing array and gives out a new array
var arr = [1,2,3]; var arr2 = [...arr, 4]; => gives arr2 as [1,2,3,4]
if we use traditional way arr2 = [arr,4] it will create [[1,2,3],4]
*/

let book = getBook(1);
let generes = book.genres;
let newGenarrtrad = [generes, "new genre"];
//console.log(newGenarrtrad);

let newGenarrSpread = [...generes, "new genre"]; // add new element at end
//console.log(newGenarrSpread);
let newGenarrSpread2 = ["new genre", ...generes]; // add new element at start
//console.log(newGenarrSpread2);

// similarly we can use spread operator with objects
// in below example this will add book object and another property moviewPublicationDate
const updatedBook = { book, moviePublicationDate: "2001-12-19" };
//console.log(updatedBook);

//Adding it via a spread operator will make sure the new property is added to the book object instead of being an extra property
const updatedBook2 = { ...book, moviePublicationDate: "2001-12-19" };
//console.log(updatedBook2);

//we can also use spread operator to over-ride the existing property values
const updatedBook3 = {
  ...book,
  //Adds a new property to the object
  moviePublicationDate: "2001-12-19",
  //over-rides the existing property's value
  pages: 2000,
};
//console.log(updatedBook3);

// Template Literals: to use js expression in strings like string interpollation in c#
// we use ${} , the string should be enclosed in ` operators instead of '
let summary = "a book";
let jsSummary = `${getBook(2).title} is a nice book`; // calling js function inside string interpollation
//console.log(jsSummary);

//adding ternary operator to template literals
jsSummary = `${getBook(2).title} is a nice book, and it has ${
  getBook(2).hasMovieAdaptation ? "" : "not"
} been adapted as movie`;
//console.log( jsSummary);

//normal function and arrow function adaptation
function getYear(fullDate) {
  return fullDate.split("-")[0];
}
(fdate) => fdate.split("-")[0];
// in here (fdate) is the paramter that is going to be passed to the function
// and whatever comes after arrow gets returned to the caller

let fdte = getYear(getBook(1).publicationDate);
let fdte2 = (fdate) => fdate.split("-")[0];
//console.log(fdte);
//console.log(fdte2(getBook(1).publicationDate));
let summ2 = (summ) => {
  let smry = summ;
  return `${smry} is a nice book`;
};
//console.log(summ2(getBook(1).title));
// above we created arrow function where multiple line of code needs to be executed before we return something out

//Short circuit logical operators
//false values => 0, '', undefined, null
// && => if the first value is false value then go to second
// || => if the first value is true value then go to second
// ?? null coalesec when first value is null or undefined go to second

/* console.log(true && "This is short circuit && operator");
console.log(false || "This is short circuit || operator");
console.log(getBook(2).translations.bengali ?? "There is no translation data");
 */
// optional chaining in js " ?. " operator
//continue the chain only everything before ? is not undefined or null
function getTotalReviewCount(book) {
  let reviewsFromsource1 = book.reviews?.goodreads?.reviewsCount;
  let reviewsFromsource2 = book.reviews?.librarything?.reviewsCount ?? 0;
  return reviewsFromsource1 + reviewsFromsource2;
}

//console.log(getTotalReviewCount(getBook(3)));

//--------------------here onwards map/filter and other array functions
//map => select
//filter => where
//reduce => reduces the whole array to one value
//sort => to sort

let tarr = [1, 2, 3, 4, 5].map((te) => te * 2);
//console.log(tarr);

let books = getBooks();
let titles = books.map((book) => book.title);
//console.log(titles);
let essentialData = books.map((book) => {
  return {
    title: book.title,
    author: book.author,
    reviewCount: getTotalReviewCount(book),
  };
});
//console.log(essentialData);

// above can be done like
let essentialData2 = books.map((book) => ({
  title: book.title,
  author: book.author,
  reviewCount: getTotalReviewCount(book),
}));
//console.log(essentialData2) ;

let longBooksWithMovie = books
  .filter((book) => book.pages > 200)
  .filter((book) => book.hasMovieAdaptation);
//console.log(longBooksWithMovie) ;

let adventureBooks = books
  .filter((books) => books.genres.includes("adventure"))
  .map((book) => book.title);
//console.log( adventureBooks);

// reduce takes two params 1 => callback function 2 => intial value
// in below we pass inital value as 0 as starting value to count all the pages
//callback function has to include this as parameter too
let pagesinallbooks = books.reduce(
  (initlValueanditeratedsum, book) => initlValueanditeratedsum + book.pages,
  0
);
//console.log( pagesinallbooks);
// slice gives a fresh copy so that sort() does not change original array
// a-b => asc sort
// b-1 => desc sort
let sortedByPageNum = books.slice().sort((a, b) => b.pages - a.pages);
//console.log(sortedByPageNum) ;

/// fetch(URL).Then(call back function once request complete) to get data from an URL
/* fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response) => response.json())
  .then((responseFromPrev) => console.log(responseFromPrev));
console.log("JS does not wait for fetch to complete to print this line") */

async function getDummyJson() {
  let response = await fetch("https://jsonplaceholder.typicode.com/todos");
  let jsontoJs = await response.json();
  console.log(jsontoJs);
  //console.log("JS does waits for fetch to complete to print this line");
}
//getDummyJson();
//console.log("JS does not wait for fetch to complete to print this line");
