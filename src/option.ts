import { head } from "fp-ts/lib/Array";

import {
  match,
  none,
  some,
  type Option,
  map,
  flatMap,
  fromNullable,
  fromPredicate,
  alt,
  getOrElse,
} from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/function";
import { toUpperCase } from "fp-ts/lib/string";
const inverse = (n: number): Option<number> => {
  return n === 0 ? none : some(1 / n);
};

//combine
const getMessageWithInverse = (n: number): string => {
  return pipe(
    inverse(n),
    match(
      () => "No inverse",
      (x) => `Inverse is ${x}`
    )
  );
};

const addPrefix = (prefix: string) => {
  return (s: string) => `${prefix} ${s}`;
};

//map
const getBestMovie = (titles: string[]): Option<string> =>
  pipe(titles, head, map(toUpperCase), map(addPrefix("Best Movie: ")));

//flatMap
const inverseHead = (ns: number[]) => pipe(ns, head, flatMap(inverse));

type Movie = {
  title: string;
  releaseYear: number;
  ratingPosition: number;
  award?: string;
};

const movie1: Movie = {
  title: "The monad",
  releaseYear: 1999,
  ratingPosition: 1,
  award: "Oscar",
};

const movie2: Movie = {
  title: "The oop",
  releaseYear: 2000,
  ratingPosition: 7,
};

const movie3: Movie = {
  title: "The for loop",
  releaseYear: 2001,
  ratingPosition: 1000,
};

const descriptMovie = (movie: Movie): string => {
  if (movie.award) {
    return `award with: ${movie.award}`;
  }
  if (movie.ratingPosition < 10) {
    return `rating position: ${movie.ratingPosition}`;
  }
  return `release year: ${movie.releaseYear}`;
};

const getMovieAwardHighlight = (movie: Movie) =>
  pipe(
    movie.award,
    fromNullable,
    map((award) => `award with: ${award}`)
  );

const getMovieRatingHighlight = (movie: Movie) =>
  pipe(
    movie.ratingPosition,
    fromPredicate((rating) => rating < 10),
    map((rating) => `rating position: ${rating}`)
  );

const getMovieHighlight = (movie: Movie) =>
  pipe(
    movie,
    getMovieAwardHighlight,
    alt(() => getMovieRatingHighlight(movie)),
    getOrElse(() => `release year: ${movie.releaseYear}`)
  );

console.log(getMovieHighlight(movie1));
console.log(getMovieHighlight(movie2));
console.log(getMovieHighlight(movie3));
